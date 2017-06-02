var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var session = require('express-session');


var paymentSchema = mongoose.Schema({

    user: String,
    movie_title : String,
    movie_playdate : Date,
    reserved_seat : String,
    reservation_count : Number
});

// create model with mongodb collection & scheme




var Payment = mongoose.model('payment',paymentSchema);

router.get('/:movie_title/:movie_playdate/:reserved_seat', function(req, res, next) {
    var Reservation = mongoose.model('reservations');
    var movie_title = req.params.movie_title;
    var movie_playdate = req.params.movie_playdate;
    var reserved_seat = req.params.reserved_seat;

    Reservation.findOne({'movie_title':movie_title, 
                        'movie_playdate':movie_playdate, 
                        'reserved_seat':reserved_seat},function(error,data){
        console.log("kwon");
        console.log(data);
        res.render('payment',{'data':data,
                        'session': req.session})

    });
});

//POST 메쏘드 일때,
router.post('/', function(req, res, next) {//0526 수정 부분 - 이미지 업로드.

   

    console.log(req.body);
    var movie_title = req.body.movie_title;
    var movie_playdate = req.body.movie_playdate;
    var seat_number = req.body.seat_number;
    var reservation_count = req.body.reservation_count;
    var user = req.session.user.user_name;
    
    var payment = new Payment({
    
    'user':user,
    'movie_title':movie_title ,
    'movie_playdate':movie_playdate,
    'reserved_seat':seat_number,
    'reservation_count':reservation_count
});

    payment.save(function(err,silence){
             if(err){
                console.log(err);
                res.status(500).send('insert error');
                return;
             }
             res.status(200).redirect("http://localhost:3000/");
             
         });
});



module.exports = router;