module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        author: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
    })
    return Post
}
