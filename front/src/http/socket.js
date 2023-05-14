import io from 'socket.io-client'
const jwt = localStorage.getItem('token')

let socket
if(jwt){
    socket = io('***SERVERPASS***', {
        query: {
            token: jwt
        }
    })
}

export default socket