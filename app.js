const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// TODO: Quando eu terminar de desenvolver esse projeto, colocar o Sequelize para usar o sqlite ao invés do mysql

const connection = require('./database');
connection.authenticate()
    .then(() => console.log("Connection has been established successfully!"))
    .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false})); // Para aceitar dados de formulários
app.use(bodyParser.json()); // Para aceitar dados de JSON

app.use('/home', require('./controller/HomeController'));
app.use('/categories', require('./controller/CategoriesController'));
app.use('/articles', require('./controller/ArticlesController'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
})
