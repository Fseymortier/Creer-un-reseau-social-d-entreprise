const router = require('express').Router()
const { verifySignUp, authJwt } = require('../middleware')
const authCtrl = require('../controllers/auth.controller')
const userCtrl = require('../controllers/user.controller')

router.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})
router.post('/auth/signup', [verifySignUp.checkDuplicateEmail], authCtrl.signup)
router.post('/auth/signin', authCtrl.signin)

router.get('/user', [authJwt.verifyToken], userCtrl.findAllUsers)
router.get('/user/:id', [authJwt.verifyToken], userCtrl.findOneUser)

module.exports = router
