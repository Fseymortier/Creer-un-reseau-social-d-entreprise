const router = require('express').Router();
const { authJwt } = require('../middleware');
const comCtrl = require('../controllers/com.controller');

router.post('/', [authJwt.verifyToken], comCtrl.create);
router.get('/:id', [authJwt.verifyToken], comCtrl.findAll);
router.put('/:id', [authJwt.verifyToken], comCtrl.update);
//router.delete("/:id", [authJwt.verifyToken], comCtrl.delete);
router.delete('/:comId', [authJwt.verifyToken], comCtrl.delete);
module.exports = router;
