const router = require('express').Router()
const { authJwt } = require('../middleware')
const likeCtrl = require('../controllers/like.controller')

router.post('/:id', [authJwt.verifyToken], likeCtrl.like)
router.get('/:id', [authJwt.verifyToken], likeCtrl.getAll)

module.exports = router
