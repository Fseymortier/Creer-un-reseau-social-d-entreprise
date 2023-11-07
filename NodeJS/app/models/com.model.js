module.exports = (sequelize, Sequelize) => {
    var Com = sequelize.define("coms", {
        author: { type: Sequelize.STRING, required: true },
        postId: {
            type: Sequelize.INTEGER,
            references: { model: "posts", key: "id" }, //foreign key from posts
        },
        content: { type: Sequelize.STRING, required: true },
    });
    return Com;
};
