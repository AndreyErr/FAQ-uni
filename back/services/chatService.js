const tokenService = require('../services/tokenService')
const pgdb = require('../pgdb')
const apiError = require('../exceptions/apiError')

class chatService {

    async selectDialogs(id, type, limit, page, token, flag = ''){
        const decoded = tokenService.validateToken(token)
        if(Number(id) !== decoded.data.id && (flag === 'all' && (decoded.data.status != 4 || decoded.data.status != 5))){
            throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        }
        let digitType = 0
        switch(type){
            case 'chat':
                digitType = 1
                break
            case 'history':
                digitType = 2
                break
            default:
                throw apiError.BadRequest('NOT_FOUND_TYPE', `Не найден тип`)
        }

        console.log('555', flag, digitType)
        let data
        let countAlldata
        let whereChat = '(askuser = ' + id + ' OR ansuser = ' + id + ') AND (dialogstatus = 0 OR (dialogstatus = 8 AND ansuser = ' + id + ' ) OR (dialogstatus = 9 AND ansuser = ' + id + ' ))'
        let whereHist = '(askuser = ' + id + ' OR ansuser = ' + id + ') AND (dialogstatus = 10 OR (dialogstatus = 8 AND ansuser != ' + id + ' ) OR (dialogstatus = 9 AND ansuser != ' + id + ' ))'
        if(flag === 'all'){
            console.log(id)
            whereChat = 'dialogstatus = 0'
            whereHist = 'dialogstatus >= 8'
        }
        if(digitType == 1){
            data = await pgdb.query('SELECT (SELECT fromuser FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_user_add, (SELECT dateadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_date_add, (SELECT timeadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_time_add, dialogid, askuser, ansuser, dateadd, timeadd, dialogtype, dialogstatus, needtoread, userask.login AS userasklogin, userans.login AS useranslogin FROM dialogs LEFT JOIN users AS userask ON userask.user_id = dialogs.askuser LEFT JOIN users AS userans ON userans.user_id = dialogs.askuser WHERE '+whereChat+' ORDER BY last_mes_date_add DESC, last_mes_time_add DESC LIMIT $1 OFFSET $2', [limit, limit * (page - 1)])
            countAlldata = await pgdb.query('SELECT COUNT(dialogid) AS count FROM dialogs WHERE ' + whereChat)
        }else if(digitType == 2){
            data = await pgdb.query('SELECT (SELECT fromuser FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_user_add, (SELECT dateadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_date_add, (SELECT timeadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_time_add, dialogid, askuser, ansuser, dateadd, timeadd, dialogtype, dialogstatus, needtoread, userask.login AS userasklogin, userans.login AS useranslogin FROM dialogs LEFT JOIN users AS userask ON userask.user_id = dialogs.askuser LEFT JOIN users AS userans ON userans.user_id = dialogs.askuser WHERE '+whereHist+' ORDER BY last_mes_date_add DESC, last_mes_time_add DESC LIMIT $1 OFFSET $2', [limit, limit * (page - 1)])
            countAlldata = await pgdb.query('SELECT COUNT(dialogid) AS count FROM dialogs WHERE ' + whereHist)
        }
        if(data.rowCount > 0){
            return [data.rows, countAlldata.rows[0]['count']]
        }else{
            return 'null'
        }
    }

    async selectDialogById(dialogid, token){
        const data = await pgdb.query('SELECT (SELECT fromuser FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_user_add, (SELECT dateadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_date_add, (SELECT timeadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_time_add, dialogid, askuser, ansuser, dateadd, timeadd, dialogtype, dialogstatus, needtoread, userask.login AS userasklogin, userans.login AS useranslogin FROM dialogs LEFT JOIN users AS userask ON userask.user_id = dialogs.askuser LEFT JOIN users AS userans ON userans.user_id = dialogs.askuser WHERE dialogid = $1', [dialogid])
        return data.rows[0]
    }     

    async addDialogByClient(id, message, token){
        const decoded = tokenService.validateToken(token)
        // if(id != decoded.data.id){
        //     throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        // }
        if(decoded.data.status < 3){
            const countUserChats = await pgdb.query('SELECT COUNT(dialogid) AS count FROM dialogs WHERE askuser = $1 AND dialogstatus = 0', [id])
            console.log(countUserChats.rows[0]['count'], process.env.CHATS_ON_AIR)
            if(Number(countUserChats.rows[0]['count']) >= process.env.CHATS_ON_AIR){
                console.log('tr')
                throw apiError.BadRequest('MAX_CHATS', `Достигнут максимум доступных онлайн чатов`)
            }
        }
        const users = await pgdb.query('SELECT users.user_id AS id, prob FROM users JOIN probability_receiving_chat ON users.user_id = probability_receiving_chat.user_id WHERE status IN (3, 4, 5) AND prob != 0 ORDER BY RANDOM()')
        const sumProb = await pgdb.query('SELECT SUM(prob) AS sum FROM users JOIN probability_receiving_chat ON users.user_id = probability_receiving_chat.user_id WHERE status IN (3, 4, 5) AND prob != 0')
        let selectUserId = 0
        if(sumProb.rows[0]['sum'] == null){
            const user = await pgdb.query('SELECT user_id FROM users WHERE login = $1', [process.env.UNBAN_LOGIN])
            selectUserId = user.rows[0]['user_id']
        }else{
            const randNumber = Math.floor(Math.random() * (sumProb.rows[0]['sum'] - 1))
            let index = 0, Point = 0, befPoint = 0
            for (index = 0; index <= users.rowCount; ++index) {
                befPoint = Point
                Point = Point + users.rows[index]['prob']
                if(randNumber >= befPoint &&  randNumber < Point){
                    selectUserId = users.rows[index]['id']
                    break;
                }
            }
        }
        let dialogType = 0
        if(decoded.data.status < 3){
            dialogType = decoded.data.status
        }else{
            dialogType = 3
        }
        await this.finChatsWithTime()
        const dialogaded = await pgdb.query('INSERT INTO dialogs (askuser, ansuser, dateadd, timeadd, dialogtype, dialogstatus, needtoread) values ($1, $2, current_date, localtime(0), $3, 0, 1) RETURNING *', [id, selectUserId, dialogType])
        await pgdb.query('INSERT INTO messages (textmessage, fromuser, dateadd, timeadd, dialogid) values ($1, $2, current_date, localtime(0), $3)', [message, id, dialogaded.rows[0]['dialogid']])
        const dialog = await pgdb.query('SELECT (SELECT fromuser FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_user_add, (SELECT dateadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_date_add, (SELECT timeadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_time_add, dialogid, askuser, ansuser, dateadd, timeadd, dialogtype, dialogstatus, needtoread, userask.login AS userasklogin, userans.login AS useranslogin FROM dialogs LEFT JOIN users AS userask ON userask.user_id = dialogs.askuser LEFT JOIN users AS userans ON userans.user_id = dialogs.askuser WHERE dialogid = $1', [dialogaded.rows[0]['dialogid']])
        return dialog.rows[0]
    }

    async finChatsWithTime(){
        const dialogs = await pgdb.query("SELECT * FROM dialogs WHERE dialogstatus = 0 AND (SELECT dateadd FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC LIMIT 1) < current_date - interval '20 days'")
        console.log(dialogs.rowCount, dialogs.rows)
        if(dialogs.rowCount > 0){
            let index = 0
                for (index = 0; index < dialogs.rowCount; ++index) {
                    console.log(dialogs.rows[index])
                    await pgdb.query("INSERT INTO messages (textmessage, fromuser, dateadd, timeadd, dialogid) values ('##### Чат закрыт системой из-за отсутствия активности в течении 20 дней!', -1, current_date, localtime(0), $1)", [dialogs.rows[index]['dialogid']])
                    await pgdb.query("UPDATE dialogs SET dialogstatus = 10 WHERE dialogid = $1", [dialogs.rows[index]['dialogid']])
                }
            }
        }

    async addMessage(dialogid, message, token, finFlag){
        const decoded = tokenService.validateToken(token)
        const aboutDialog = await pgdb.query('SELECT askuser, ansuser, dialogstatus FROM dialogs WHERE dialogid = $1', [dialogid])
        if(aboutDialog.rows[0]['askuser'] != decoded.data.id && aboutDialog.rows[0]['ansuser'] != decoded.data.id && decoded.data.status < 4){
            throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        }else if(((aboutDialog.rows[0]['dialogstatus'] == 8 || aboutDialog.rows[0]['dialogstatus'] == 9) && aboutDialog.rows[0]['ansuser'] != decoded.data.id) || aboutDialog.rows[0]['dialogstatus'] == 10){
            throw apiError.BadRequest('HISTORI', `Чат является историей и его нельзя изменить`)
        }
        const data = await pgdb.query('INSERT INTO messages (textmessage, fromuser, dateadd, timeadd, dialogid) values ($1, $2, current_date, localtime(0), $3) RETURNING *', [message, decoded.data.id, dialogid])
        let dalogStatus = finFlag
        let needtoread = 1
        if(finFlag == 10){
            needtoread = 0
        }
        await pgdb.query('UPDATE dialogs SET needtoread = $3, dialogstatus = $2 WHERE dialogid = $1', [dialogid, dalogStatus, needtoread])
        return data.rows[0]
    }

    async selectMessages(dialogid, limit, page, token){
        const decoded = tokenService.validateToken(token)
        const dialogData = await pgdb.query('SELECT askuser, ansuser, needtoread FROM dialogs WHERE dialogid = $1', [dialogid])
        if(dialogData.rows[0]){
            if(dialogData.rows[0]['askuser'] != decoded.data.id && dialogData.rows[0]['ansuser'] != decoded.data.id && decoded.data.status < 4){
                throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
            }
        }else{
            throw apiError.BadRequest('NOT_FOUND', `Не найдено`)
        }
        const data = await pgdb.query('SELECT * FROM messages LEFT JOIN users ON users.user_id = messages.fromuser WHERE dialogid = $1 ORDER BY messageid DESC LIMIT $2 OFFSET $3', [dialogid, limit, limit * (page - 1)])
        const countMes = await pgdb.query('SELECT COUNT(messageid) AS countmess FROM messages WHERE dialogid = $1 ', [dialogid])
        if(data.rowCount > 0){
            return [data.rows, countMes.rows[0]['countmess'], dialogData.rows[0]]
        }else{
            return 'null'
        }
    }

    async selectDataByMessageId(messageId, token, dialogId){
        const decoded = tokenService.validateToken(token)
        const dialogData = await pgdb.query('SELECT askuser, ansuser FROM dialogs WHERE dialogid = $1', [dialogId])

        if(dialogData.rows[0]['askuser'] != decoded.data.id && dialogData.rows[0]['ansuser'] != decoded.data.id  && decoded.data.status < 4){
            throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        }
        const data = await pgdb.query('SELECT * FROM messages LEFT JOIN users ON users.user_id = messages.fromuser WHERE dialogid = $1 AND messageid = $2 ORDER BY messageid DESC LIMIT 1', [dialogId, messageId])
        return [data.rows[0], decoded.data.id, dialogData.rows[0]]
    }

    async setMessageRead(dialogid, token){
        const decoded = tokenService.validateToken(token)
        const dialogdata = await pgdb.query('SELECT (SELECT fromuser FROM messages WHERE dialogid = dialogs.dialogid ORDER BY dateadd DESC, timeadd DESC LIMIT 1) AS last_mes_user_add, askuser, ansuser FROM dialogs WHERE dialogid = $1 LIMIT 1', [dialogid])
        if(dialogdata.rows[0]['askuser'] != decoded.data.id && dialogdata.rows[0]['ansuser'] != decoded.data.id){
            throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        }
        if(dialogdata.rows[0]['last_mes_user_add'] != decoded.data.id){
            await pgdb.query('UPDATE dialogs SET needtoread = 0 WHERE dialogid = $1', [dialogid])
        }
        return 'OK'
    }

    async deleteDialog(dialogid, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status !== 5){
            throw apiError.BadRequest('NOT_ACCESS', `Нет доступа`)
        }
        console.log('--->' + dialogid)
        await pgdb.query('DELETE FROM dialogs WHERE dialogid = $1', [dialogid])
        await pgdb.query('DELETE FROM messages WHERE dialogid = $1', [dialogid])
        return 'OK'
    }
}

module.exports = new chatService();