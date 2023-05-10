const Sequelize = require('sequelize');

const connection = new Sequelize('hoypress2', 'root', '1909', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = connection;
