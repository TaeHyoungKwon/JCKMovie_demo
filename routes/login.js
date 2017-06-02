var express = require('express');
var router = express.Router();

var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('user');

router.post('/', function(req, res, next){
  var id = req.body.user_id;
  var pwd = req.body.user_pw;
  User.findOne({'user_id':id, 'user_pw':pwd}, function(err, user){
  	if(err) {
  		console.log(err);
  		res.redirect('/login');
  		//return res.status(500).send();
  	}
  	if(!user) {								//user 없을때

      //res.send('<script type="text/javascript">alert("오류발생");</script>');
      res.redirect('/login');
  		//res.send(req.body.user_id);
  		//return res.status(404).send();
  	}
    else
    {
  		req.session.user = user;
  		req.session.save(function(){
  		res.status(200).redirect("/");
      console.log(req.session);
	   });
    }
  })
});
	//  res.send(req.body.user_id);

router.get('/test', function(req,res){
	if(!req.session.user){
		res.send('Who are you? <a href="/login">login</a>');
	}
	res.send(req.session.user.user_name);
});
router.get('/', function(req, res){
	res.render('login');
});

router.get('/logout', function(req, res){
	delete req.session.user;
	res.redirect('/');
});
module.exports = router;