const Router = require('express').Router
const userController = require('../controllers/userController')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 36}),
    userController.signup)
router.post('/signin', userController.signin)
router.post('/signout', userController.signout)

router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
// router.get('/users', authMiddleware, userController.getUsers)

module.exports = router