const Router = require('express')
const router = new Router()

const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/addDialogByClient', authMiddleware, checkRole([1, 2]), chatController.addDialogByClient)
router.post('/addMessage', authMiddleware, chatController.addMessage)
router.post('/setMessageRead', authMiddleware, chatController.setMessageRead)
router.post('/updateDialogStatus', authMiddleware, checkRole([3, 4, 5]), chatController.updateDialogStatus)
router.post('/changeAnsUser', authMiddleware, checkRole([4, 5]), chatController.changeAnsUser)
router.post('/fileUpload', authMiddleware, chatController.fileUpload)
router.get('/selectDialogs',authMiddleware, chatController.selectDialogs)
router.get('/selectDialog',authMiddleware, chatController.selectDialog)
router.get('/selectMessages',authMiddleware, chatController.selectMessages)
router.delete('/deleteDialog', authMiddleware, checkRole([5]), chatController.deleteDialog)


module.exports = router