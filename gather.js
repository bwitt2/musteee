var jf = require('jsonfile')
var util = require('util')
var MongoClient = require('mongodb').MongoClient;

var courses = []

/*var file = 'data/classes.json'
jf.readFile(file, function(err, obj) {
    console.log(util.inspect(obj))
})*/

MongoClient.connect("mongodb://nodejitsu:2bd5845aaec512c3dd834f4ffe9e0105@troup.mongohq.com:10058/nodejitsudb3893233994", function(err, db) {//connect to db
    if(err) {
        return console.dir(err);
    }else{
        console.log('Connected to DB');

        var collection = db.collection('courses');

        collection.find().toArray(function(err, items){
            console.log("query return: %j", items);

            console.log(items)

            db.close()

        });
    }
});

