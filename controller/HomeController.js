const express = require('express');
const router = express.Router();

const Article = require('../model/Article');

router.get(`/`, (req, res) => {
    Article.findAll({ raw: true }).then((articles) => {
        res.render("index", { data: articles });
    });
});

module.exports = router;