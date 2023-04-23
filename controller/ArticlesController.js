const express = require('express');
const router = express.Router();

const Article = require('../model/Article');
const Category = require('../model/Category');
const Slugify = require('slugify');

router.get('/', (req, res) => {
    res.send('Articles');
})

router.get('/new', (req, res) => {

    let categories = Category.findAll({ raw: true });

    Promise.all([categories]).then(results => {
        res.render('articles/new', {
            data: results[0] // Pq eu coloquei o [0]? Simples, pq eu usando o Promise.all eu estou colocando um array como argumento e ele retorna um array. Como eu sei que o único elemento que será retornado é o categories, eu posso pegar o primeiro elemento do array
        });
    });
});

module.exports = router;
