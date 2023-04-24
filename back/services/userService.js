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
        const newPerson = await pgdb.query('INSERT INTO users (login, email, pass, status) values ($1, $2, $3, 1) RETURNING *', [login, email, hashPass])
        const tokens = tokenService.generateTokens({id: newPerson.rows[0]['user_id'], login: newPerson.rows[0]['login'], email: newPerson.rows[0]['email'], status: newPerson.rows[0]['status']})
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
        return {
            ...tokens
        };
    }

    async logoutUser(accessToken){
        const token = await tokenService.deleteToken(accessToken)
        return token;
    }

    async checkToken(data){
        const candidate = await pgdb.query('SELECT status FROM users WHERE user_id = $1', [data.id])
        if(candidate.rowCount > 0){
            const tokens = tokenService.generateTokens({id: data.id, login: data.login, email: data.email, status: candidate.rows[0]['status']})
            return tokens
        }
    }

    async checkStatus(id, status){
        const stat = await pgdb.query('SELECT status FROM users WHERE user_id = $1', [id])
        if(stat.rowCount !== 0){
            if(stat.rows[0]['status'] == status){
                return [true, stat.rows[0]['status']]
            }else{
                return [false, stat.rows[0]['status']]
            }
        }else{
            return 'ERR'
        }
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

    async selectDataAboutMe(param, user){
        let aboutUser
        if(param == 'id'){
            param = 'user_id'
        }
        if(param == 'statusText'){
            aboutUser = await pgdb.query('SELECT title FROM usersstatus WHERE usersstatusid = $1', [user.data.status])
            param = 'title'
        }else{
            aboutUser = await pgdb.query('SELECT * FROM users WHERE user_id = $1', [user.data.id])
        }
        aboutUser = aboutUser.rows[0][param]
        if(!aboutUser){
            aboutUser = 'null'
        }
        return aboutUser
    }

    async selectUsers(count, page){
        const users = await pgdb.query('SELECT users.user_id, login, email, status, title AS status_text, probability_receiving_chat.prob AS prob FROM users JOIN usersstatus ON users.status = usersstatus.usersstatusid LEFT JOIN probability_receiving_chat ON users.user_id = probability_receiving_chat.user_id ORDER BY status DESC, user_id DESC LIMIT $1 OFFSET $2', [count, count * (page - 1)])
        return users.rows
    }

    async countAllUsers(){
        const users = await pgdb.query('SELECT COUNT(user_id) AS count FROM users')
        return users.rows[0]['count']
    }

    async selectUsersTypes(){
        const statuses = await pgdb.query('SELECT * FROM usersstatus')
        return statuses.rows
    }

    async updateUserStatus(id, status, token){
        const decoded = tokenService.validateToken(token)
        let updatedUser = await pgdb.query('SELECT status, login FROM users WHERE user_id = $1', [id])
        if(updatedUser.rows[0]['login'] == process.env.UNBAN_LOGIN || (updatedUser.rows[0]['status'] == 5 && decoded.data.login != process.env.UNBAN_LOGIN) || decoded.data.status < 5){
            throw apiError.BadRequest('NOT_CHANGE', `Изменение запрещено`)
        }
        let newProb = 0
        if(status > 2){
            switch(Number(status)){
                case 3:
                    newProb = process.env.MOD_STANDART_PROB
                    break;
                case 4:
                    newProb = process.env.STMOD_STANDART_PROB
                    break;
                case 5:
                    newProb = process.env.ADMINS_STANDART_PROB
                    break;
                default:
                    throw apiError.BadRequest('HAVE_NOT_ACCESS', `Неправомерная попытка доступа`)
            }
            if(updatedUser.rows[0]['status'] < 3){
                await pgdb.query('INSERT INTO probability_receiving_chat (user_id, prob) VALUES ($1, $2)', [id, newProb])
            }else{
                await pgdb.query('UPDATE probability_receiving_chat SET prob = $1 WHERE user_id = $2', [newProb, id])
            }
        }else{
            if(updatedUser.rows[0]['status'] > 2){
                await pgdb.query('DELETE FROM probability_receiving_chat WHERE user_id = $1', [id])
            }
        }
        await pgdb.query('UPDATE users SET status = $1 WHERE user_id = $2', [status, id])
        return ["OK", newProb]
    }

    async updateUserProb(id, prob, token){
        const decoded = tokenService.validateToken(token)
        let updatedUser = await pgdb.query('SELECT status, login FROM users WHERE user_id = $1', [id])
        if((updatedUser.rows[0]['login'] == process.env.UNBAN_LOGIN && decoded.data.login != process.env.UNBAN_LOGIN) || decoded.data.status < 4 || ((updatedUser.rows[0]['status'] >= decoded.data.status && decoded.data.login != process.env.UNBAN_LOGIN) && updatedUser.rows[0]['login'] != decoded.data.login)){
            throw apiError.BadRequest('NOT_CHANGE', `Изменение запрещено`)
        }
        await pgdb.query('UPDATE probability_receiving_chat SET prob = $1 WHERE user_id = $2', [prob, id])
        return "OK"
    }

    async deleteUser(id, token){
        let deletedUser = await pgdb.query('SELECT user_id, login, status FROM users WHERE user_id = $1', [id])
        const decoded = tokenService.validateToken(token)
        if (deletedUser.rowCount == 0){
            throw apiError.BadRequest('NOT_EXIST', `Пользователь с id ${id} не существует`)
        }else if(deletedUser.rows[0]['login'] == process.env.UNBAN_LOGIN || (decoded.data.status <= deletedUser.rows[0]['status'] && decoded.data.login != process.env.UNBAN_LOGIN)){
            throw apiError.BadRequest('NOT_DELETED', `Удаление запрещено`)
        }else{
            let deletedUserDialogs = await pgdb.query('SELECT * FROM dialogs WHERE askuser = $1 OR ansuser = $1', [id])
            let index = 0
            for (index = 0; index < deletedUserDialogs.rowCount; ++index) {
                if(deletedUserDialogs.rows[index].askuser == -2 || deletedUserDialogs.rows[index].ansuser == -2){
                    await pgdb.query('DELETE FROM dialogs WHERE dialogid = $1', [deletedUserDialogs.rows[index].dialogid])
                    await pgdb.query('DELETE FROM messages WHERE dialogid = $1', [deletedUserDialogs.rows[index].dialogid])
                }else{
                    await pgdb.query('UPDATE dialogs SET askuser = -2, dialogstatus = 4 WHERE dialogid = $1 AND askuser = $2', [deletedUserDialogs.rows[index].dialogid, id])
                    await pgdb.query('UPDATE dialogs SET ansuser = -2, dialogstatus = 4 WHERE dialogid = $1 AND ansuser = $2', [deletedUserDialogs.rows[index].dialogid, id])
                    await pgdb.query('UPDATE messages SET fromuser = -2 WHERE dialogid = $1 AND fromuser = $2', [deletedUserDialogs.rows[index].dialogid, id])
                }
            }
            await pgdb.query('DELETE FROM users WHERE user_id = $1', [id])
            await pgdb.query('DELETE FROM probability_receiving_chat WHERE user_id = $1', [id])
            return 'OK'
        }
    }

    async selectUsersStaff(token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 4){
            throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        }
        const users = await pgdb.query('SELECT users.user_id, login, status, title AS status_text FROM users JOIN usersstatus ON users.status = usersstatus.usersstatusid WHERE status > 2 AND status <= $1 ORDER BY status, user_id DESC', [decoded.data.status])
        return users.rows
    }
}

module.exports = new userService();