/**
 * Created by jaimemac on 9/1/17.
 */

//https://github.com/pradel/node-instagram

const Instagram = require('node-instagram').default;

const instagram = new Instagram({
    clientId: 'ea0704c7952d4f368b8f30177bd10e10',
    clientSecret: 'd7cdf64c4bcb4e8f86922c3768a6d210',
    accessToken: '10442443.ea0704c.744e74e36de44932b97ed3ffcb8e0e11',
});


// Old-school:
//var a2 = a.map(function(s){ return s.length });

// ECMAscript 6 using arrow functions
//var a3 = a.map( s => s.length );

/*

instagram.get('users/self', function(err, data){
    if (err) {
        // an error occured
        console.log(err);
    } else {
        console.log(data);
}
});

*/




instagram.get('users/self/follows', function(err, data){
    if (err) {
        // an error occured
        console.log(err);
    } else {
        console.log(data);
    }
});