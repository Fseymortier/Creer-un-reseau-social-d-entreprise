const db = require('../models');
const Post = db.post;
const fs = require('fs');

// create and save post
exports.create = (req, res) => {
    // validate request
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({
            message:
                'Votre post doit contenir au moins un titre et une description',
        });
    }
    const post = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.file
            ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            : '', //to add file on request and resolve url to access at images folder
    };
    Post.create(post)
        .then(() => res.send({ message: 'Post ajouté !' }))
        .catch((error) => res.status(400).send({ error: error }));
};
// find all posts
exports.findAll = (req, res) => {
    Post.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Une erreur est survenue pendant la recherche des posts.',
            });
        });
};
// find single post by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de retrouver le post avec l'id: id=${id}.`,
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message:
                    "Une erreur est survenue pendant la recherche du post avec l'id: id=" +
                    id,
            });
        });
};
// update post by id
exports.update = (req, res) => {
    const id = req.params.id;
    if (req.file) {
        // if file received update him
        const post = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
            }`,
        };
        Post.update(post, { where: { id: id } })
            .then(() => res.send({ message: 'Post modifié avec succès .' }))
            .catch((error) => res.status(500).send({ error: error }));
    } else {
        // else update object reveived
        const post = {
            title: req.body.title,
            description: req.body.description,
        };

        Post.update(post, { where: { id: id } })
            .then(() => res.send({ message: 'Post modifié avec succès .' }))
            .catch((error) => res.status(500).send({ error: error }));
    }
};

// delete post by id
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.findOne({ where: { id: id } })
        .then((post) => {
            const filename = post.imageUrl.split('/images/')[1]; //return bord with 2 colum to get the name of image
            fs.unlink(
                `G:/Programmation/Formation_Dev/Projet_7/groupomania/NodeJS/app/images/${filename}`,
                () => {
                    //use function of package fs to delete post
                    Post.destroy({ where: { id: id } })
                        .then(() => res.send({ message: 'Post supprimé !' }))
                        .catch((error) =>
                            res.status(500).send({ error: error })
                        );
                }
            );
        })
        .catch((error) => res.status(400).json({ error: error }));
};
