const Sequelize = require('sequelize');
const connection = require(`../database`);

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password_hash: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync();

module.exports = User;