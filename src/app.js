import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {
    Server
} from 'socket.io'
import productsRouter from './routes/products.router.js'
import ProductManager from './manager/ProductManager.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import fs from 'fs'

const productManager = new ProductManager();

const app = express()
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use('/realtimeproducts', viewsRouter)
app.use('/', productsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(8080, () => console.log('Listening server on port 8080'))

const io = new Server(server)


io.on('connection', async socket => {
    console.log('cliente conectado')
    
    const data = await fs.promises.readFile('./src/files/Products.json', 'utf-8')
    const products = JSON.parse(data)
    
    io.emit('showProducts', products)

    socket.on('spliced', async data => {
        await productManager.deleteProduct(Number(data))
        const products = await productManager.getProducts();
        io.emit('showProducts', products);
    })

    socket.on('getForm', async data => {

        const prods = await fs.promises.readFile('./src/files/Products.json', 'utf-8')
        const products = JSON.parse(prods)

        if (products.length === 0) {
            data.id = 1
        } else {
            data.id = products[products.length - 1].id + 1
        }
        const values = Object.values(data)
        const valuesString = values.filter(e => typeof e == 'string')
        const checkTrim = valuesString.findIndex(e => e.trim() === "")
        const codeIndex = products.findIndex(e => e.code === data.code)

        if (checkTrim !== -1) return socket.emit('checkTrim', 'Empty field')
        if (codeIndex !== -1) return socket.emit('codeIndex', 'Code repited')

        products.push(data)
        await fs.promises.writeFile('./src/files/Products.json', JSON.stringify(products, null, '\t'))

        io.emit('showProducts', products)


    })
    


io.emit('prods', products)


})