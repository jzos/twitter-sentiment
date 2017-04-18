/**
 * Created by jaimemac on 4/17/17.
 */

var express             = require('express');
var app                 = express();
var MongoClient         = require('mongodb').MongoClient
                        , format = require('util').format;

app.listen(process.env.PORT || 5005);

/*
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
*/

console.log("Running at Port 5005");

var dbs = {};

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/automotive', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    dbs = db;
});

app.set("jsonp callback", true);


app.use('/api/complaint-stream', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

app.get('/api/complaint-stream', function (req, res, next) {

    //find records
    dbs.collection('dealerships', function(err, collection) {
        collection.find().limit(2).toArray(function(err, items) {
            console.log(items);
            res.send(req.query.callback + '('+ JSON.stringify(items) + ');');
        });
    });

});