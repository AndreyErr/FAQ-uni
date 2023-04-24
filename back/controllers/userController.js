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
            // res.cookie('accessToken', newPerson.accessToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
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
            // res.cookie('accessToken', loginPerson.accessToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
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

    async check(req, res, next){
        const {data} = req.user
        const token = await userS.checkToken(data)
        res.json(token)
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

    async selectDataAboutMe(req, res, next){
        try{
            const param = req.query.param
            const data = await userS.selectDataAboutMe(param, req.user)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async selectUsers(req, res, next){
        try{
            let data = []
            data[0] = await userS.selectUsers(req.query.limit, req.query.page)
            data[1] = await userS.countAllUsers()
            res.json(data)
        }catch(e){
            next(e);
        }
    }

    async deleteUser(req, res, next){
        try{
            const {user_id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const ans = await userS.deleteUser(user_id, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async selectUsersTypes(req, res, next){
        try{
            const ans = await userS.selectUsersTypes()
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async updateUserStatus(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const {id, status} = req.body
            const ans = await userS.updateUserStatus(id, status, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async updateUserProb(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const {id, prob} = req.body
            const ans = await userS.updateUserProb(id, prob, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async selectConfigData(req, res, next){
        try{
            const ans=[process.env.UNBAN_LOGIN]
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async selectUsersStaff(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const data = await userS.selectUsersStaff(token)
            res.json(data)
        }catch(e){
            next(e);
        }
    }

    // async selectUsers(req, res, next){
    //     try{

    //     }catch(e){
    //         next(e);
    //     }
    // }
}

module.exports = new UserController()