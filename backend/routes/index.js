const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    next();
});

router.get('*', (req, res) => {
    res.status(404);
    res.end();
});

module.exports = router;
