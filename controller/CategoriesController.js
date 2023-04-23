const express = require('express');
const router = express.Router();

const Category = require('../model/Category');
const Slugify = require('slugify');

router.get('/', (req, res) => {
    Category.findAll({ raw: true }).then(categories => {
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
        slug: Slugify(title)
    }).then(() => {
        res.redirect('/categories');
    });

});

router.post('/delete', (req, res) => {
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