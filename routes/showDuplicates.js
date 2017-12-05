var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.mysqlConnection) {
        var getAllLineContentQuery = "select * from LineContent where keyName is not null";
        req.mysqlConnection.query(getAllLineContentQuery, function(err, result, fields) {
           if (err) throw err;
           var massagedResult = {};
           result.forEach(function(row) {
               if (massagedResult.hasOwnProperty(row['value'])) {
                   massagedResult[row['value']].push(row);
               } else {
                   massagedResult[row['value']] = [row];
               }
           });
           var finalResult = [];
           for (var property in massagedResult) {
               if (massagedResult[property].length > 1) {
                   finalResult.push({
                       value : property,
                       info : massagedResult[property]
                   });
               }
           }
           res.render('showduplicates', {result: finalResult});
        });
    }
});

// router.post('/addnew', function(req, res, next) {
//     if (req.mysqlConnection && req.body && req.body.release) {
//
//         var getMaxOrderNumber = 'select max(`order`) as MaxOrderNumber from ReleaseName ';
//         req.mysqlConnection.query(getMaxOrderNumber, function(err, result, fields) {
//             if (err) throw err;
//             var nextOrderNumber = -1;
//             if (result && result[0] && result[0].MaxOrderNumber) {
//                 nextOrderNumber = result[0].MaxOrderNumber + 1;
//             } else {
//                 nextOrderNumber = 1;
//             }
//             var insertNewReleaseName = 'insert into ReleaseName (`name`, `order`) values ?';
//             req.mysqlConnection.query(insertNewReleaseName, [[[req.body.release, nextOrderNumber]]],
//                 function(err, result) {
//                     if (err) throw err;
//                     res.redirect("/addReleases");
//                 });
//         });
//
//     }
//
// });

module.exports = router;
