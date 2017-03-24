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



request("https://austin.craigslist.org/search/cto", function (error, response, html) {

    if (error)
    {
        console.log(error);
    }

    var $ = cheerio.load(html);

    $(".rows .result-row").each(function(i,elem){

        getPosts($(this).find("a").attr("href"));


    })

});




function getPosts(sURL)
{

    request("https://austin.craigslist.org" + sURL, function (error, response, html) {

        var $ = cheerio.load(html);

        var jsonDoc     = {};

        var id          = $(".postinginfos .postinginfo").first().text().replace("post id: ","");
        var text        = $("#postingbody").text().replace("show contact info","").replace("QR Code Link to This Post","").replace(/(\r\n|\n|\r)/gm,"").trim();
        var long        = $("#map").attr("data-longitude");
        var lat         = $("#map").attr("data-latitude");
        var img         = $(".gallery img").first().attr("src");
        var date        = $(".timeago").attr("datetime") + "Z";
        var source      = "craigslist";
        var postURL     = "https://austin.craigslist.org" + sURL;
        var coordinates = { coordinates : [long, lat]};



        jsonDoc = {
            "id" : id,
            "text" : text,
            "created_at" : date,
            "postURL" : postURL,
            "coordinates" : coordinates,
            "entities" : {
                "media" : [{
                    "media_url" : img
                }]
            },
            "source" : "craigslist"
        };


        var r1              = sentiment(text);
        var dataRecord      = merge(jsonDoc,r1);



        insertDocuments(dataRecord);
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

