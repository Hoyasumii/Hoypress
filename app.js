const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('./database');
connection.authenticate()
    .then(() => console.log("Connection has been established successfully!"))
    .catch((error) => console.log(error));

const Article = require('./model/Article');
const Category = require('./model/Category');

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false})); // Para aceitar dados de formulários
app.use(bodyParser.json()); // Para aceitar dados de JSON

app.get(`/`, (req, res) => {
    res.render("index");
})

app.use('/categories', require('./controller/CategoriesController')); // Maneira para importar um arquivo de rotas. Esse valor inicial seria um prefixo que indicaria que todas as rotas do arquivo CategoriesController.js teriam esse prefixo. Caso você não queira um prefixo, basta passar um valor vazio: '/'.
app.use('/articles', require('./controller/ArticlesController'));

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
})
