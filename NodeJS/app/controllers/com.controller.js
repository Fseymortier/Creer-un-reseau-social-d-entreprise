const db = require('../models');
const Com = db.com;

// create and save com
exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Ajouter du contenu à votre commentaire pour le créer',
        });
    } else {
        var com = {
            author: req.body.author,
            postId: req.body.postId,
            content: req.body.content,
        };
    }
    Com.create(com)
        .then(() => {
            return res.send({ message: 'Commentaire ajouté' });
        })
        .catch((error) => res.status(400).send({ error: error }));
};
// find all coms
exports.findAll = (req, res) => {
    const id = req.params.id;
    Com.findAll({ where: { postId: id } })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    'Une erreur est survenue pendant la recherche des commentaires',
            });
        });
};
// update com by id
exports.update = (req, res) => {
    const comId = req.params.comId;
    // if file received update him
    const com = {
        content: req.body.content,
    };
    Com.update(com, { where: { id: comId } })
        .then(() => res.send({ message: 'Commentaire modifié avec succès' }))
        .catch((error) => res.status(500).send({ error: error }));
};

// delete com by id
exports.delete = (req, res) => {
    const comId = req.params.comId;
    Com.destroy({ where: { id: comId } })
        .then(() => res.send({ message: 'Commentaire supprimé' }))
        .catch((error) => res.status(500).send({ error: error }));
};
