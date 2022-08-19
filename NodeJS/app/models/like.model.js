module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('likes', {
        postId: { type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER },
    })
    return Like
}
