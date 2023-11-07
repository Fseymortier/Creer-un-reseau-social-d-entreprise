const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.like = require("./like.model.js")(sequelize, Sequelize);
db.com = require("./com.model.js")(sequelize, Sequelize);

// Likes relationship with post to delete likes when the post is deleted
db.post.hasMany(db.like, { onDelete: "cascade" });
db.like.belongsTo(db.post, { onDelete: "cascade" });

// Coms relationship with post to delete coms when the post is deleted
db.post.hasMany(db.com, { onDelete: "cascade" });
db.com.belongsTo(db.post, { onDelete: "cascade" });

module.exports = db;
