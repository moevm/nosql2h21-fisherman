const express = require('express');
const router = express.Router({mergeParams: true});
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/");

let clientDB;
let productsCollection;
let usersCollection;
let ordersCollection;

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
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

router.post('/users', function (req, res, next) {
    const {body} = req;
    if (!body) return;
    const login = body.login;
    usersCollection.find({login}).toArray((err, users) => {
        if (err) return console.log(err);
        if (users.length) {
            if (users[0].password === body.password) {
                res.json(users[0]);
            }
        }
    });
});

router.get('/products/:title', function (req, res, next) {
    const title = new RegExp([req.params.title].join(""), "i");
    productsCollection.find({title: title}).toArray((err, products) => {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.post('/products/delete', (req, res) => {
    productsCollection.deleteOne({_id: req.body.id});
});

router.post('/products/add', (req, res) => {
    productsCollection.insertOne({
        image: req.body.image,
        vendorCode: req.body.vendorCode,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count
    });
});

router.post('/orders/editStatus', (req, res) => {
    ordersCollection.updateOne(
        {_id: req.body.id},
        {$set: {status: req.body.newStatus}}
    );
});

router.post('/orders/add', (req, res) => {
    const result = ordersCollection.insertOne({
        phone: req.body.phone,
        address: req.body.address,
        comment: req.body.comment,
        products: req.body.products,
    });

    res.json(result.insertedId);
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
