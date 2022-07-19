const db = require('../models')
const User = db.user
checkDuplicateEmail = (req, res, next) => {
    User.findOne({ where: { nickname: req.body.nickname } }).then((user) => {
        if (user) {
            res.status(400).send({
                message: 'Ce pseudo est déjà utilisé !',
            })
            return
        }
        User.findOne({ where: { email: req.body.email } }).then((user) => {
            if (user) {
                res.status(400).send({
                    message: 'Cette E-mail est déjà utilisée !',
                })
                return
            }
            next()
        })
    })
}
const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
}
module.exports = verifySignUp
