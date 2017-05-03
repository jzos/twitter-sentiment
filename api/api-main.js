/**
 * Created by jaimemac on 4/17/17.
 */


var express                 = require('express');
var compression             = require('compression')
var app                     = express();
var Twit                    = require('twit');
var bodyParser              = require('body-parser');

/*
*
*  Formidable Reference Docs
*  https://github.com/felixge/node-formidable
*
 */
var formidable              = require('formidable'),
                            http = require('http'),
                            util = require('util');






app.set('port', process.env.PORT || 5005);
app.set('host', process.env.HOST || 'localhost');

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('host') + ':' + app.get('port'));
});

app.use(compression());


var MongoClient         = require('mongodb').MongoClient
    , format = require('util').format;




 app.use(function(req,res,next){
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

     // intercept OPTIONS method
     if ('OPTIONS' == req.method)
     {
     res.send(200);
     } else
     {
        next();
     }
 });


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






/*
*  POST TO SOCIAL CHANNELS
*/




http.createServer(function(req, res) {


    if (req.url == '/api/twitter-publish' && req.method.toLowerCase() == 'post')
    {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.on('field', function(name, value)
        {

            console.log("Field Name : " + name);

        });




        form.on('file', function(name, file) {

            //console.log("File Name : " + name + " : " + file)

        });


        form.parse(req, function(err, fields, files)
        {

            console.log(util.inspect({fields: fields, files: files}));

            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });

        return;
    }



    /*
     *
     * Account : AustinAutodeals
     * App Name : Austin TX Automotive
     *
     */

    /*
     var T = new Twit({
     consumer_key: 'f0ySOZ0qUE3hBoOCfNnmDlOD1',
     consumer_secret: 'vqcQ11Dnd98MoQqdgaLVny58TwW2dy5QoWyxcd21oPrKqlF618',
     access_token: '857017093463715840-wgDrRnFxxre7TSEgI1Doqby586hx0Aj',
     access_token_secret: 't470e3VGiuvxNlJ0nWXNTpkfMNkBt0fKegIi4Y7V8ixyW',
     timeout_ms:           6000*1000  // optional HTTP request timeout to apply to all requests.
     })



     T.post('statuses/update', { status: 'First post from publishing app!' }, function(err, data, response) {
     console.log(data)
     })


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



}).listen(5006);





