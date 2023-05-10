const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../model/User');

const salt = bcrypt.genSaltSync(12);

router.get(`/register`, (req, res) => {
    res.render(`users/access`, {
        register: true,
        title: req.session.title,
        isAuthenticated: req.session.user != undefined,
        categories: res.locals.categories
    });
});

router.post(`/register`, async (req, res) => {
    
    let { email, password } = req.body;
    let password_hash = bcrypt.hashSync(password, salt);
    let status = true;

    await User.findOne({ where: {email} }).then(user => {
        if(user != undefined) {
            status = false;
            res.redirect(`/users/register`);
        }
    })

    if (!status) return;

    await User.create({
        email,
        password_hash
    }).then(() => {
        res.redirect(`/users/login`);
    })

});

router.get(`/login`, (req, res) => {
    res.render(`users/access`, {
        register: false,
        title: `Acessar Conta`,
        isAuthenticated: req.session.user != undefined,
        categories: res.locals.categories
    });
})

router.post(`/authenticate`, (req, res) => {

    let { email, password } = req.body;

    User.findOne({ where: {email} }).then(user => {
        if (user != undefined) {
            let correct = bcrypt.compareSync(password, user.password_hash);

            if (correct) {

                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect(`/`);

            } else {
                res.redirect(`/users/login`);
            }

        } else {
            res.redirect(`/users/login`);
        }
    })

});

router.get(`/logout`, (req, res) => {
    req.session.user = undefined;
    res.redirect(`/`);
});

module.exports = router;