/**
 * Created by jaimemac on 4/17/17.
 */


var express                 = require('express');
var compression             = require('compression')
var app                     = express();
var Twit                    = require('twit');
var bodyParser              = require('body-parser');
var fs                      = require("fs");
var csv                     = require("fast-csv");
var winston                 = require('winston');
var download                = require('image-downloader')

/*
*
*  Formidable Reference Docs
*  https://github.com/felixge/node-formidable
*
 */
var formidable              = require('formidable'),
                            http = require('http'),
                            util = require('util');

var arrayAuto = [];
var iWatch    = null;


function saveLog(sLog, sErrorMessage)
{
    winston.add(winston.transports.File, { filename: 'error-log/api-main.log' });
    winston.log('info', sLog);
    winston.error(sErrorMessage);
}



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
*  POST TO SOCIAL CHANNELS ////////////////////////////////////////////////
*/




var server = http.createServer(function(req, res) {


    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, Content-Length, X-Requested-With");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method)
    {
        res.send(200);
    }


    if (req.url == '/api/twitter-publish' && req.method.toLowerCase() == 'post')
    {

        var sTitle              = "";
        var sContent            = "";
        var sImgPath            = "";
        var sImgAltText         = "";
        var sVideoTmpPath       = "";
        var sVideoLocalPath     = "";
        var sCSVTmpPath         = "";
        var sCSVLocalPath       = "";

        var fileTmpDir          = (require('path').dirname(Object.keys(require.cache)[0])).replace("api","tmp-files/");



        var form = new formidable.IncomingForm();


        // Parses field information
        form.on('field', function(name, value)
        {

            if (name == "content")
            {
                sContent = value;
            }

        });


        // Parses image and video information
        form.on('file', function(name, file)
        {

            //console.log("Field Name : " + name + "     FilePath : " + file.path + "     File Name : " + file.name);

            if (name == "publish_image" && file.name.length > 0)
            {
                sImgPath            = file.path;
                sImgAltText         = file.name;
            }

            if (name == "publish_video" && file.name.length > 0)
            {
                sVideoTmpPath       = file.path;
                sVideoLocalPath     = fileTmpDir + file.name;
            }

            if (name == "publish_csv" && file.name.length > 0)
            {/*
                sCSVTmpPath         = file.path;
                sCSVLocalPath       = fileTmpDir + file.name;
*/
                sCSVTmpPath         = "http://www.capcomsoftware.com/downloads/csv/facebook/facebook_Capitol_Chevrolet.csv";
                sCSVLocalPath       = fileTmpDir + "facebook_Capitol_Chevrolet.csv";
            }
        });


        form.parse(req, function(err, fields, files)
        {

            //console.log(util.inspect({fields: fields, files: files}));

            postToTwitter(sContent, sImgPath, sImgAltText, sVideoTmpPath, sVideoLocalPath, sCSVTmpPath, sCSVLocalPath, res);



        });







        /*
         *
         * Account : AustinAutodeals
         * App Name : Austin TX Automotive
         *
         */

        function postToTwitter(content, imagePath, imageAltText, videoTmpPath, videoLocalPath, csvTmpPath, csvLocalPath, response)
        {


            var T = new Twit({
                consumer_key: 'f0ySOZ0qUE3hBoOCfNnmDlOD1',
                consumer_secret: 'vqcQ11Dnd98MoQqdgaLVny58TwW2dy5QoWyxcd21oPrKqlF618',
                access_token: '857017093463715840-wgDrRnFxxre7TSEgI1Doqby586hx0Aj',
                access_token_secret: 't470e3VGiuvxNlJ0nWXNTpkfMNkBt0fKegIi4Y7V8ixyW',
                timeout_ms:           6000*1000  // optional HTTP request timeout to apply to all requests.
            })

            ////////////// POST CONTENT //////////////////

            if (content.length > 0 && imagePath.length == 0 && videoTmpPath.length == 0)
            {

                T.post('statuses/update', { status: content }, function(err, data, response)
                {
                    console.log("Content only created at " + data.created_at);

                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write("Posted Status at  : " + data.created_at + " : Post was successful");
                    res.end("");


                });

            }




            ///////////// POST IMAGE ////////////////

            if (imagePath.length > 0 && videoTmpPath.length == 0)
            {

                var b64content = fs.readFileSync(imagePath, {encoding: 'base64'});



                // first we must post the media to Twitter
                T.post('media/upload', {media_data: b64content}, function (err, data, response) {

                    //console.log("err :" + err + "    data : " + data + "     response : " + response);


                    if (!err) {




                        // now we can assign alt text to the media, for use by screen readers and
                        // other text-based presentations and interpreters
                        var mediaIdStr = data.media_id_string;
                        var altText = imageAltText;
                        var meta_params = {media_id: mediaIdStr, alt_text: {text: altText}};
                        //var content_param = {statusContent: content};


                        T.post('media/metadata/create', meta_params, function (err, data, response)
                        {

                            //console.log("err :" + err + "    data : " + data + "    response : " + response);

                            if (!err)
                            {

                                // now we can reference the media and post a tweet (media will attach to the tweet)
                                var params = {status: content, media_ids: [mediaIdStr]}

                                T.post('statuses/update', params, function (err, data, response) {
                                    console.log("Image and Content created at " + data.created_at);

                                    res.writeHead(200, {'content-type': 'text/plain'});
                                    res.write("Posted Image and Status at  : " + data.created_at);
                                    res.end("");
                                })
                            }
                        })
                    }
                })
            }




            ///////////// POST VIDEO ////////////////

             //
             // post media via the chunked media upload API.
             // You can then use POST statuses/update to post a tweet with the media attached as in the example above using `media_id_string`.
             // Note: You can also do this yourself manually using T.post() calls if you want more fine-grained
             // control over the streaming. Example: https://github.com/ttezel/twit/blob/master/tests/rest_chunked_upload.js#L20
             //
            if (imagePath.length == 0 && videoTmpPath.length > 0)
            {

                fs.createReadStream(videoTmpPath)
                    .pipe(fs.createWriteStream(videoLocalPath))
                    .on('error', function(){})
                    .on('finish', function() {

                        postVideoToTwitter();

                    });



                function postVideoToTwitter()
                {
                    T.postMediaChunked({file_path: videoLocalPath}, function (err, data, response) {

                        if (!err) {

                            var videoIdStr = data.media_id_string;


                            var params = {status: content, media_ids: videoIdStr};

                            T.post('statuses/update', params, function (err, data, response)
                            {
                                console.log("Video and Content created at " + data.created_at);

                                res.writeHead(200, {'content-type': 'text/plain'});
                                res.write("Posted Video and Status at  : " + data.created_at);
                                res.end("");
                            })

                        }
                    })
                }

            }


            ///////////// POST CSV ///////////////////

            if (csvTmpPath.length > 0)
            {

                /***** TODO : Put this in utilities ******/

                fs.createReadStream(csvTmpPath)
                .pipe(fs.createWriteStream(csvLocalPath))
                .on('error', function(){})
                .on('finish', function() {

                    LoadCSV(csvLocalPath);

                });

                function LoadCSV(sCSVFileName)
                {
                    var iFileCount = 0;


                    csv
                    .fromPath(sCSVFileName)
                    .on("data", function(data){

                        if (iFileCount > 0 && iFileCount < 5)
                        {
                            saveImages(data[0], data[4]);
                        }

                        iFileCount++;

                    })
                    .on("end", function(){

                        saveLog("csv file loaded","none");

                        var iWatch = setTimeout(checkImagesSaved, 2000);
                    });
                }



                function saveImages(sContent, sURLFile)
                {

                        var options = {
                            url: sURLFile,
                            dest: fileTmpDir
                        }

                        download.image(options)
                            .then(function(filename, image){
                            //console.log('File saved to', filename.filename);
                                arrayAuto.push({"content": sContent, "file": filename.filename});

                        }).
                        catch(function(err) {
                            throw err
                        })

                }


                function checkImagesSaved()
                {
                    if (arrayAuto.length > 0)
                    {
                        clearTimeout(iWatch);
                        postBatchFiles();
                    }
                }


                function postBatchFiles()
                {



                    for (var i in arrayAuto)
                    {
                        postContentImageTwitter(arrayAuto[i].content, arrayAuto[i].file);
                    }

                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write("Posted Multiple Image and Statuses");
                    res.end("");

                }



                function postContentImageTwitter(content, imagePath)
                {

                    var b64content = fs.readFileSync(imagePath, {encoding: 'base64'});



                    // first we must post the media to Twitter
                    T.post('media/upload', {media_data: b64content}, function (err, data, response) {

                        if (!err) {

                            // now we can assign alt text to the media, for use by screen readers and
                            // other text-based presentations and interpreters
                            var mediaIdStr = data.media_id_string;
                            var altText = content;
                            var meta_params = {media_id: mediaIdStr, alt_text: {text: altText}};
                            //var content_param = {statusContent: content};


                            T.post('media/metadata/create', meta_params, function (err, data, response)
                            {

                                //console.log("err :" + err + "    data : " + data + "    response : " + response);

                                if (!err)
                                {

                                    // now we can reference the media and post a tweet (media will attach to the tweet)
                                    var params = {status: content, media_ids: [mediaIdStr]}

                                    T.post('statuses/update', params, function (err, data, response) {
                                        console.log("Image and Content created at " + data.created_at);



                                    })
                                }
                                else
                                {
                                    res.writeHead(200, {'content-type': 'text/plain'});
                                    res.write("Images and Content were not posted");
                                    res.end("");
                                }
                            })
                        }
                    })
                }

            }


        }



    }  // END OF TWITTER PUBLISH


}).listen(5006);





