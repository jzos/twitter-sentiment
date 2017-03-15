var request = require('request');
var cheerio = require('cheerio');



request("https://austin.craigslist.org/search/cto", function (error, response, html) {
    //console.log(err || body); // Print out the HTML

    //console.log(html);


    var $ = cheerio.load(html);

    //console.log($('.open-map-view-button span').text());


    $(".rows .result-row").each(function(i,elem){
        console.log($(this).find("a").attr("href"));
    })




});





/*

var $ = cheerio.load("<div class='test'>jaime</div>");

console.log($(".test").text());
*/