/**
 * Created by jaimemac on 1/23/17.
 */

var graph                   = require('fbgraph');
var csv                     = require("fast-csv");



var checkFileExisits = null;


// Token for Capitol Motors for Facebook App
graph.setAccessToken('EAAbtFgSR8MUBAOCcwxzOp5RNbBupZBykfnNx8Hp9t030OCQM90CpY55F4IJHtGxwbRcjXf7Js0OjO0lwmV5QDy7RmYX5a6xAgbOcxYu0crZC8pkwkZBtZCsVtOyQ6ySw6uLJKsZALyPJ5qsdLdlZBwuJCjpHXsz0yGQTEAkhl5EAZDZD');

/*

// get authorization url
var authUrl = graph.getOauthUrl({
    "client_id":     conf.client_id
    , "redirect_uri":  conf.redirect_uri
});

// shows dialog
res.redirect(authUrl);



// after user click, auth `code` will be set
// we'll send that and get the access token
graph.authorize({
    "client_id":      conf.client_id
    , "redirect_uri":   conf.redirect_uri
    , "client_secret":  conf.client_secret
    , "code":           req.query.code
}, function (err, facebookRes) {
    res.redirect('/loggedIn');
});

 */

var options = {
    timeout:  3000
    , pool:     { maxSockets:  Infinity }
    , headers:  { connection:  "keep-alive" }
};

/*
var graphObject = graph
    .get("david", function(err, res) {
        console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    });
*/

/*

var wallPost = {
    message: "Chevrolet Captiva Sport",
    picture: "http://inventory-dmg.assets-cdk.com/8/5/7/14101861758.jpg",
    link: "http://www.capitolchevy.com/VehicleDetails/certified-2014-Chevrolet-Captiva_Sport_Fleet-FWD_4dr_LTZ-Austin-TX/2950558043"
};
*/

/*

graph.post("/feed", wallPost, function(err, res) {
    // returns the post id
    console.log(res); // { id: xxxxx}
});

*/



var fileTmpDir          = (require('path').dirname(Object.keys(require.cache)[0])).replace("service-scripts","tmp-files/");
var fs = require('fs');
var request = require('request');
request('http://www.capcomsoftware.com/downloads/csv/facebook/facebook_Capitol_Chevrolet.csv').pipe(fs.createWriteStream(fileTmpDir + 'facebook_Capitol_Chevrolet.csv'))


var checkFileExisits = setInterval(checkImagesSaved, 500);



function checkImagesSaved() {

    if (fs.existsSync(fileTmpDir + 'facebook_Capitol_Chevrolet.csv'))
    {
        clearInterval(checkFileExisits);

        readCSVFile();

    }

}


function readCSVFile()
{
    var iFileCount = 0;

    csv
        .fromPath(fileTmpDir + 'facebook_Capitol_Chevrolet.csv')
        .on("data", function(data){

            if (iFileCount > 0 && iFileCount < 5)
            {
                postToFacebook(data[3], data[5], data[4]);

                //console.log("name : " + data[3] + "    Link: " + data[5] + "     Image: " + data[4]);

            }

            iFileCount++;

        })
        .on("end", function(){

            //saveLog("csv file loaded","none");
        })
        /*.on('error', function(error) {
            console.log("Catch an invalid csv file!!!");
            //console.log(this);
            //return res.fail('The csv file is invalid!');
        });*/
}



function postToFacebook(sContent, sLink, sImgURL)
{


    var wallPost = {
        message: sContent,
        picture: sImgURL,
        link: sLink
    };

    graph.post("/feed", wallPost, function(err, res) {
        // returns the post id
        console.log(res); // { id: xxxxx}
    });


}



//console.log(fs.existsSync(fileTmpDir + 'facebook_Capitol_Chevrolet.csv'));




/*  Possibly use this to solve for invalid csv's

 var csv = require("fast-csv");
 var byline = require('byline');

 var stream = byline(fs.createReadStream("mydata.csv", { encoding: 'utf8' }));
 stream.on('data', function(line) {
 line = line.replace(/\\\"/g, '""');

 csv.fromString(line)
 .on("data", function (data) {
 // data
 })
 .on("end", function () {

 });
 });
 */