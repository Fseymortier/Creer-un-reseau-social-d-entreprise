const db = require('../models')
const User = db.user

exports.findAllUsers = (req, res) => {
    User.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
}
exports.findOneUser = (req, res) => {
    const id = req.params.id
    User.findOneByPk({ where: { id: id } })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
}
