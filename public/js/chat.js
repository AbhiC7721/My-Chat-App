//CLIENT

const socket = io()

socket.on('message', (mes) => {
    console.log(mes)
})

document.querySelector('#message').addEventListener('submit', (e)=> {
    e.preventDefault();

    const message =  e.target.elements.message.value
    //e.target is basically the form

    socket.emit('sendMessage', message)
})