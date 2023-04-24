const { selectDialogById, selectDataByMessageId } = require("../services/chatService")

class socketController {

    selectAction(io, socket) {
        socket.on('newChatFor', (data) => {
            console.log(data)
            selectDialogById(data.idChat).then((result) => {
                io.emit('newChatFor' + data.idUser, {
                    data: result
                })
                if(data.changeUser === false){
                    io.emit('newChat', {
                        data: result
                    })
                }
            })
        })
        socket.on('newMessage', (data) => {
            selectDataByMessageId(data.messageId, data.token, data.dialogId).then((result) => {
                io.emit('newMessageForDialogMESSAGES' + result[0].dialogid, {
                    data: result[0],
                    userSend: result[1],
                    dataDialog: result[2],
                    finFlag: data.finFlag
                })
                io.emit('newMessageForDialogDIALOGS' + result[0].dialogid, {
                    data: result[0],
                    dataDialog: result[2],
                    finFlag: data.finFlag
                })
            })
        })
        socket.on('notification', (data) => {
            console.log(data)
            io.emit('notificationFor' + data.dialogid, {
                notification: data.notification
            })
        })
        socket.on('readDialog', (data) => {
            io.emit('readedDialog' + data.dialogid + data.userreadId, {
                dialogid: data.dialogid
            })
        })
    }
    
}

module.exports = new socketController()