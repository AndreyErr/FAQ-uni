const Router = require('express')
const filesRouter = new Router()
const tokenService = require('../services/tokenService')
const express = require('express')
const pgdb = require('../pgdb')

filesRouter.use('/:uuid', authImage, express.static('./files'))

async function authImage(req, res, next){
    const str = (req.params.uuid).split('|&|')
    const decoded = tokenService.validateToken(str[0])
    if(decoded && str[1]){
        const aboutDialog = await pgdb.query('SELECT askuser, ansuser FROM dialogs WHERE dialogid = $1', [str[1]])
        if(aboutDialog.rows[0]['askuser'] != decoded.data.id && aboutDialog.rows[0]['ansuser'] != decoded.data.id && decoded.data.status < 4){
            res.status(403).send('Forbidden');
        }
        next();
    }else{
        res.status(403).send('Forbidden');
    }
}

module.exports = filesRouter