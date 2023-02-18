
const socket = io()

const form = document.getElementById('form')

const container = document.getElementById('container')


socket.on('showProducts', data => {
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

    const deleted = document.querySelectorAll('.deleted')
    deleted.forEach(btn => {
        btn.addEventListener('click', async () => {
            console.log('o')
            const id = btn.dataset.id;
            console.log(id);
            socket.emit('spliced', id)
        });
    })

})

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData.entries());

    socket.emit('getForm', formObject)
})

socket.on('checkTrim', data => {
    console.error(data)
})
socket.on('codeIndex', data => {
    console.error(data)
})