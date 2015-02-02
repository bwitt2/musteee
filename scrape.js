var $ = require('cheerio')
var request = require('request')
var jf = require('jsonfile')
var page = 883
var id = 0
var maxPage = 969
var activeRequests = 0
var courses = []

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
        }
        else{
            var course = {
                "id":id,
                "code":number,
                "name":name,
                "faculty":prefix
            }
            courses.push(course)
            num += 1
            id += 1
        }
    }

    activeRequests -= 1

    if(activeRequests == 0 && page > maxPage){
        console.log(courses)
        console.log('Finished with '+courses.length+' courses')

        jf.writeFile("data/classes.json", courses, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

    }

}

console.log('Pulling Data...')

while(page<=maxPage){
    var domain = 'http://westerncalendar.uwo.ca/2015/pg'+page+'.html'
    activeRequests += 1
    page += 1
    request(domain, gotHTML)
}
