var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var readLine = require('readline');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (files && files.propertyFile) {
            var path = files.propertyFile.path;
            if (path) {
                var readFileLineByLine = readLine.createInterface({
                    input: fs.createReadStream(path),
                    console: false
                });
                readFileLineByLine.on('line', function(line) {
                    var parts = line.split('=');
                    var key = parts[0];
                    var value = parts[1];

                });
                fs.unlink(path, function(err) {
                    if (err) throw err;
                });
            }
        }
    });

    res.redirect('/');
});



module.exports = router;
