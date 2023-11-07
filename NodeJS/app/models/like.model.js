module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        postId: {
            type: Sequelize.INTEGER,
            references: { model: "posts", key: "id" }, //foreign key from posts
        },
        userId: { type: Sequelize.INTEGER },
    });
    return Like;
};
