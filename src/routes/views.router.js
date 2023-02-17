import {
    Router
} from 'express'
import fs from 'fs'
const router = Router()

const data = await fs.promises.readFile('./src/files/Products.json', 'utf-8')
    const products = JSON.parse(data)

router.get('/', async (req, res) => {
    
    res.render('realTimeProducts', {products});
});
// router.get('/', async (req, res) => {
//     const data = await fs.promises.readFile('./src/files/Products.json', 'utf-8')
//     const products = JSON.parse(data)
//     res.render('realTimeProducts');
// });
router.delete('/', async (req, res) => {
    try {

        const productId = Number(req.params.pid)
        const index = products.findIndex(p => p.id == productId)

        if (index !== -1) {
            products.splice(index, 1)
            await fs.promises.writeFile('./src/files/Products.json', JSON.stringify(products, null, '\t'))
                res.render('realTimeProducts', {products});

        } else {
            res.status(404).send({
                status: 'error',
                message: 'Product not found'
            })
        }
    } catch (error) {
        console.error(error)
    }
})


export default router;