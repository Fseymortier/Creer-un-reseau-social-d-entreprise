module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('likes', {
        postId: {
            type: Sequelize.INTEGER,
            references: { model: 'posts', key: 'id' },
        },
        userId: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
        },
    })
    return Like
}
