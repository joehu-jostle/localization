var express = require('express');
var router = express.Router();
var translate = require('google-translate-api');

router.get('/', function(req, res, next) {
    res.render("translate");
});

router.post('/submit', function (req, res, next) {
    var input = req.body.en;
    translate(input, {to: req.body.toLanguage}).then(function(res2) {
        res.render("translate", {
            translated: res2.text
        });
    });
});

module.exports = router;