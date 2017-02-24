//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


var dbs = {};

MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db) {
//MongoClient.connect('mongodb://mongoapp:kill129999@ds135969-a0.mlab.com:35969,ds135969-a1.mlab.com:35969/heroku_9sw52m8z?replicaSet=rs-ds135969', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    dbs = db;


    dbs.collection('jackinthebox').find().forEach(function(element){
        element.id = new Date(Date.parse(element.id.replace(/( \+)/, ' UTC$1')));
        dbs.jackinthebox.save(element);
    })


    /*
    dbs.collection('jackinthebox').find().sort({id: 1}, function (err, docs) {
        // docs is now a sorted array
    })
    */



});


