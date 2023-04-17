const Router = require('express')
const router = new Router()
const {body} = require('express-validator')

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/userReg', body('login').isLength({'min': 3, 'max': 100}), body('email').isEmail(), body('pass').isLength({'min': 5, 'max': 20}), userController.createUser)
router.post('/userLogin', body('login').isLength({'min': 3, 'max': 100}), body('pass').isLength({'min': 5, 'max': 20}), userController.loginUser)
router.post('/userLogout', userController.logoutUser)
router.post('/updateUserStatus', authMiddleware, checkRole([5]), userController.updateUserStatus)
router.post('/updateUserProb', authMiddleware, checkRole([4, 5]), userController.updateUserProb)
router.get('/auth', authMiddleware, userController.check)
router.get('/selectConfigData', userController.selectConfigData)
router.get('/selectUsersTypes', authMiddleware, userController.selectUsersTypes)
router.get('/selectDataAboutMe', authMiddleware, userController.selectDataAboutMe)
router.get('/selectUsers', authMiddleware, checkRole([4, 5]), userController.selectUsers)
router.delete('/deleteUser', authMiddleware, checkRole([4, 5]), userController.deleteUser)

module.exports = router