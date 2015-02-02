var jf = require('jsonfile')
var util = require('util')

var courses = []

var file = 'data/classes.json'
jf.readFile(file, function(err, obj) {
    console.log(util.inspect(obj))
})
