
/*

var Twit = require('Twit');
var config = {
    consumer_key: 'zrygVD3bcdopRZLeUsRZzsfQd',
    consumer_secret: 'Xan82IfcwSdDctsidGjkRzqD0CGbQ9MMPZeaROfldDH2EYrABm',
    access_token: '19669840-XOultZI0L1jxOXbsEW7iMHci9immcBdA8yWFFhjWj',
    access_token_secret: '8jaun7URar2BC3JK9F7vXKKPQQsprLc1MqrnkB9VSr9Nv'
};
var T = new Twit(config);
var filterStream;

function filter() {
    filterStream = T.stream('statuses/filter', openStreamOptions);

    filterStream.on('tweet', function (tweet) {
        //cache tweet
        removeLastTweetAndNewTweetForOpenStream(tweet);
        //emit the single tweet object
        log('info', 'information stream received a tweet!');
        eventBus.emit(eventBusKeys.SOCKET_OPENSTREAM_UPDATE, tweet);
    });

    filterStream.on('connect', function () {
        console.log('info', 'information stream connecting...');
    });

    filterStream.on('disconnect', function (message) {
        console.log('error', 'information stream disconnected with message: ' + message);
    });

    filterStream.on('connected', function (response) {
        console.log('info', 'information stream connected with response: ' + response.statusCode );
    });

    filterStream.on('reconnect', function () {
        console.log('warn', 'information stream reconnecting');
    });

    filterStream.on('warning', function (message) {
        console.log('warn', 'information stream warning: ' + message);
    });
}


module.exports =  function () {
    filter();

    console.log("worked");

    return {
        getCachedOpenStreamTweets: getCachedOpenStreamTweets
    }
};

    */




var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'qphEVi498C5OGVaCKnl6QGVGy',
    consumer_secret: '9TKbkrcVSRqefw5fQ9v8wkQtktbHOSjdy2evUzwSxjylxqACF4',
    access_token: '19669840-EE31VHbTfidEHEhqnO2epnsaY6EqSy6XUbMBfRjkg',
    access_token_secret: 'MyzxhVfaZKEwwIGqB6zZdMaE0zIGJsWt6q2e5WWB4QnRX'
});

var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
    console.log(event && event.text);
});

stream.on('error', function(error) {
    console.log(error);
});



