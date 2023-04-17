const tokenService = require('../services/tokenService')

module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        return true
    }
    try{
        if('authorization' in req.headers){
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                throw '0'
            }else{
                const decoded = tokenService.validateToken(token)
                if (decoded === null){
                    throw '1'
                } else {
                    return decoded
                }
            }
        }else{
            throw '2'
        }
    } catch (e) {
        return res.status(401).json({type: 'UNAUTHORIZED', message: "Не авторизован" + e})
    }
}