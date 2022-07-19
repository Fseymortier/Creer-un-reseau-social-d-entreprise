const db = require('../models')
const Comment = db.comment

exports.create = (req, res) => {
    // validate request
    if (!req.body.content) {
        res.status(400).send({
            message: 'Vous devez ajouter du contenu au commentaire',
        })
        return
    }
    // create comment
    const comment = {
        content: req.body.content.content,
        postId: req.body.content.postId,
        userId: req.body.content.userId,
        userNickname: req.body.content.userNickname,
    }
    console.log(comment)
    // save comment
    Comment.create(comment)
        .then(() => {
            res.send({ message: 'Commentaire crée avec succès' })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Une erreur est survenue pendant la création du commentaire.',
            })
        })
}

exports.findAll = (req, res) => {
    Comment.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Une erreur est survenue pendant la recherche des commentaires.',
            })
        })
}
exports.delete = (req, res) => {
    const id = req.params.id
    Comment.destroy({
        where: { postId: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Commentaire supprimé avec succès!' })
            } else {
                res.send({
                    message: `Impossible de supprimer le post avec l'id: id=${id}.`,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message:
                    "Une erreur est survenue pendant la suppression du commentaire avec l'id: id=" +
                    id,
            })
        })
}
