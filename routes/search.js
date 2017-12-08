var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render("search", {
      result : [{}, {}]
   });
});

router.post("/searchString", function(req, res, next) {
   if (req.mysqlConnection) {
      var queryString = "SELECT * FROM LineContent where ";
      var searchString = req.body.searchString;
      var whereClauseParameters = [];
      var whereClause;
      if (searchString) {
         var searchIn = req.body.searchIn;
         if (searchIn) {
            if (searchIn == 'keyAndValue') {
               whereClause = " keyName = ? or `value` = ? ";
               whereClauseParameters.push(searchString);
               whereClauseParameters.push(searchString);
            } else if (searchIn == 'key' || searchIn == 'value') {
               whereClauseParameters.push(searchString);
               if (searchIn == 'key') {
                   whereClause = " keyName = ? ";
               } else {
                  whereClause = " `value` = ? ";
               }
            }
         }
      }

      var language = req.body.language;
      if (language && language != 'all') {
         if (whereClause) {
            whereClause += " and ";
         } else {
            whereClause = "";
         }

         whereClause += " lang in ? ";
         whereClauseParameters.push(language);
      }

      queryString += whereClause;

      req.mysqlConnection.query(queryString, whereClauseParameters, function(err, result, fields) {
         if (err) throw err;
         res.render("search", {
            result : result
         });
      });
   }
});

module.exports = router;