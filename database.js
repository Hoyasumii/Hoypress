const Sequelize = require('sequelize');

const connection = new Sequelize('hoypress', 'root', '1909', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00' // Para que o sequelize use o horário de Brasília
})

module.exports = connection;
