/**
 * Created by jaimemac on 1/23/17.
 */

var graph = require('fbgraph');

// Token for Symamp App
//graph.setAccessToken('EAAYqNehaZAeIBAKvmTmIEp0Fe5JlwZBJwk6ZBE6NZAnlZB9Lc9tGBVGXAN4Pn0v1FfYpAZANJfwJlQ2NgTXSEZAksBN6VT2T0Tf5WZCndmVfRJc89gPgiCfwpjpbUzEGKQUWEiIvBLEYSoAvhlm8iYu96yjtoDUAh4fcWgRqzbpIKwZDZD');

// Token for Capitol Motors
//graph.setAccessToken('EAAbtFgSR8MUBAG48q2oEdYsqTYkmBxAQHLA5J10ar2LWYjMuOU1awU3ZAceHS8YxphNLMskpzUazUPMa8TQzZAAKCyfjq6vjhnzAJVEUUyZBvoa8jV04fXZAXvaVomKZB0kvwjiPdkxyhM5LXpuJc');
graph.setAccessToken('EAACEdEose0cBABNjpRMwUgLkOdqu2R4awh77W68WPRNCUg8tejfIgGqW9OeeJ64S333dAQFl8VZBMBZB51C6S7eBjShjMujvAwzbCcHOjTgkTOCGW0e9TAH3NO7StNLVgAgZBAoVhOXY21pzq8x5q6uIABdfoMrpC3PIEOed89IEXpgpQi1ysji0vvx8jwZD');

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

var wallPost = {
    message: "Chevrolet Tahoe",
    picture: "http://inventory-dmg.assets-cdk.com/3/0/7/14336113703.jpg",
    link: "http://www.capitolchevy.com/VehicleDetails/certified-2013-Chevrolet-Tahoe-2WD_1500_LT-Austin-TX/2977415593"
};


graph.post("/feed", wallPost, function(err, res) {
    // returns the post id
    console.log(res); // { id: xxxxx}
});