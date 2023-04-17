import io from 'socket.io-client'
const jwt = localStorage.getItem('token')

let socket
if(jwt){
    socket = io('http://localhost:9000', {
        query: {
            token: jwt
        }
    })
}

export default socket