const express = require('express');
const router = express.Router();

const Category = require('../model/Category');
const Article = require('../model/Article');
const Slugify = require('slugify');

const getDate = require('../public/scripts/getDate');
const authenticate = require('../middleware/authenticate');

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
            }, []),
            isAuthenticated: req.session.user != undefined,
            title: `Categorias`,
            categories: res.locals.categories

        });
    });
});

router.get('/read/:slug', (req, res) => {
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
            hasSlug: true,
            isAuthenticated: req.session.user != undefined,
            title: category.title,
            categories: res.locals.categories
        });
    }).catch(err => {
        res.render(`error`, { 
            title: `Erro`, 
            isAuthenticated: req.session.user != undefined,
            categories: res.locals.categories
        });
    })

});

router.get('/new', authenticate, (req, res) => {
    res.render('categories/new', {
        title: `Nova Categoria`,
        isAuthenticated: req.session.user != undefined,
        categories: res.locals.categories
    });
});

router.post('/save', authenticate, (req, res) => {
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

router.post('/delete', authenticate, (req, res) => {

    let id = req.body.id;

    let selectedItem = Category.findByPk(id , { raw: true });

    let articles = Article.findAll({ raw: true, where: { categoryId: id } });

    Promise.all([selectedItem, articles]).then(results => {
        if (results[0] != null) {
            if (results[1].length > 0) {
                results[1].forEach(article => {
                    Article.destroy({
                        where: { id: article.id }
                    });
                });
            }
            Category.destroy({
                where: { id }
            })
        }

        res.redirect('/categories'); // Eu deixei o redirect aqui pq como a Promise é assíncrona, se eu deixar o redirect fora, ele vai executar antes da Promise ser resolvida e vai manter exibindo a categoria que eu deletei
    });
    
});

router.get('/edit/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (isNaN(id)) {
        res.redirect('/categories');
    }

    let selectedItem = Category.findByPk(id, { raw: true });

    Promise.all([selectedItem]).then(results => {

        if (results[0] == null || results[0] == undefined) throw new Error("Category not found");

        let category = results[0];
        res.render('categories/edit', { 
            data: category,
            title: `Editar Categoria`,
            isAuthenticated: req.session.user != undefined,
            categories: res.locals.categories
        });
    }).catch(err => {
        res.render(`error`, { 
            title: `Erro`, 
            isAuthenticated: req.session.user != undefined,
            categories: res.locals.categories
        });
    });

});

router.post('/update', authenticate, (req, res) => {
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