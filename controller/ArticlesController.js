const express = require('express');
const router = express.Router();

const Article = require('../model/Article');
const Category = require('../model/Category');
const Slugify = require('slugify');
const getDate = require('../src/scripts/getDate');

router.get('/', (req, res) => {

    let categories = Category.findAll({ raw: true });
    let articles = Article.findAll({ 
        raw: true,
        order: [['id', 'DESC']],
        include: [{ model: Category }] // Estou carregando todos os artigos do banco de dados. Aqui eu não vou querer usar, pois eu quero carregar as categorias relacionadas com os artigos dentro do roteamento e não na renderização da view
     })

    Promise.all([articles, categories]).then(results => {
        results[0].forEach(article => { // Aqui eu estou percorrendo todos os artigos
            article.category = results[1].find(category => { // Aqui eu estou procurando o objeto da categoria que está relacionada com o artigo
                return category.id == article.categoryId;
            }); // Aqui, eu estou retornando o nome da categoria
        });

        res.render('articles/index', {
            data: results[0].reduce((acc, article) => {
                acc.push({
                    id: article.id,
                    title: article.title,
                    category: article.category,
                    slug: article.slug,
                    createdAt: getDate(article.createdAt),
                    updatedAt: getDate(article.updatedAt),
                });
                return acc;
            }, []),
            hasSlug: false
        });

    });
})

router.get('/new', (req, res) => {

    let categories = Category.findAll({ raw: true });

    Promise.all([categories]).then(results => {
        res.render('articles/new', {
            data: results[0] // Pq eu coloquei o [0]? Simples, pq eu usando o Promise.all eu estou colocando um array como argumento e ele retorna um array. Como eu sei que o único elemento que será retornado é o categories, eu posso pegar o primeiro elemento do array
        });
    });
});

router.post('/save', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title: title,
        slug: Slugify(title).toLowerCase(),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/articles');
    });
});

router.get('/read/:slug', (req, res) => {
    let slug = req.params.slug;

    let categories = Category.findAll({ raw: true });
    let article = Article.findOne({
        where: { slug },
        raw: true
    });

    Promise.all([article, categories]).then(results => {

        results[0].categoryId = results[1].find(category => category.id == results[0].categoryId);

        res.render('articles/read', {
            data: {
                id: results[0].id,
                title: results[0].title,
                slug: results[0].slug,
                body: results[0].body,
                category: results[0].categoryId,
                createdAt: getDate(results[0].createdAt),
                updatedAt: getDate(results[0].updatedAt)
            }
        });
    });
});

router.post('/delete', (req, res) => {
    let id = req.body.id;

    Article.destroy({
        where: { id }
    }).then(() => {
        res.redirect('/articles');
    });
    
})

router.get(`/edit/:id`, (req, res) => {
    let id = req.params.id;

    let categories = Category.findAll({ raw: true });
    let article = Article.findByPk(id);

    Promise.all([article, categories]).then(results => {
        res.render('articles/edit', {
            data: results[0],
            categories: results[1]
        });
    });
});

router.post('/update', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.update({
        title: title,
        slug: Slugify(title).toLowerCase(),
        body: body,
        categoryId: category
    }, {
        where: { id }
    }).then(() => {
        res.redirect('/articles');
    });
});

module.exports = router;
