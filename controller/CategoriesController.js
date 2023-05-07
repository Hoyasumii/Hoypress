const express = require('express');
const router = express.Router();

const Category = require('../model/Category');
const Article = require('../model/Article');
const Slugify = require('slugify');

const getDate = require('../public/scripts/getDate');

router.get('/', (req, res) => {
    Category.findAll({ raw: true, order: [[`id`, `DESC`]] }).then(categories => {
        res.render('categories/index', {

            data: categories.reduce((acc, category) => { // Aqui eu estou usando o reduce para transformar o array de objetos em um array de objetos com apenas os atributos que eu quero
                acc.push({
                    id: category.id,
                    title: category.title,
                    slug: category.slug
                });
                return acc;
            }, [])
        });
    });
});

router.get('/read/:slug', (req, res) => { // TODO: Criar uma página de erro 404
    let slug = req.params.slug;

    let category = Category.findOne({ where: { slug }, include: [{model: Article}]}); // Eu estou incluindo todos os artigos que tiverem essa categoria

    Promise.all([category]).then(results => {

        let category = results[0];

        if (!category) throw new Error("Category not found");

        category.articles.sort((a, b) => b.id - a.id); // Aqui eu estou ordenando os artigos pelo id de forma decrescente (do maior para o menor)

        res.render('articles/index', {
            data: results[0].articles.reduce((acc, article) => {
                acc.push({
                    id: article.id,
                    title: article.title,
                    category: category,
                    slug: article.slug,
                    createdAt: getDate(article.createdAt),
                    updatedAt: getDate(article.updatedAt)
                });
                return acc;
            }, []),
            slug: slug,
            hasSlug: true
        });
    }).catch(err => {
        res.render(`error`);
    })


});

router.get('/new', (req, res) => {
    res.render('categories/new');
});

router.post('/save', (req, res) => {
    let title = req.body.title;

    if (title == undefined) {
        res.redirect('/categories/new');
    }

    Category.create({
        title: title,
        slug: Slugify(title).toLowerCase()
    }).then(() => {
        res.redirect('/categories');
    });

});

router.post('/delete', (req, res) => { // TODO: Adicionar a funcionalidade para remover todos os artigos que tiverem essa categoria
    let id = req.body.id;

    let selectedItem = Category.findOne({ // Ao invés de usar o findOne pelo id, eu poderia usar o findByPk, que é um método do sequelize que faz a mesma coisa
        where: { id },
        raw: true
    })

    Promise.all([selectedItem]).then(results => {
        if (results[0] != null) {
            Category.destroy({
                where: { id }
            })
        }
        res.redirect('/categories'); // Eu deixei o redirect aqui pq como a Promise é assíncrona, se eu deixar o redirect fora, ele vai executar antes da Promise ser resolvida e vai manter exibindo a categoria que eu deletei
    });
    
});

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;

    if (isNaN(id)) {
        res.redirect('/categories');
    }

    let selectedItem = Category.findByPk(id, { raw: true });

    Promise.all([selectedItem]).then(results => {

        if (results[0] == null || results[0] == undefined) {
            res.redirect('/categories');
        }

        let category = results[0];
        res.render('categories/edit', { data: category });
    });

});

router.post('/update', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    if (isNaN(id)) {
        res.redirect('/categories');
    }

    Category.update({
        title: title,
        slug: Slugify(title)
    }, {
        where: { id }
    }).then(() => {
        res.redirect('/categories');
    });
});

module.exports = router;