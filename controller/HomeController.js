const express = require('express');
const router = express.Router();
const getDate = require('../public/scripts/getDate');

const Article = require('../model/Article');

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

    Article.findAndCountAll({ 
        raw: true, 
        order: [['id', 'DESC']],
        limit: offsetLimit,
        offset: (page - 1) * offsetLimit
    }).then((articles) => {
        res.render("index", { 
            data: articles.rows.reduce((acc, article) => {
                acc.push({
                    id: article.id,
                    title: article.title,
                    slug: article.slug,
                    updatedAt: getDate(article.updatedAt)
                });
            return acc;
            }, []),
            currentPage: page,
            numberOfPages: Math.ceil(articles.count / offsetLimit) // Aqui eu estou definindo o número máximo de páginas que um artigo pode ter
        });
    });
});

module.exports = router;