const chatS = require('../services/chatService')
const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')

class chatController {

    // async selectUsers(req, res, next){
    //     try{
    //      res.json(newPerson)
    //     }catch(e){
    //         next(e);
    //     }
    // }

    async selectDialogs(req, res, next){
        try{
            console.log(req.query)
            const userId = req.query.userId
            const type = req.query.type
            let flag = ''
            if(req.query.flag){
                flag = req.query.flag
            }
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.selectDialogs(userId, type, token, flag)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async selectDialog(req, res, next){
        try{
            const dialogid = req.query.dialogid
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.selectDialogById(dialogid, token)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async addDialogByClient(req, res, next){
        try{
            const {id, message} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.addDialogByClient(id, message, token)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async addMessage(req, res, next){
        try{
            const {dialogid, message, finFlag} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const data = await chatS.addMessage(dialogid, message, token, finFlag)
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
            console.log(req.body)
            const token = req.headers.authorization.split(' ')[1]
            const ans = await chatS.deleteDialog(dialogid, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }
}

module.exports = new chatController()