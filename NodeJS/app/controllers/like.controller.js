const db = require('../models')
const Like = db.like
const Op = db.Sequelize.Op

exports.like = (req, res) => {
    const postId = req.params.id
    const userId = req.userId
    async function like() {
        const verifIfLiked = await Like.findOne({
            where: [{ postId: postId }, { userId: userId }],
        })
        if (!verifIfLiked) {
            const like = {
                postId: postId,
                userId: userId,
            }
            Like.create(like)
        } else {
            Like.destroy({ where: [{ postId: postId }, { userId: userId }] })
        }
    }
    like()
}
exports.getAll = (req, res) => {
    const postId = req.params.id
    var condition = { postId: postId }
    Like.findAll({ where: condition })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Une erreur est survenue pendant la recherche des posts.',
            })
        })
}
