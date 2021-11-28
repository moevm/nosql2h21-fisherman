const express = require('express');
const router = express.Router({mergeParams: true});
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/");
var ObjectID = require('mongodb').ObjectID;


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

router.get('/products', async function (req, res, next) {
    await productsCollection.find({}).toArray((err, products) => {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.get('/orders', async function (req, res, next) {
    await ordersCollection.find({}).toArray((err, orders) => {
        if (err) return console.log(err);
        res.json(orders);
    });
});

router.post('/users', async function (req, res, next) {
    const {body} = req;
    if (!body) return;
    const login = body.login;
    await usersCollection.find({login}).toArray((err, users) => {
        if (err) return console.log(err);
        if (users.length) {
            if (users[0].password === body.password) {
                res.json(users[0]);
            }
        }
    });
});

router.get('/products/:title', async function (req, res, next) {
    const title = new RegExp([req.params.title].join(""), "i");
    await productsCollection.find({title: title}).toArray((err, products) => {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.post('/products/delete', async (req, res) => {
    await productsCollection.deleteOne({_id: new ObjectID(req.body.id)});
    res.end();
});

router.post('/products/add', async (req, res) => {
    const result = await productsCollection.insertOne({
        image: req.body.image,
        vendorCode: req.body.vendorCode,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count
    });
    res.json(result.insertedId);
});

router.post('/orders/editStatus', async(req, res) => {
    await ordersCollection.updateOne(
        {"_id": new ObjectID(req.body.id)},
        {$set: {"status": req.body.newStatus}}
    );
    res.end();
});

router.post('/orders/add', async(req, res) => {
    const result = await ordersCollection.insertOne({
        phone: req.body.phone,
        address: req.body.address,
        comment: req.body.comment,
        products: req.body.products,
        user: req.body.people_id
    });

    res.json(result.insertedId);
});

router.post('/addUser', async (req, res) => {
    await usersCollection.insertOne({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    });
    res.end();
});

router.get('*', (req, res) => {
    res.status(404);
    res.end();
});

module.exports = router;
