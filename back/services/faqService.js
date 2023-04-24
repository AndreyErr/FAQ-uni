const tokenService = require('../services/tokenService')
const pgdb = require('../pgdb')
const apiError = require('../exceptions/apiError')

class faqService {

    async addTypeTitleServ(title){
        const candidate = await pgdb.query('SELECT title FROM faqtype WHERE title = $1', [title])
        if(candidate.rowCount > 0){
            throw apiError.BadRequest('FAQ_TYPE_EXIST', `Тип ${title} уже существует`)
        }
        const exit = await pgdb.query('INSERT INTO faqtype (title) values ($1) RETURNING *', [title])
        return exit.rows[0]
    }

    async selectTypeTitleServ(){
        const exit = await pgdb.query('SELECT * FROM faqtype')
        return exit.rows
    }

    async deleteTypeTitleServ(id, typeOfDeleteAction){
        let deletedId = await pgdb.query('SELECT faqtypeid FROM faqtype WHERE faqtypeid = $1', [id])
        if (deletedId.rowCount == 0){
            throw apiError.BadRequest('NOT_EXIST', `Названия с id ${id} не существует`)
        }else if (deletedId.rows[0]['faqtypeid'] == 1){
            throw apiError.BadRequest('NOT_DELETED', `Нельзя удалить`)
        }else{
            if(typeOfDeleteAction == 1){
                await pgdb.query('UPDATE faq SET typeoffaq = 1 WHERE typeoffaq = $1', [id])
            }else if(typeOfDeleteAction == 2){
                await pgdb.query('DELETE FROM faq WHERE typeoffaq = $1', [id])
            }else{
                throw apiError.BadRequest('ERR_INPUT', `неправильный тип действия при удалении`)
            }
            await pgdb.query('DELETE FROM faqtype WHERE faqtypeid = $1', [id])
            return 'OK'
        }
    }

    async faqAdd(title, q, a, token){
        const decoded = tokenService.validateToken(token)
        let check = decoded.data.id
        if(decoded.data.status < 4){
            check = -1
        }
        const exit = await pgdb.query('INSERT INTO faq (useradd, usercheck, typeoffaq, dateadd, timeadd, qwest, ans, likes, dislikes, qwest_text_vector) values ($1, $5, $2, current_date, localtime(0), $3, $4, 0, 0, to_tsvector($3)) RETURNING *', [decoded.data.id, title, q, a, check])
        return exit.rows[0]
    }

    async faqUpdate(id, title, q, a, token){
        const decoded = tokenService.validateToken(token)
        await pgdb.query('UPDATE faq SET usercheck = $1, typeoffaq = $2, dateadd = current_date, timeadd = localtime(0), qwest = $3, ans = $4, qwest_text_vector = to_tsvector($3) WHERE faqid = $5', [decoded.data.id, title, q, a, id])
        return "OK"
    }

    async faqSelectByTupeId(typeId){
        if(!isFinite(typeId)){
            throw apiError.BadRequest('NOT_A_NUMBER', `Не число`)
        }
        const exit = await pgdb.query('SELECT * FROM faq WHERE typeoffaq = $1', [typeId])
        if(exit.rowCount > 0){
            return exit.rows
        }else{
            return 'err'
        }
    }

    async faqSelect(type = 'all', count = 5, sort = 'down', blockCount = 0, pageId = -1){
        let exit = []
        if(type == 'uncheck'){
            const faqsByTitleArr = await pgdb.query('SELECT faqid, typeoffaq, dateadd, timeadd, qwest, ans, likes, dislikes, users1.login AS useradd, users2.login AS usercheck FROM faq LEFT JOIN users AS users1 ON faq.useradd = users1.user_id LEFT JOIN users AS users2 ON faq.usercheck = users2.user_id WHERE usercheck = -1 ORDER BY faqid DESC')
            console.log(faqsByTitleArr.rows)
            if(faqsByTitleArr.rowCount > 0){
                const exitFaqsByTitleArr = [-1, 'FAQs к проверке', faqsByTitleArr.rows]
                exit.push(exitFaqsByTitleArr)
            }
        }else{
            let titles
            if(blockCount > 0){
                titles = await pgdb.query('SELECT * FROM faqtype ORDER BY faqtypeid DESC LIMIT $1', [blockCount])
            }else{
                titles = await pgdb.query('SELECT * FROM faqtype ORDER BY faqtypeid DESC')
            }
            if(count == -1){
                count = 10000
            }
            if(pageId != -1){
                titles = await pgdb.query('SELECT * FROM faqtype WHERE faqtypeid = $1 ORDER BY faqtypeid DESC', [pageId])
            }
            if(titles.rowCount > 0){
                if(type == 'all' || type == 'part'){
                    let index, len;
                    for (index = 0, len = titles.rowCount; index < len; ++index) {
                        let faqsByTitleArr
                        if(sort == 'down'){
                            faqsByTitleArr = await pgdb.query('SELECT faqid, typeoffaq, dateadd, timeadd, qwest, ans, likes, dislikes, users1.login AS useradd, users2.login AS usercheck FROM faq LEFT JOIN users AS users1 ON faq.useradd = users1.user_id LEFT JOIN users AS users2 ON faq.usercheck = users2.user_id WHERE typeoffaq = $1 AND usercheck != -1 ORDER BY faqid DESC LIMIT $2', [titles.rows[index].faqtypeid, count])
                        }
                        if(sort == 'top'){
                            faqsByTitleArr = await pgdb.query('SELECT faqid, typeoffaq, dateadd, timeadd, qwest, ans, likes, dislikes, users1.login AS useradd, users2.login AS usercheck FROM faq LEFT JOIN users AS users1 ON faq.useradd = users1.user_id LEFT JOIN users AS users2 ON faq.usercheck = users2.user_id WHERE typeoffaq = $1 AND usercheck != -1 ORDER BY (likes + dislikes) DESC, faqid DESC LIMIT $2', [titles.rows[index].faqtypeid, count])
                        }
                        if(faqsByTitleArr.rowCount > 0){
                            const exitFaqsByTitleArr = [titles.rows[index].faqtypeid, titles.rows[index].title, faqsByTitleArr.rows]
                            exit.push(exitFaqsByTitleArr)
                        }
                    }
                }
            }else{
                return 'err_title'
            }
        }
        if(exit.length > 0){
            return exit
        }else{
            return 'err'
        }
    }

    async selectAllAboutFaqTitle(id){
        if(!isFinite(id)){
            throw apiError.BadRequest('NOT_A_NUMBER', `Не число`)
        }
        const exit = await pgdb.query('SELECT * FROM faqtype WHERE faqtypeid = $1', [id])
        if(exit.rowCount > 0){
            return exit.rows[0]
        }else{
            return 'err'
        }

    }

    async deleteFaqAct(id){
        if(!isFinite(id)){
            throw apiError.BadRequest('NOT_A_NUMBER', `Не число`)
        }
        await pgdb.query('DELETE FROM faq WHERE faqid = $1', [id])
        return 'OK'
    }

    async saveLike(id, type){
        if(type == -1){
            await pgdb.query('UPDATE faq SET dislikes = dislikes + 1 WHERE faqid = $1', [id])
        }else if(type == 1){
            await pgdb.query('UPDATE faq SET likes = likes + 1 WHERE faqid = $1', [id])
        }else{
            throw apiError.BadRequest('NOT_A_VALID_NUMBER', `Не валидное число`)
        }
        return "OK"
    }

    async searchFaq(str, limit){
        str = str.trimEnd()
        const newStr = str.replace(/ /g, " | ")
        //const exit = await pgdb.query("SELECT * FROM faq JOIN faqtype ON faqtype.faqtypeid = faq.typeoffaq WHERE qwest LIKE $1 LIMIT $2", ['%'+str+'%', limit])
        // const exit = await pgdb.query("SELECT * FROM faq JOIN faqtype ON faqtype.faqtypeid = faq.typeoffaq WHERE to_tsvector(qwest) @@ to_tsquery($1) ORDER BY ts_rank(to_tsvector(qwest), to_tsquery($1)) DESC LIMIT $2", [str, limit])
        let take = await pgdb.query("SELECT faqid, typeoffaq, dateadd, timeadd, qwest, ans, likes, dislikes, users1.login AS useradd, users2.login AS usercheck, title FROM faq JOIN faqtype ON faqtype.faqtypeid = faq.typeoffaq LEFT JOIN users AS users1 ON faq.useradd = users1.user_id LEFT JOIN users AS users2 ON faq.usercheck = users2.user_id WHERE usercheck != -1 AND to_tsvector(lower(qwest)) @@ to_tsquery(lower($1)) ORDER BY ts_rank(to_tsvector(lower(qwest)), to_tsquery(lower($1))) DESC, (likes) DESC LIMIT $2", [newStr, limit])
        let prexit = take.rows
        let exit = []
        if(take.rowCount < limit){
            let notForSearchId = [-1]
            prexit.forEach(function(entry) {
                notForSearchId.push(entry.faqid)
            });
            limit = limit - take.rowCount
            take = await pgdb.query("SELECT faqid, typeoffaq, dateadd, timeadd, qwest, ans, likes, dislikes, users1.login AS useradd, users2.login AS usercheck, title FROM faq JOIN faqtype ON faqtype.faqtypeid = faq.typeoffaq LEFT JOIN users AS users1 ON faq.useradd = users1.user_id LEFT JOIN users AS users2 ON faq.usercheck = users2.user_id WHERE usercheck != -1 AND faqid NOT IN ("+notForSearchId.join(',')+") AND lower(qwest) LIKE lower($1) ORDER BY (likes) DESC LIMIT $2", ['%'+str+'%', limit])
            exit = prexit.concat(take.rows)
        }
        // SELECT to_tsvector(qwest) FROM faq WHERE to_tsvector(qwest) @@ to_tsquery('aaaaaaa') LIMIT 10
        if (exit.length > 0){
            return exit
        }else{
            return 'null'
        }
    }
}

module.exports = new faqService();