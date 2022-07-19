module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comments', {
        content: { type: Sequelize.STRING },
        postId: { type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER },
        userNickname: { type: Sequelize.STRING },
    })
    return Comment
}
