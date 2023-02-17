
const socket = io()

const form = document.getElementById('form')

const container = document.getElementById('container')



socket.on('showFirstProducts', data => {
    container.innerHTML = ``

    data.forEach(prod => {
        container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
                <button class="deleted" data-id="${prod.id}">Eliminar</button>
            </ul>
        `
    })

})
socket.on('prods', data => {
    const deleted = document.querySelectorAll('.deleted')
    deleted.forEach(btn => {
        btn.addEventListener('click', async () => {
            console.log('o')
            const id = btn.dataset.id;
            const index = data.findIndex(e => e.id == id)
            data.splice(index, 1)
            socket.emit('spliced' ,data)
    
    
            container.innerHTML = ''
            console.log(data)
            data.forEach(prod => {
                container.innerHTML += `
                    <ul>
                        <li>title: ${prod.title}</li>
                        <li>description: ${prod.description}</li>
                        <li>code: ${prod.code}</li>
                        <li>price: ${prod.price}</li>
                        <li>status: ${prod.status}</li>
                        <li>stock: ${prod.stock}</li>
                        <li>category: ${prod.category}</li>
                        <li>id: ${prod.id}</li>
                        <button class='deleted'>Eliminar</button>
                        <button id="prueba">prueba</button>
                    </ul>
                    `
                    const prueba = document.querySelectorAll('#prueba')
                    prueba.forEach(btn => {
                        btn.addEventListener('click', () => {
                            console.log('o')
                        })
                    })
                    
            })
            
        })
    })
})

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData.entries());

    socket.emit('getForm', formObject)
})

socket.on('products', data => {
    container.innerHTML = ''
    console.log(data)
    data.forEach(prod => {
        container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li>
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
                <button class='deleted'>Eliminar</button>
            </ul>
            `

            
    })

})


socket.on('checkTrim', data => {
    console.error(data)
})
socket.on('codeIndex', data => {
    console.error(data)
})