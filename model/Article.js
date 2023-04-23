const Sequelize = require('sequelize');
const connection = require(`../database`);

const CategoryModel = require('./Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Relacionamentos em Sequelize
CategoryModel.hasMany(Article); // Uma categoria tem muitos artigos (1:N)
Article.belongsTo(CategoryModel); // Um artigo pertence a uma categoria (1:1)

Article.sync();

module.exports = Article;