var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('events',{
  	'session' :req.session
  });
});

module.exports = router;
