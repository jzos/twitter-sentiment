//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


var dbs = {};

MongoClient.connect('mongodb://127.0.0.1:27017/automotive', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    dbs = db;


    dbs.collection('dealerships').find().forEach(function(element){

        if (element.user != undefined && element.user.location)
        {
            if (element.user.location.toLowerCase().indexOf("austin") != -1 || element.user.location.toLowerCase().indexOf("tx") != -1 || element.user.location.toLowerCase().indexOf("texas") != -1 )
            {
                console.log(element.user.location);
            }
            else
            {
                console.log("DELETE : " + element.user.location);
                dbs.collection('dealerships').deleteOne(element);
            }
        }

    })


});


