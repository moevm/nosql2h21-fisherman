const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
const Hello = mongoose.model("Hello", {name: String});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/test', function (req, res, next) {
    let answer = helloWorld();
    res.json(answer);
});

router.get('*', (req, res) => {
    res.status(404);
    res.end();
});

function helloWorld() {
    const hello = new Hello({name: "World"});
    hello.save();
    return hello.toJSON();
}

module.exports = router;
