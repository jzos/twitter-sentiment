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
    consumer_key: 'RWa11rM6eyvgNzbC5WgFfeBWH',
    consumer_secret: 'hmCsctUWRC55CjQ1ZDNrzHnGeJiou5kkIoqmYjQFtDpcqjnLn0',
    access_token: '19669840-6KOtUhSnKqwknnBSg2XTorG7v1uu4XXliAEhJyPTS',
    access_token_secret: 'H4O2BLfly5RNhho79DuX1fqwhf7Fdx7MPdIf3HmP3Zhp3',
    timeout_ms:           6000*1000  // optional HTTP request timeout to apply to all requests.
})


//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


var dbs = {};


//connect away



MongoClient.connect('mongodb://127.0.0.1:27017/automotive', function(err, db) {
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


sAutomotive = 'hyundai sucks,dealership sucks,ford sucks,mazda sucks,dodge sucks,toyota sucks,nissan sucks,dealership horrible,dealership service,buying car dealership,buying truck dealership,Capitol Chevrolet,Covert Chevrolet,Auto Nation Chevrolet,henna Chevrolet,rush chevrolet,covert ford,maxwell ford,truck city ford,south point dodge,nyle maxwell,covert dodge,Charles Maund Toyota,AutoNation Toyota,Round Rock Toyota,Roger Beasley Mazda,South Point Hyundai,Howdy Honda,Town North Nissan,msrp car,msrp truck,buy new car,buy new truck,buy used car,buy used truck,car loan, truck loan,vehicle loan,automotive loan, new truck, new car';


var stream = T.stream('statuses/filter', { track: sAutomotive, language: 'en' });



stream.on('tweet', function (tweet) {

    var date = tweet.created_at;

    tweet["created_at"] = new Date(Date.parse(date.replace(/( \+)/, ' UTC$1')));

    var r1              = sentiment(tweet.text);
    var dataRecord      = merge(tweet,r1);

    var jsondatasource  = {data_source : "twitter"};
    dataRecord          = merge(tweet,jsondatasource);

    //console.log(dataRecord);
    console.log(tweet["created_at"]);
    console.log(tweet["text"]);

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
