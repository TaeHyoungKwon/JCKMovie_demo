var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var List = mongoose.model('lists');
var session = require('express-session');

/* GET users listing. */
router.get('/:idx', function(req, res, next) {

    var title = req.params.idx;
    var Reservation = mongoose.model('reservations');
    List.findOne({'movie_title':title},function(error,data){
        
        Reservation.find({},function(error, screen){
        console.log(screen);

        res.render('movie_detail',{
            'datas':data,
            'screens':screen,
            'session':req.sessoin
        });

        })

    })
});

module.exports = router;
