const Router = require('express')
const router = new Router()
const userRouter = require('./userRoutes')
const faqRoutes = require('./faqRoutes')
const chatRoutes = require('./chatRoutes')

router.use('/user', userRouter)
router.use('/faq', faqRoutes)
router.use('/chat', chatRoutes)

module.exports = router