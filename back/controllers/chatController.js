const chatS = require('../services/chatService')
const apiError = require('../exceptions/apiError')

class chatController {

    async selectDialogs(req, res, next){
        try{
            const userId = req.query.userId
            const type = req.query.type
            const limit = req.query.limit
            const page = req.query.page
            let flag = ''
            if(req.query.flag){
                flag = req.query.flag
            }
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.selectDialogs(userId, type, limit, page, token, flag)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async selectDialog(req, res, next){
        try{
            const dialogid = req.query.dialogid
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.selectDialogById(dialogid, token, 'FROM_CLIENT')
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async addDialogByClient(req, res, next){
        try{
            const {id, message, file} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.addDialogByClient(id, message, file, token)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async addMessage(req, res, next){
        try{
            const {dialogid, message, finFlag, file} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.addMessage(dialogid, message, token, finFlag, file)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async selectMessages(req, res, next){
        try{
            const dialogid = req.query.dialogid
            const limit = req.query.limit
            const page = req.query.page
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.selectMessages(dialogid, limit, page, token)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async setMessageRead(req, res, next){
        try{
            const {dialogid} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.setMessageRead(dialogid, token)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async deleteDialog(req, res, next){
        try{
            const {dialogid} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const ans = await chatS.deleteDialog(dialogid, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async updateDialogStatus(req, res, next){
        try{
            const {dialogid, status} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const ans = await chatS.updateDialogStatus(dialogid, status, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async changeAnsUser(req, res, next){
        try{
            const {dialogid, ansuserid} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const ans = await chatS.changeAnsUser(dialogid, ansuserid, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async fileUpload(req, res, next){
        try{
            if(!req.files || !req.body){
                throw apiError.BadRequest('NOT_FILE', `Нет файла`)
            }
            const file = req.files.file
            const messageId = req.body.messageId
            const token = req.headers.authorization.split(' ')[1]
            const ans = await chatS.fileUpload(file, messageId, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }
}

module.exports = new chatController()