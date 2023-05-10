const Sequelize = require('sequelize');

const connection = new Sequelize('hoypress', 'root', '1909', {
    dialect: 'sqlite',
    storage: './database.sqlite'
})

module.exports = connection;
