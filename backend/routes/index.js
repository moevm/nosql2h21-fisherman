const express = require('express');
const router = express.Router();
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
