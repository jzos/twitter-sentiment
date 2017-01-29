/**
 * Created by jaimemac on 12/4/16.
 */

var fs                  = require('fs');
var sentiment           = require('sentiment');
var merge               = require('merge'), original, cloned;



var Twit = require('twit');

var T = new Twit({
    consumer_key: 'qphEVi498C5OGVaCKnl6QGVGy',
    consumer_secret: '9TKbkrcVSRqefw5fQ9v8wkQtktbHOSjdy2evUzwSxjylxqACF4',
    access_token: '19669840-EE31VHbTfidEHEhqnO2epnsaY6EqSy6XUbMBfRjkg',
    access_token_secret: 'MyzxhVfaZKEwwIGqB6zZdMaE0zIGJsWt6q2e5WWB4QnRX',
    timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
})


//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


var dbs = {};


//connect away

//MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db) {
MongoClient.connect('mongodb://mongoapp:kill129999@ds135969-a0.mlab.com:35969,ds135969-a1.mlab.com:35969/?replicaSet=rs-ds135969', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    dbs = db;
});


/*
//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data)
})
*/

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//  https://dev.twitter.com/rest/public/search


/*

var sSecurityPhrases = "trump,clinton,cops,police,shooting,gun,hatecrime,hatespeech,kill,hurt,gay,lesbian,isis,muslim,potus,president";


function getTweets()
{
    //  Twitter API is limited for 7 days
    T.get('search/tweets', { q: 'police since:2016-12-19 until:2016-12-20 max_id:810997946082738180', count: 100 }, function(err, data, response) {
        //console.log(data);

        var arrayTweets = [];

        arrayTweets = data.statuses;

        for (var i in arrayTweets)
        {

            var r1              = sentiment(arrayTweets[i].text);
            var dataRecord      = merge(arrayTweets[i],r1);

            //console.log(dataRecord);


            //insert record
            dbs.collection('security').insert(dataRecord, function(err, records) {
                if (err) throw err;
                console.log("Record added as "+records.ops[0]._id);
            });

        }


    })
}

*/

//getTweets();


/*

T.get('users/search', { q: 'Jaime Cavazos' }, function (err, data, response) {
    console.log(data)
})

*/




/*
//
//  get the list of user id's that follow @tolga_tezel
//
T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
    console.log(data)
})

*/
//
// Twit has promise support; you can use the callback API,
// promise API, or both at the same time.
//






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

//
//  retweet a tweet with id '343360866131001345'
//

/*
T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
    console.log(data)
})
*/

//
//  destroy a tweet with id '343360866131001345'
//

/*
T.post('statuses/destroy/:id', { id: '343360866131001345' }, function (err, data, response) {
    console.log(data)
})

//
// get `funny` twitter users
//
T.get('users/suggestions/:slug', { slug: 'funny' }, function (err, data, response) {
    console.log(data)
})
*/

//
// post a tweet with media
//


/*
var b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' })

// first we must post the media to Twitter
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "Small flowers in a planter on a sunny balcony, blossoming."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

            T.post('statuses/update', params, function (err, data, response) {
                console.log(data)
            })
        }
    })
})

//
// post media via the chunked media upload API.
// You can then use POST statuses/update to post a tweet with the media attached as in the example above using `media_id_string`.
// Note: You can also do this yourself manually using T.post() calls if you want more fine-grained
// control over the streaming. Example: https://github.com/ttezel/twit/blob/master/tests/rest_chunked_upload.js#L20
//
var filePath = '/absolute/path/to/file.mp4'
T.postMediaChunked({ file_path: filePath }, function (err, data, response) {
    console.log(data)
})

*/

//
//  stream a sample of public statuses
//

/*
var stream = T.stream('statuses/sample')

stream.on('tweet', function (tweet) {
    console.log(tweet)
})
*/

//
//  filter the twitter public stream by the word 'mango'.
//


/*
var stream = T.stream('statuses/filter', { track: 'mango' })

stream.on('tweet', function (tweet) {
    console.log(tweet)
})
*/

//
// filter the public stream by the latitude/longitude bounded box of San Francisco
//
/*
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

var stream = T.stream('statuses/filter', { locations: sanFrancisco })

stream.on('tweet', function (tweet) {
    console.log(tweet)
})

*/

//
// filter the public stream by english tweets containing `#apple`
// https://dev.twitter.com/streaming/reference/post/statuses/filter






//var sSecurity = '#trump,#clinton,#cops,#police,#shooting,#gun,#hatecrime,#hatespeech,#kill,#hurt,#gay,#lesbian,#isis,#muslim,#potus,#president';

//var sJackInTheBox = 'brunchfast,#brunchfast,Brunch Burger,Southwest Scrambler Plate,Homestyle Potatoes,Bacon & Egg Chicken Sandwich,Orange Cranberry Muffins,Mini Pancakes,Blood Orange Fruit Cooler,Original Iced Coffee,Coca-Cola Freestyle';
sJackInTheBox = 'jack in the box,@JackBox';



var stream = T.stream('statuses/filter', { track: sJackInTheBox, language: 'en' });



stream.on('tweet', function (tweet) {

    var r1              = sentiment(tweet.text);
    var dataRecord      = merge(tweet,r1);

    console.log(dataRecord);

    //insert record
    dbs.collection('jackinthebox').insert(dataRecord, function(err, records) {
        if (err) throw err;
        console.log("Record added as "+records.ops[0]._id);
    });


    console.log("*************************************");

})





/*

var stream = T.stream('statuses/sample')

stream.on('tweet', function (tweet) {
    console.log(tweet)
})


 stream.on('disconnect', function (disconn) {
 console.log('disconnect')
 })

 stream.on('connect', function (conn) {
 console.log('connecting')
 })

 stream.on('reconnect', function (reconn, res, interval) {
 console.log('reconnecting. statusCode:', res.statusCode)
 })





 stream.on('connected', function (response) {
 console.log(response);
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

 */


