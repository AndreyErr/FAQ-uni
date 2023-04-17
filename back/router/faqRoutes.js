const Router = require('express')
const router = new Router()
const {body} = require('express-validator')

const faqController = require('../controllers/faqController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/addTypeTitle', authMiddleware, checkRole([4, 5]), body('title').isLength({'min': 1, 'max': 100}), faqController.addTypeTitle)
router.post('/addFaq', authMiddleware, checkRole([4, 5]), body('q').isLength({'min': 5, 'max': 300}), body('a').isLength({'min': 3, 'max': 500}), faqController.faqAdd)
router.post('/updateFaq', authMiddleware, checkRole([4, 5]), body('q').isLength({'min': 5, 'max': 300}), body('a').isLength({'min': 3, 'max': 500}), faqController.faqUpdate)
router.post('/saveLike', faqController.saveLike)
router.get('/selectTypeTitle',authMiddleware, faqController.selectTypeTitle)
router.get('/selectFaqsByType', faqController.selectFaqs)
router.get('/selectAllAboutFaqTitle', faqController.selectAllAboutFaqTitle)
router.get('/searchFaq', faqController.searchFaq)
router.delete('/deleteTypeTitle',authMiddleware, checkRole([4, 5]), faqController.deleteTypeTitle)
router.delete('/deleteFaq',authMiddleware, checkRole([4, 5]), faqController.deleteFaq)

module.exports = router