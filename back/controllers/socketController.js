const { selectDialogById, selectDataByMessageId } = require("../services/chatService")

class socketController {

    selectAction(io, socket) {
        socket.on('newChatFor', (data) => {
            selectDialogById(data.idChat).then((result) => {
                io.emit('newChatFor' + data.idUser, {
                    data: result
                })
            })
        })
        socket.on('newMessage', (data) => {
            console.log('newMessage', data)
            selectDataByMessageId(data.messageId, data.token, data.dialogId).then((result) => {
                io.emit('newMessageForDialog' + result[0].dialogid, {
                    data: result[0],
                    userSend: result[1],
                    finFlag: data.finFlag
                })
                io.emit('newMessageForDialogN' + result[0].dialogid, {
                    data: result[0],
                    dataDialog: result[2],
                    finFlag: data.finFlag
                })
            })
        })
        socket.on('readDialog', (data) => {
            console.log('readDialog', data)
            io.emit('readedDialog' + data.dialogid + data.userreadId, {
                dialogid: data.dialogid
            })
        })
    }
    
}

module.exports = new socketController()