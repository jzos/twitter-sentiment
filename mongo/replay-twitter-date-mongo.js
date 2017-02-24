//db.jackinthebox.update({id : ""}, $set : {id:"hello"})
//db.jackinthebox.update({id : {$exists : true}},{$set : {id:"jaime"}}, {multi: true})



db.jackinthebox.find().forEach(function(element){
  //element.id = new Date(Date.parse((element.id).replace(/( \+)/, ' UTC$1')));
  
  //element.created_at = new Date(Date.parse(element.created_at.split(/( \+)/,"").join(' UTC$1')));
  element.created_at = new Date(Date.parse(element.created_at));
  db.jackinthebox.save(element);
})


/*
db.jackinthebox.mapReduce(
    // map
    function() {
        emit(
            // "Thu Jul 17 03:21:42 +0000 2014"
            new Date(Date.parse(this.created_at.replace(/(\+\S+) (.*)/, '$2 $1'))).toLocaleDateString(),
            1
        );
    },

    // reduce
    function(key, values) {
        return Array.sum(values)
    },

    {
        query: {},
        out: "rawTweetsCount"
    }
)
*/



/*

var operations = [];

db.jackinthebox.find().forEach(function(doc) {
    //print("Before: "+doc.source.url);
    var operation = {
            update: { 
                '$set': { 'id': doc.source.id.replace('Mon', 'Tues') }
            }
    };
    operations.push(operation);
})
operations.push({ 
    ordered: true, 
    writeConcern: { w: "majority", wtimeout: 5000 } 
})

db.jackinthebox.bulkWrite(operations);

*/