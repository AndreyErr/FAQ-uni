const { checkStatus } = require('../services/userService')
const firstM = require('./firstM')

module.exports = function (role, needToSqlCheck = true){
    return function (req, res, next){
        const check = firstM(req, res, next)
        if(needToSqlCheck){
            checkStatus(check.data.id, check.data.status).then((result) => {
                if(result == 'ERR'){
                    return res.status(403).json({type: 'FORBIDDEN', message: "Нет доступа"})
                }
                if('data' in check){
                    if((result[0] == true && !role.includes(check.data.status)) || (result[0] == false && ![result[1]].includes(check.data.status))){
                        return res.status(403).json({type: 'FORBIDDEN', message: "Нет доступа"})
                    }else{
                        next()
                    }
                }
            })
        }else{
            if('data' in check){
                if(!role.includes(check.data.status)){
                    return res.status(403).json({type: 'FORBIDDEN', message: "Нет доступа"})
                }else{
                    next()
                }
            }
        }
    }
}