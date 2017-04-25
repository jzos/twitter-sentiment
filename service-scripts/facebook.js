/**
 * Created by jaimemac on 1/23/17.
 */

var graph = require('fbgraph');

graph.setAccessToken('EAAYqNehaZAeIBAKvmTmIEp0Fe5JlwZBJwk6ZBE6NZAnlZB9Lc9tGBVGXAN4Pn0v1FfYpAZANJfwJlQ2NgTXSEZAksBN6VT2T0Tf5WZCndmVfRJc89gPgiCfwpjpbUzEGKQUWEiIvBLEYSoAvhlm8iYu96yjtoDUAh4fcWgRqzbpIKwZDZD');

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


var graphObject = graph
    .get("david", function(err, res) {
        console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    });