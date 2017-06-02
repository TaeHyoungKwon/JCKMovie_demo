var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


// create model with mongodb collection & scheme

router.get('/time_table', function(req, res, next){
  var Reservation = mongoose.model('reservations');
  Reservation.find({}, function(err, docs){
    if(err) console.log('err');
    res.render('time_table', {"time_table_list" : docs
  });
  
  });
  // res.render('time_table', { title : 'time table'});
});


router.get('/insert', function(req, res, next) {
  res.render('time_table_insert', { title: 'admin_movie' });
});

router.post('/insert',function(req, res, next) {//0526 수정 부분 - 이미지 업로드.
    
    var movie_title = req.body.movie_title
    var date = new Date("2017-06-03T22:20:00Z");
   
    var screen = new Screen({'screen_num':screen_num ,
    'date':date,
    'movie_title':movie_title});

    screen.save(function(err,silence){
             if(err){
                console.log(err);
                res.status(500).send('insert error');
                return;
             }
             res.status(200).redirect("http://localhost:3000/admin_movie");
         
         console.log(screen);    
         });
});

module.exports = router;
