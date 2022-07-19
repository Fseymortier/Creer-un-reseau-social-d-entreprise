const router = require('express').Router()
const { authJwt } = require('../middleware')
const commentCtrl = require('../controllers/comment.controller')

router.post('/', [authJwt.verifyToken], commentCtrl.create)
router.get('/', [authJwt.verifyToken], commentCtrl.findAll)
router.delete('/:id', [authJwt.verifyToken], commentCtrl.delete)

module.exports = router
