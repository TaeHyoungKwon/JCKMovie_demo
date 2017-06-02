var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({

    movie_title : String,
    movie_playdate : Date,
    reserved_seat : Array,
    now_reserved_seat:String,
    reserved_count : Number
});

// create model with mongodb collection & scheme
var Reservation = mongoose.model('reservations',reservationSchema);

//GET 메쏘드 일때,
router.get('/:movie_title/:movie_playdate', function(req, res, next) {

    var movie_title = req.params.movie_title;
    var movie_playdate = req.params.movie_playdate;
    Reservation.findOne({'movie_title':movie_title,'movie_playdate':movie_playdate},function(err,reserve){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
        console.log(reserve.reserved_seat);

        res.render('reservation',{
        'movie_title':movie_title,
        'movie_playdate':movie_playdate,
        'reserved':reserve.reserved_seat
        });

    });
});


//POST 메쏘드 일때,
router.post('/:movie_title/:movie_playdate',function(req, res, next) {

    var movie_title = req.body.movie_title;
    var movie_playdate = req.body.movie_playdate;
    var req_seats = req.body.reserved_seat;
    
    Reservation.findOne({'movie_title':movie_title,'movie_playdate':movie_playdate},function(err,reserve){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }

    reserve.reserved_seat.push(req_seats);
    reserve.now_reserved_seat = req_seats;

    reserve.save(function(err,silence){
             if(err){
                console.log(err);
                res.status(500).send('update error');
                return;
             }
             res.status(200).redirect("http://localhost:3000/payment/" + movie_title + "/" + movie_playdate + "/" + req_seats);
             
         });
    });
});
module.exports = router;
