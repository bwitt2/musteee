var $ = require('cheerio')
var request = require('request')
var jf = require('jsonfile')
var MongoClient = require('mongodb').MongoClient;

var firstPage = 883
var page = firstPage
var id = 0
var maxPage = 969
var activeRequests = 0
var courses = []
var database = null

function gotHTML(err, resp, html) {
    if (err) return console.error(err)
    var parsedHTML = $.load(html)

    var isDone = false
    var num = 1

    while(!isDone){
        // query for all elements with class 'foo' and loop over them
        var tagLine = '#_ctl0__ctl0_pageContent__ctl'+num+'__ctl2_'

        var prefix = parsedHTML(tagLine+'cnCoursePrefix').map(function(i, course) {
            course = $(course)
            return course.text()
        }).get()

        var number = parsedHTML(tagLine+'cnNumber').map(function(i, course) {
            course = $(course)
            return course.text()
        }).get()

        var name = parsedHTML(tagLine+'cnCourseName').map(function(i, course) {
            course = $(course)
            return course.text()
        }).get()

        if(number == ""){
            isDone = true
            console.log('Requests remaining: '+activeRequests)
        }
        else{
            var course = {
                "id":id,
                "code":number,
                "name":name,
                "faculty":prefix
            }

            var collection = database.collection('courses');
            collection.insert(course, function(err, records){
                //console.log("Record added as "+JSON.stringify(records[0]));
            });

            courses.push(course)
            num += 1
            id += 1
        }
    }

    activeRequests -= 1

    if(activeRequests == 0 && page > maxPage){
        //console.log(courses)
        console.log('Finished with '+courses.length+' courses')
        database.close()

    }

}

console.log("Attempting to connect to DB...");

MongoClient.connect("mongodb://nodejitsu:2bd5845aaec512c3dd834f4ffe9e0105@troup.mongohq.com:10058/nodejitsudb3893233994", function(err, db) {//connect to db
    if(err) {
        return console.dir(err);
    }else{
        console.log('Connected to DB');
        database = db
        db.createCollection('courses', function(err, collection) {});//if it doesnt already exist, create a collection called 'courses'

        console.log('Pulling Data from UWO...')

        while(page<=maxPage){
            var domain = 'http://westerncalendar.uwo.ca/2015/pg'+page+'.html'
            activeRequests += 1
            page += 1
            request(domain, gotHTML)
        }
    }
});
