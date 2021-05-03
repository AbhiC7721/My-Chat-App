//CLIENT

const socket = io()

// server (emit) --> client (receive) --acknowledgement--> server
// client (emit) --> server (receive) --acknowledgement--> client

socket.on('message', (mes) => {
    console.log(mes)
})

document.querySelector('#message').addEventListener('submit', (e)=> {
    e.preventDefault();

    const message =  e.target.elements.message.value
    //e.target is basically the form

    socket.emit('sendMessage', message, (message)=> {
        console.log('The message was delivered!', message)
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by the browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }) 
})