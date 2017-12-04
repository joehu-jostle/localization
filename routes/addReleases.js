var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('releases');
});

router.post('/addnew', function(req, res, next) {
    if (req.mysqlConnection && req.body && req.body.release) {

        var getMaxOrderNumber = 'select max(`order`) as MaxOrderNumber from ReleaseName ';
        req.mysqlConnection.query(getMaxOrderNumber, function(err, result, fields) {
            if (err) throw err;
            var nextOrderNumber = -1;
            if (result && result[0] && result[0].MaxOrderNumber) {
                nextOrderNumber = result[0].MaxOrderNumber + 1;
            } else {
                nextOrderNumber = 1;
            }
            var insertNewReleaseName = 'insert into ReleaseName (`name`, `order`) values ?';
            req.mysqlConnection.query(insertNewReleaseName, [[[req.body.release, nextOrderNumber]]],
                function(err, result) {
                    if (err) throw err;
                    res.redirect("/addReleases");
            });
        });

    }

});

module.exports = router;
