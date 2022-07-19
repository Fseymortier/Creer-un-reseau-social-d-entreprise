const router = require('express').Router()
const { authJwt } = require('../middleware')
const likeCtrl = require('../controllers/like.controller')

router.post('/', [authJwt.verifyToken], likeCtrl.like)
router.get('/', [authJwt.verifyToken], likeCtrl.getAll)

module.exports = router
