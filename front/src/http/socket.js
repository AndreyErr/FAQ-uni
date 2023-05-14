import io from 'socket.io-client'
const jwt = localStorage.getItem('token')

let socket
if(jwt){
    socket = io('https://faq-server.onrender.com', {
        query: {
            token: jwt
        }
    })
}

export default socket