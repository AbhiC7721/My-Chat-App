//CLIENT

const socket = io()

//Elements 
const $messageForm = document.querySelector('#message-form')
const $messageFormInput =  $messageForm.querySelector('input')
const $messageFormButton =  $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML


socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (url) => {
    console.log(url)
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