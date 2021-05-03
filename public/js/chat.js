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

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by the browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
    }) 
})