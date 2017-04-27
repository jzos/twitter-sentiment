






var Twit = require('twit');


/*
*
* Account : AustinAutodeals
* App Name : Austin TX Automotive
*
 */

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


