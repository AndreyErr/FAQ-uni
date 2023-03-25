const Router = require('express')
const router = new Router()
const {body} = require('express-validator')

const userController = require('../controllers/userController')

router.post('/userReg', body('login').isLength({'min': 3, 'max': 100}), body('email').isEmail(), body('pass').isLength({'min': 5, 'max': 20}), userController.createUser)
router.post('/userLogin', body('login').isLength({'min': 3, 'max': 100}), body('pass').isLength({'min': 5, 'max': 20}), userController.loginUser)
router.post('/userLogout', userController.logoutUser)

router.delete('/user', userController.deleteUser)

module.exports = router