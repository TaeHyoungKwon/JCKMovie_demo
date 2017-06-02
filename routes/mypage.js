var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('user');

/* GET home page. */
router.get('/', function(req, res, next) {


	///var Payment = mongoose.model('payment');
	if(req.session.user)
	{
		var Payment = mongoose.model('payment');
    Payment.find({'user' : req.session.user.user_name},function(err,payment){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }

		    res.render('mypage', { 
  			'session' : req.session,
        'payment' : payment
   		   });
	   })
  }
	else
	{
		res.redirect('/login');
	}
	
});

router.post('/', function(req, res, next){


	var email = req.body.user_mail;
	var pw = req.body.user_pw;

    User.findOne({'user_id':req.session.user.user_id},function(err,user){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
    user.user_mail = email;
    user.user_pw = pw;

    user.save(function(err,silence){
          if(err){
             console.log(err);
             res.status(500).send('update error');
             return;
          }
          res.redirect("http://localhost:3000");
      });
	});
});


module.exports = router;