/**
 * Created by jaimemac on 12/4/16.
 */

//var mongodb             = require('mongodb');
var fs                  = require('fs');


var Twit = require('twit')

var T = new Twit({
    consumer_key: 'zrygVD3bcdopRZLeUsRZzsfQd',
    consumer_secret: 'Xan82IfcwSdDctsidGjkRzqD0CGbQ9MMPZeaROfldDH2EYrABm',
    access_token: '19669840-XOultZI0L1jxOXbsEW7iMHci9immcBdA8yWFFhjWj',
    access_token_secret: '8jaun7URar2BC3JK9F7vXKKPQQsprLc1MqrnkB9VSr9Nv',
    timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
})


//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


var dbs = {};


//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db) {
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
//
/*
T.get('search/tweets', { q: 'trump since:2016-10-01', count: 10}, function(err, data, response) {
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
        //console.log('caught error', err.stack)
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


var stream = T.stream('statuses/filter', { track: '#trump', language: 'en' })


stream.on('tweet', function (tweet) {
    console.log(tweet);

    //insert record
    dbs.collection('tweet').insert(tweet, function(err, records) {
        if (err) throw err;
        console.log("Record added as "+records.ops[0]._id);
    });
})
