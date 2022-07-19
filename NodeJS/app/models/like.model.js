module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('likes', {
        postId: { type: Sequelize.BIGINT },
        userId: { type: Sequelize.BIGINT },
    })
    return Like
}
