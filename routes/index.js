var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var readLine = require('readline');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.mysqlConnection) {
        var getReleaseNames = 'select * from ReleaseName order by `order`';
        req.mysqlConnection.query(getReleaseNames, function(err, result, fiels) {
            if (result) {
                res.render('index', {
                    title: 'Localization',
                    releaseNames: result
                });
            }
        })
    } else {
        res.render('index', {title: 'Localization'});
    }

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
                var lineNumberCounter = 1;
                var lineContentValues = [];

                readFileLineByLine.on('line', function(line) {
                    line = line.trim();
                    var contentType = "comment";
                    if (!line.startsWith("#") && !line.startsWith("!") && line.indexOf("=") > 0) {
                        contentType = "localizedString";
                    }
                    var keyName = null;
                    var value = null;
                    var version = 1;
                    if (contentType == "localizedString") {
                        var parts = line.split('=');
                        keyName = parts[0];
                        value = parts[1];
                    }
                    lineContentValues.push([fields.fileOrigin, fields.language, line, lineNumberCounter, fields.releaseName,
                        fields.vcRevisionNumber, contentType, keyName, value, version]);
                    lineNumberCounter++;
                }).on('close', function() {
                    var insertIntoLineContentQuery = "insert into LineContent (fileOrigin, lang, `content`, lineNumber, "
                        + "releaseName, vcRevisionNumber, contentType, keyName, `value`, version) values ? ";
                    req.mysqlConnection.query(insertIntoLineContentQuery, [lineContentValues], function(err, result) {
                        if (err) throw err;
                        fs.unlink(path, function(err) {
                            if (err) throw err;
                            res.redirect('/');
                        });
                    });
                });
            }
        }
    });
});



module.exports = router;
