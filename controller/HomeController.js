const express = require('express');
const router = express.Router();
const getDate = require('../public/scripts/getDate');

const Article = require('../model/Article');
const Category = require('../model/Category');

router.get(`/:page?`, (req, res) => {

    let page = req.params.page;
    let offsetLimit = 4;

    if (page != undefined) {
        if (isNaN(page) || page == 0) {
            page = 1;
        } else {
            page = parseInt(page);
        }
    } else {
        page = 1;
    }

    let categories = {};

    Category.findAll({ raw: true }).then(category => { // Sistema que pega as Categories e retorna um JSON { "id": "title" }
        category.forEach(element => {
            categories[element.id] = { 
                title: element.title,
                slug: element.slug
            }
        });
    });

    Article.findAndCountAll({ 
        raw: true, 
        order: [['id', 'DESC']],
        limit: offsetLimit,
        offset: (page - 1) * offsetLimit
    }).then((articles) => {

        let data = articles.rows.reduce((acc, article) => {
            acc.push({
                id: article.id,
                title: article.title,
                slug: article.slug,
                category: categories[article.categoryId],
                updatedAt: getDate(article.updatedAt, false)
            });
            return acc;
        }, []);

        if (data.length == 0) throw new Error('Articles not found');

        res.render("index", { 
            data,
            currentPage: page,
            numberOfPages: Math.ceil(articles.count / offsetLimit), // Aqui eu estou definindo o número máximo de páginas que um artigo pode ter
            title: `Página Inicial`,
            isAuthenticated: req.session.user != undefined,
            categories: res.locals.categories
        });
    }).catch(err => {
        res.render("error", { 
            title: `Erro`, 
            isAuthenticated: req.session.user != undefined,
            categories: res.locals.categories
        });
    })
});

module.exports = router;