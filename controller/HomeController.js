const express = require('express');
const router = express.Router();
const getDate = require('../public/scripts/getDate');

const Article = require('../model/Article');

router.get(`/`, (req, res) => {
    Article.findAll({ raw: true, order: [['id', 'DESC']] }).then((articles) => {
        res.render("index", { 
            data: articles.reduce((acc, article) => {
            acc.push({
                id: article.id,
                title: article.title,
                slug: article.slug,
                updatedAt: getDate(article.updatedAt)
            });
            return acc;
            }, []).slice(0, 4)
        });
    });
});

module.exports = router;