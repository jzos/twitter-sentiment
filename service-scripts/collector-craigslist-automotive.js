var request             = require('request');
var cheerio             = require('cheerio');
var sentiment           = require('sentiment');
var merge               = require('merge'), original, cloned;

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var dbs = {};



MongoClient.connect('mongodb://127.0.0.1:27017/automotive', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    dbs = db;
});


var iAmount = 0;
var timerPost;


request("https://austin.craigslist.org/search/cto", function (error, response, html) {

    if (error)
    {
        console.log(error);
    }

    var $ = cheerio.load(html);
    var arrayPosts = [];

    $(".rows .result-row").each(function(i,elem){

        //var timerPost = setTimeout(getPosts, 5000, $(this).find("a").attr("href"));

        arrayPosts.push($(this).find("a").attr("href"));
        //getPosts($(this).find("a").attr("href"));
    })

    timerPost = setInterval(getPosts, 20000, arrayPosts);

});




function getPosts(arrayPosts)
{

    request("https://austin.craigslist.org" + arrayPosts[iAmount], function (error, response, html) {

        var $ = cheerio.load(html);

        var jsonDoc = {};

        var id = $(".postinginfos .postinginfo").first().text().replace("post id: ", "");
        var text = $("#postingbody").text().replace("show contact info", "").replace("QR Code Link to This Post", "").replace(/(\r\n|\n|\r)/gm, "").trim();
        var long = $("#map").attr("data-longitude");
        var lat = $("#map").attr("data-latitude");
        var img = $(".gallery img").first().attr("src");
        var source = "craigslist";
        var postURL = "https://austin.craigslist.org" + arrayPosts[iAmount];
        var coordinates = {coordinates: [long, lat]};

        // timedate conversion to ISO date
        var sCraigslistDate = Date.parse($(".timeago").attr("datetime"));
        var ISODate = new Date(sCraigslistDate);

        jsonDoc = {
            "id": id,
            "text": text,
            "created_at": ISODate,
            "postURL": postURL,
            "coordinates": coordinates,
            "entities": {
                "media": [{
                    "media_url": img
                }]
            },
            "data_source": "craigslist"
        };


        var r1 = sentiment(text);
        var dataRecord = merge(jsonDoc, r1);


        insertDocuments(dataRecord);

        iAmount++;

        if (iAmount >= arrayPosts.length)
        {
            clearInterval(timerPost);
        }
    });

}




function insertDocuments(jsonDocument)
{

     dbs.collection("dealerships").update({id:jsonDocument.id}, {$set:jsonDocument},{upsert: true}, function(err, records) {

         if (err)
         {
             console.log(err);
         }

         console.log("Record added as "+records);

     });
}

