const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// TODO: Quando eu terminar de desenvolver esse projeto, colocar o Sequelize para usar o sqlite ao invés do mysql

const Categories = require('./model/Category');

const connection = require('./database');
connection.authenticate()
    .then(() => console.log("Connpaection has been established successfully!"))
    .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(session({
    secret: "shelovesyouyeahyeahyeah",
    cookie: { 
        maxAge: 1000 * 60 * 60 // 1 hour
    },
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: false})); // Para aceitar dados de formulários
app.use(bodyParser.json()); // Para aceitar dados de JSON

app.use((req, res, next) => { // Middleware global que pega todas as categorias e as coloca em res.locals.categories; { title: "title", slug: "slug" }
    Categories.findAll({ raw: true }).then(categories => {
        let categoriesObj = categories.reduce((acc, category) => {
            acc[category.id] = { title: category.title, slug: category.slug };
            return acc;
        }, {});
        res.locals.categories = Object.values(categoriesObj);
        next();
    })
})


app.use('/home', require('./controller/HomeController'));
app.use('/users', require('./controller/UsersController'));
app.use('/categories', require('./controller/CategoriesController'));
app.use('/articles', require('./controller/ArticlesController'));


app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use((req, res, next) => {
    res.status(404).render(`error`, {
        title: `Erro`,
        isAuthenticated: req.session.user != undefined,
        categories: res.locals.categories
    })
})

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
})
