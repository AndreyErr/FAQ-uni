const tokenService = require('../services/tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcrypt')
const apiError = require('../exceptions/apiError')

class userService {
    
    async createUser(login, email, pass){
        const candidate = await pgdb.query('SELECT user_id FROM users WHERE login = $1', [login])
        if(candidate.rowCount > 0){
            throw apiError.BadRequest('USER_EXIST', `Пользователь с логином ${login} уже существует`)
        }
        const hashPass = await bcrypt.hash(pass, 15)
        const newPerson = await pgdb.query('INSERT INTO users (login, email, pass, status) values ($1, $2, $3, 0) RETURNING *', [login, email, hashPass])
        const tokens = tokenService.generateTokens({id: newPerson.rows[0]['user_id'], login: newPerson.rows[0]['login'], email: newPerson.rows[0]['email'], status: newPerson.rows[0]['status']})
        console.log(newPerson.rows[0])
        return {
            ...tokens
        };
    }

    async loginUser(login, pass){
        const candidate = await pgdb.query('SELECT * FROM users WHERE login = $1', [login])
        if(candidate.rowCount == 0){
            throw apiError.BadRequest('USER_NOT_EXIST', `Пользователь с логином ${login} не существует`)
        }
        const isPassEquals = await bcrypt.compare(pass, candidate.rows[0]['pass'])
        if(!isPassEquals){
            throw apiError.BadRequest('WRONG_PASS', `Неверный пароль`)
        }
        const tokens = tokenService.generateTokens({id: candidate.rows[0]['user_id'], login: candidate.rows[0]['login'], email: candidate.rows[0]['email'], status: candidate.rows[0]['status']})
        console.log(candidate.rows[0])
        return {
            ...tokens
        };
    }

    async logoutUser(accessToken){
        const token = await tokenService.deleteToken(accessToken)
        return token;
    }

    async deleteUser(id){
        let deletedUser = await pgdb.query('SELECT user_id FROM users WHERE user_id = $1', [id])
        if (deletedUser.rowCount == 0){
            throw apiError.BadRequest('NOT_EXIST', `Пользователь с id ${id} не существует`)
        }else{
            await pgdb.query('DELETE FROM users WHERE user_id = $1', [id])
            deletedUser = await pgdb.query('SELECT user_id FROM users WHERE user_id = $1', [id])
            return 'DELETED'
        }
    }
}

module.exports = new userService();