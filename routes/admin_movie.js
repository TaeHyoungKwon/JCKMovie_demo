var express = require('express');
var router = express.Router();
var session = require('express-session');

var mongoose = require('mongoose');
//0526 수정 부분 - 이미지 업로드 시작
var multer = require('multer');


var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({storage:_storage})
//0526 수정 부분 - 이미지 업로드 끝

//define scheme
var movieSchema = new mongoose.Schema({
    movie_code : Number,
    movie_title : String,
    movie_genre : String,
    movie_grade : String,
    movie_playdate : Date,
    movie_audience : Number,
    movie_score : Number,
    movie_runningtime : Number,
    movie_actor : String,
    movie_director : String,
    movie_image : String,
    movie_summary : String
});

// create model with mongodb collection & scheme
var List = mongoose.model('lists',movieSchema);



router.get('/', function(req, res, next) {
  res.render('admin_movie', { title: 'admin_movie' });
});

//GET 메쏘드 일때,
router.get('/insert', function(req, res, next) {
  res.render('admin_movie_insert', { title: 'admin_movie' });
});


//POST 메쏘드 일때,
router.post('/insert',upload.single('userfile'), function(req, res, next) {//0526 수정 부분 - 이미지 업로드.
	  
    var movie_code = 0; //변경 필요
    var movie_title = req.body.movie_title;
	var movie_genre = req.body.movie_genre;
    var movie_grade = req.body.movie_grade;
    var movie_playdate = req.body.movie_playdate;
    var movie_audience = 0;
    var movie_score = 0;
    var movie_runningtime = req.body.movie_runningtime;
    var movie_actor = req.body.movie_actor;
    var movie_director = req.body.movie_director;
    var movie_image =req.file.filename; //0526 수정 부분 - 이미지 업로드.
    var movie_summary = req.body.movie_summary;
    
    var list = new List({'movie_code':movie_code ,
    'movie_title':movie_title,
    'movie_genre':movie_genre,
    'movie_grade':movie_grade,
    'movie_playdate':movie_playdate,
    'movie_audience':movie_audience,
    'movie_score':movie_score,
    'movie_runningtime':movie_runningtime,
    'movie_actor':movie_actor, 
    'movie_director':movie_director,
    'movie_image':movie_image, 
    'movie_summary' : movie_summary});

    list.save(function(err,silence){
             if(err){
                console.log(err);
                res.status(500).send('insert error');
                return;
             }
             res.status(200).redirect("http://localhost:3000/admin_movie/");
             
         });
});

router.get('/update', function(req, res, next) {
  res.render('admin_movie_update', { 
        title: 'admin_movie',
        'session' : req.session });
});

router.post('/update',upload.single('userfile'), function(req, res, next) {

    var movie_title = req.body.movie_title;
    var movie_genre = req.body.movie_genre;
    var movie_grade = req.body.movie_grade;
    var movie_playdate = req.body.movie_playdate;
    var movie_runningtime = req.body.movie_runningtime;
    var movie_actor = req.body.movie_actor;
    var movie_director = req.body.movie_director;

    List.findOne({'movie_title':movie_title},function(err,list){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }

    list.movie_genre = movie_genre;
    list.movie_grade = movie_grade;
    list.movie_playdate = movie_playdate;
    list.movie_runningtime = movie_runningtime;
    list.movie_actor = movie_actor;
    list.movie_director = movie_director;

    list.save(function(err,silence){
                  if(err){
                     console.log(err);
                     res.status(500).send('update error');
                     return;
                  }
                  res.status(200).send("Updated");
              });

      });

});


router.get('/delete', function(req, res, next) {
          var movie_title = req.body.movie_title;

      //console.log(movie_title);
      List.find({},function(err,docs){
           if(err) console.log('err');
           res.render('admin_movie_delete', {"admin_movie_list" : docs
       });
           //res.send(docs);
      });

});

router.post('/delete', function(req, res, next) {

      var movie_title = req.body.movie_title;
      var list = List.find({'movie_title':movie_title});

      //console.log(list);
      list.remove(function(err){

             if(err){
                console.log(err);
                res.status(500).send('delete error');

                return;
             }
             res.status(200).redirect("http://localhost:3000/admin_movie/delete");
             //res.status(200).send("Removed");
         });

});

router.get('/userlist', function(req, res, next){

    var User = mongoose.model('user');
      //console.log(movie_title);  
      User.find({},function(err,docs){
           if(err) console.log('err');
           res.render('admin_movie_userlist', {"admin_user_list" : docs
       });
           //res.send(docs);
      });
});

router.get('/sales', function(req, res, next){

    var Payment = mongoose.model('payment');
    var i=0;
     Payment.find({},function(err,docs){
           if(err) console.log('err');
           res.render('sales', {"sales" : docs,
            "j" : i
       });
             });
});
module.exports = router;
