//CLIENT

const socket = io()

//Elements 
const $messageForm = document.querySelector('#message-form')
const $messageFormInput =  $messageForm.querySelector('input')
const $messageFormButton =  $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', (mes) => {
    console.log(mes)
})

$messageForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled')
    //disabled for the attribute disabled
    //disable

    const message =  e.target.elements.message.value
    //e.target is basically the form

    socket.emit('sendMessage', message, (error)=> {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable
        if(error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by the browser')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
             $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    }) 
})