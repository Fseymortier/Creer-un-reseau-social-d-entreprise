const db = require('../models')
const Post = db.post
const Like = db.like

// create and save post
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Vous devez ajouter un titre a votre Post',
        })
        return
    }
    // create post
    const post = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
    }
    // save post
    Post.create(post)
        .then(() => {
            res.send({ message: 'Post crée avec succès' })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Une erreur est survenue pendant la création du post.',
            })
        })
}
// find all posts
exports.findAll = (req, res) => {
    Post.findAll()
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
// find single post by id
exports.findOne = (req, res) => {
    const id = req.params.id
    Post.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Impossible de retrouver le post avec l'id: id=${id}.`,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message:
                    "Une erreur est survenue pendant la recherche du post avec l'id: id=" +
                    id,
            })
        })
}
// update post by id
exports.update = (req, res) => {
    const id = req.params.id
    Post.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Post modifié avec succès.' })
            } else {
                res.send({
                    message: `Impossible de modifier le post avec l'id: id=${id}.`,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message:
                    "Une erreur est survenue pendant la modification du post avec l'id: id=" +
                    id,
            })
        })
}
// delete post by id
exports.delete = (req, res) => {
    const id = req.params.id
    Post.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: 'Post supprimé avec succès!' })
            } else {
                res.send({
                    message: `Impossible de supprimer le post avec l'id: id=${id}.`,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message:
                    "Une erreur est survenue pendant la suppression du post avec l'id: id=" +
                    id,
            })
        })
}
exports.findByTitle = (req, res) => {
    const title = req.query.title
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null
    Tutorial.findAll({ where: condition })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving tutorials.',
            })
        })
}
