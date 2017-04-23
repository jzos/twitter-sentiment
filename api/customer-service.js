/**
 * Created by jaimemac on 4/17/17.
 */


var express                 = require('express');
var compression             = require('compression')
var app                     = express();


app.set('port', process.env.PORT || 5005);
app.set('host', process.env.HOST || 'platform.symamp.com');

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('host') + ':' + app.get('port'));
});

app.use(compression());


var MongoClient         = require('mongodb').MongoClient
                        , format = require('util').format;



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
        collection.find({},{created_at: 1, text: 1, coordinates: 1, score: 1, data_source: 1, 'user.profile_image_url': 1,'user.name': 1, 'user.screen_name': 1, postURL: 1}).limit(200).sort({"created_at": -1}).toArray(function(err, items) {
            console.log(items);
            res.send(req.query.callback + '('+ JSON.stringify(items) + ');');
        });
    });

});