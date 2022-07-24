module.exports = (sequelize, Sequelize) => {
    var Post = sequelize.define('posts', {
        author: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING, required: true },
        description: { type: Sequelize.STRING, required: true },
        imageUrl: { type: Sequelize.STRING },
    })
    return Post
}
