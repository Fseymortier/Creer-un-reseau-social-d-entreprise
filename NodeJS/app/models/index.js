const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
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
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user.model.js')(sequelize, Sequelize)
db.post = require('./post.model.js')(sequelize, Sequelize)
db.like = require('./like.model.js')(sequelize, Sequelize)

db.post.hasMany(db.like, { onDelete: 'cascade' })
db.like.belongsTo(db.post, { onDelete: 'cascade' })
// User relationship with post

module.exports = db
