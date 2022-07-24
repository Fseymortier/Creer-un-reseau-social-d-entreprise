const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
    //create user
    User.create({
        nickname: req.body.nickname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then(() => {
            res.send({ message: 'Création du compte réussi' })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Une erreur est survenue pendant la création du compte.',
            })
        })
}
exports.signin = (req, res) => {
    //find user
    User.findOne({ where: { email: req.body.email } }) //find user by email
        .then((User) => {
            if (!User) {
                return res
                    .status(404)
                    .send({ message: 'Utilisateur inéxistant' })
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                User.password
            ) //verify password
            if (!passwordIsValid) {
                //if doesen't match send error message
                return res.status(401).send({
                    accessToken: null,
                    message: 'Mot de passe incorrect!',
                })
            }
            var token = jwt.sign({ id: User.id }, config.secret, {
                //if match sign token
                expiresIn: 86400, // 24 hours
            })
            return res.status(200).send({
                //attribute token to user
                id: User.id,
                nickname: User.nickname,
                email: User.email,
                accessToken: token,
                role: User.role,
            })
        })
        .catch((err) => {
            res.status(500).send({ message: err.message })
        })
}
