const Sequelize = require('sequelize');

const connection = new Sequelize('DATABASE_NAME', 'USERNAME', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = connection;
