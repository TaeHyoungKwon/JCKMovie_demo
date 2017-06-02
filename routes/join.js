var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  //mongoose v4부터 써야한다. 
// var db = require('../mydb/users');
// var autoincrement = require('mongoose-auto-increment');
// autoincrement.initialize(db);

//define scheme
var userSchema = mongoose.Schema({

	user_id : {type:String,  unique:true},
	user_name : {type:String},
	user_pw : String,
    user_mail : String,
    user_point : Number

});

// create model with mongodb collection & scheme
var User = mongoose.model('user',userSchema);

router.get('/', function(req, res, next) {
  res.render('join',{'session' : req.session});
});

router.post('/insert', function(req, res, next) {
	  
	var user_code = req.body.user_code;
	var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_pw = req.body.user_pw;
    var user_mail = req.body.user_mail;
	var user_point = 0;
	
    var user = new User({'user_code':user_code,'user_id':user_id,'user_name':user_name,'user_pw':user_pw,'user_mail':user_mail,'user_point':user_point});

    user.save(function(err,silence){
      if(err){
        console.log(err);
        res.status(500).send('update error');
        return;
      }
      res.status(200).redirect("http://localhost:3000");

      });
});

 
module.exports = router;
