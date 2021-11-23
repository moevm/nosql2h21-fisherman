const express = require('express');
const router = express.Router({mergeParams: true});
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/");

let clientDB;
let productsCollection;
let usersCollection;
let ordersCollection;

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    clientDB = client.db("Fisherman");

    productsCollection = clientDB.collection("Products");
    usersCollection = clientDB.collection("Users");
    ordersCollection = clientDB.collection("Orders");
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/products', function (req, res, next) {
    productsCollection.find({}).toArray((err, products) => {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.get('/orders', function (req, res, next) {
    ordersCollection.find({}).toArray((err, orders) => {
        if (err) return console.log(err);
        res.json(orders);
    });
});

router.get('/users', function (req, res, next) {
    usersCollection.find({}).toArray((err, users) => {
        if (err) return console.log(err);
        res.json(users);
    });
});

router.get('/users/:login', function (req, res, next) {
    const login = req.params.login;
    usersCollection.find({login}).toArray((err, users) => {
        if (err) return console.log(err);
        res.json(users);
    });
});

router.get('/products/:title', function (req, res, next) {
    const title = new RegExp([req.params.title].join(""), "i");
    productsCollection.find({title: title}).toArray((err, products) => {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.post('/deleteProduct', (req, res) => {
    const id = req.body.id;
    productsCollection.deleteOne({_id: id});
});

router.post('/addUser', (req, res) => {
    usersCollection.insertOne({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    });
});

router.get('*', (req, res) => {
    res.status(404);
    res.end();
});

module.exports = router;
