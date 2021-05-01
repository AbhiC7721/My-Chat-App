//CLIENT

const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('The cou been updated!', count)
// })

// document.querySelector('#increment').addEventListener('click', ()=> {
//     console.log('Clicked')
//     socket.emit('increment')
// })

socket.on('message', (mes) => {
    console.log(mes)
})