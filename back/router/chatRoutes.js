const Router = require('express')
const router = new Router()
const {body} = require('express-validator')

const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/addDialogByClient', authMiddleware, checkRole([1, 2]), chatController.addDialogByClient)
router.post('/addMessage', authMiddleware, chatController.addMessage)
router.post('/setMessageRead', authMiddleware, chatController.setMessageRead)
router.get('/selectDialogs',authMiddleware, chatController.selectDialogs)
router.get('/selectDialog',authMiddleware, chatController.selectDialog)
router.get('/selectMessages',authMiddleware, chatController.selectMessages)
router.delete('/deleteDialog', authMiddleware, checkRole([5]), chatController.deleteDialog)


module.exports = router