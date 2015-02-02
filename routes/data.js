var fs = require('fs')
  , http = require('http')
  , path = require('path');

/** serve jade enabled partials */
exports.data = function(req, res) {
    console.log('getting json')
    var file = __dirname + '/../data/'+req.params.name;

    fs.readFile(file, 'utf8', function (err, data) {    
        if (err) {
            console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);
    res.send(data);
    return;
    });
};