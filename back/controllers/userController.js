const userS = require('../services/userService')
const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')

class UserController {

    async createUser(req, res, next){
        try{
            const validErrors = validationResult(req)
            if(!validErrors.isEmpty()){
                return next(apiError.BadRequest('VALID_ERROR', 'Ошибка валидации данных', validErrors.array()))
            }
            const {login, email, pass} = req.body
            const newPerson = await userS.createUser(login, email, pass)
            res.cookie('accessToken', newPerson.accessToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }

    async loginUser(req, res, next){
        try{
            const validErrors = validationResult(req)
            if(!validErrors.isEmpty()){
                return next(apiError.BadRequest('VALID_ERROR', 'Ошибка валидации данных', validErrors.array()))
            }
            const {login, pass} = req.body
            const loginPerson = await userS.loginUser(login, pass)
            res.cookie('accessToken', loginPerson.accessToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(loginPerson)
        } catch (e) {
            next(e);
        }
    }

    async logoutUser(req, res, next){
        try{
            const {accessToken} = req.cookies
            const token = await userS.logoutUser(accessToken)
            res.clearCookie('accessToken')
            res.json(token)
        } catch (e) {
            next(e);
        }
    }

    async refreshUser(req, res, next){
        try{
            const {login, email, pass} = req.body
            const newPerson = await userS.createUser(login, email, pass)
            res.json(newPerson.rows[0])
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next){
        try{
            const {id} = req.body
            const deleteStat = await userS.deleteUser(id)
            res.json(deleteStat)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController()