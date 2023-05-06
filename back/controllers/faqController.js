const faqS = require('../services/faqService')
const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')

class faqController {

    async addTypeTitle(req, res, next){
        try{
            const validErrors = validationResult(req)
            if(!validErrors.isEmpty()){
                return next(apiError.BadRequest('VALID_ERROR', 'Ошибка валидации данных', validErrors.array()))
            }
            const {title} = req.body
            const result = await faqS.addTypeTitleServ(title)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async selectTypeTitle(req, res, next){
        try{
            const result = await faqS.selectTypeTitleServ()
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async deleteTypeTitle(req, res, next){
        try{
            const {id, typeOfDeleteAction} = req.body
            const ans = await faqS.deleteTypeTitleServ(id, typeOfDeleteAction)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async faqAdd(req, res, next){
        try{
            const validErrors = validationResult(req)
            if(!validErrors.isEmpty()){
                return next(apiError.BadRequest('VALID_ERROR', 'Ошибка валидации данных', validErrors.array()))
            }
            const {title, q, a} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const result = await faqS.faqAdd(title, q, a, token)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async selectFaqs(req, res, next){
        try{
            let data = "err"
            const type = req.query.type
            const count = req.query.count
            const sort = req.query.sort
            let blockCount = 0
            if(req.query.blockCount){
                blockCount = req.query.blockCount
            }
            let pageId = -1
            if(req.query.pageId){
                pageId = req.query.pageId
            }
            data = await faqS.faqSelect(type, count, sort, blockCount, pageId)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async deleteFaq(req, res, next){
        try{
            const {id} = req.body
            const ans = await faqS.deleteFaqAct(id)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async selectAllAboutFaqTitle(req, res, next){
        try{
            const param = req.query.id
            const data = await faqS.selectAllAboutFaqTitle(param)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async faqUpdate(req, res, next){
        try{
            const validErrors = validationResult(req)
            if(!validErrors.isEmpty()){
                return next(apiError.BadRequest('VALID_ERROR', 'Ошибка валидации данных', validErrors.array()))
            }
            const {id, title, q, a} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const result = await faqS.faqUpdate(id, title, q, a, token)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async saveLike(req, res, next){
        try{
            const {id, type} = req.body
            const result = await faqS.saveLike(id, type)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async searchFaq(req, res, next){
        try{
            const str = req.query.str
            const limit = req.query.limit
            const result = await faqS.searchFaq(str, limit)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new faqController()