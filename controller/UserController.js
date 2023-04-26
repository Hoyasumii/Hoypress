const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get(`/`, (req, res) => {
    User.findAll({ raw: true }).then(users => {
        res.json(users);
    })
});

router.get(`/register`, (req, res) => {
    res.render(`user/register`);
});

module.exports = router;