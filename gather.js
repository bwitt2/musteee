var jf = require('jsonfile')
var util = require('util')

var courses = []

var file = 'data/classes.json'
jf.readFile(file, function(err, obj) {
    console.log(util.inspect(obj))
})

var collection = db.collection('question');
collection.find().toArray(function(err, items){
    console.log("query return: %j", items);
});
