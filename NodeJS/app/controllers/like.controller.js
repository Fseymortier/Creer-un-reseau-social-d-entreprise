const db = require('../models')
const Like = db.like
const { Op } = require('sequelize')

exports.like = (req, res) => {
    const postId = req.body.postId
    const userId = req.body.userId
    async function like() {
        const verifIfLiked = await Like.findOne({
            where: { [Op.and]: [{ postId: postId }, { userId: userId }] },
        })
        if (verifIfLiked === null) {
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
    Like.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
}
