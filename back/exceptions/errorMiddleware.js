const apiError = require('../exceptions/apiError');

module.exports = function(err, req, res, next){
    console.log(err)
    if(err instanceof apiError){
        return res.status(err.status).json({type: err.littleMessage, message: err.message, errors: err.errors})
    }
    return res.status(500).json({type: 'UNKNOWN_ERROR', message: "Неизвестная ошибка!"})
};