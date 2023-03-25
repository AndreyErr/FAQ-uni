const pgdb = require('../pgdb')
const jwt = require('jsonwebtoken')

class tokenService {
    
    generateTokens(payload){
        payload = {
            data: payload
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '10d'})
        return {accessToken}
    }

}

module.exports = new tokenService();