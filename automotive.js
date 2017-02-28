/**
 * Created by jaimemac on 12/4/16.
 */

var sentiment           = require('sentiment');
var merge               = require('merge'), original, cloned;

//var express             = require('express');
//var app = express();
//app.set('port', (process.env.PORT || 5000));


var Twit = require('twit');

var T = new Twit({
    consumer_key: 'zrygVD3bcdopRZLeUsRZzsfQd',
    consumer_secret: 'Xan82IfcwSdDctsidGjkRzqD0CGbQ9MMPZeaROfldDH2EYrABm',
    access_token: '19669840-ipMlfY9C6MuajkGYm9EZaF9cG03GUKQUqDYYgvV0l',
    access_token_secret: 'f7qbiBYV06WLcFpNUL2KEIoU71Equ4jb9a9jIrSKiszdt',
    timeout_ms:           6000*1000  // optional HTTP request timeout to apply to all requests.
})


//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


var dbs = {};


//connect away



MongoClient.connect('mongodb://127.0.0.1:27017/automotive', function(err, db) {
//MongoClient.connect('mongodb://mongoapp:kill129999@ds135969-a0.mlab.com:35969,ds135969-a1.mlab.com:35969/heroku_9sw52m8z?replicaSet=rs-ds135969', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    dbs = db;
});





T.get('account/verify_credentials', { skip_status: true })
    .catch(function (err) {
        console.log('caught error', err.stack)
    })
    .then(function (result) {
        // `result` is an Object with keys "data" and "resp".
        // `data` and `resp` are the same objects as the ones passed
        // to the callback.
        // See https://github.com/ttezel/twit#tgetpath-params-callback
        // for details.

        //console.log('data', result.data);
    })


sAutomotive = 'Hyundai sucks,Hyundai dealership sucks,ford car sucks,mazda car sucks,dodge car sucks,toyota car sucks,ford truck sucks,toyota sucks,mazda sucks,mazda dealership sucks,ford dealership sucks,chevrolet dealership sucks,nissan sucks, nissan dealership sucks,dodge truck sucks,dodge dealership sucks,Capitol Chevrolet,Covert Chevrolet,Auto Nation Chevrolet,henna Chevrolet,rush chevrolet,covert ford,maxwell ford,truck city ford,south point dodge,nyle maxwell,covert dodge,Charles Maund Toyota,AutoNation Toyota,Round Rock Toyota,Roger Beasley Mazda,South Point Hyundai,Howdy Honda,Town North Nissan,buy a new car,buy a car,buy a used car, buy used car,buy a new truck,buy new truck,buy truck,buy car,msrp,need buy car truck,need new car truck,need used car truck';

var stream = T.stream('statuses/filter', { track: sAutomotive, language: 'en' });



stream.on('tweet', function (tweet) {

    var date = tweet.created_at;

    tweet["created_at"] = new Date(Date.parse(date.replace(/( \+)/, ' UTC$1')));

    var r1              = sentiment(tweet.text);
    var dataRecord      = merge(tweet,r1);

    console.log(dataRecord);

    //insert record
    dbs.collection('dealerships').insert(dataRecord, function(err, records) {
        if (err) throw err;
        console.log("Record added as "+records.ops[0]._id);
    });


    console.log("*************************************");

})



stream.on('limit', function (limitMessage) {
    console.log(limitMessage);
})


stream.on('warning', function (warning) {
    console.log(warning);
})


stream.on('error', function (error) {
    console.log("error");
})
