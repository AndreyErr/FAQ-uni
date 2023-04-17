const firstM = require('./firstM')

module.exports = function (req, res, next){
    const check = firstM(req, res, next)
    if('data' in check){
        req.user = check
        next()
    }
}