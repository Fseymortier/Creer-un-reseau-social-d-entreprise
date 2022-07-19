module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        nickname: { type: Sequelize.STRING, unique: true },
        email: { type: Sequelize.STRING, unique: true },
        password: { type: Sequelize.STRING },
        role: { type: Sequelize.STRING, defaultValue: 'user' },
    })
    return User
}
