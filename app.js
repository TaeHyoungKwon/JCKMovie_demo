var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

//이미지업로들를 위한 multer 설치
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

//URL 라우팅 부분
//var index = require('./routes/index');//메인화면
var admin_movie = require('./routes/admin_movie');//admin_movie
var movie_list = require('./routes/movie_list');//movie_list
var movie_detail = require('./routes/movie_detail');
var app = express();

var join = require('./routes/join');
var login = require('./routes/login');

var screen = require('./routes/screen');
var payment = require('./routes/payment');
var payment_confirm = require('./routes/payment_confirm');
var reservation = require('./routes/reservation');

var locations = require('./routes/locations');
var about_us = require('./routes/about_us');
var asks = require('./routes/asks');
var events = require('./routes/events');

var mypage = require('./routes/mypage');

app.get('/upload',function(req,res){
  res.render('upload');
});
app.post('/upload',upload.single('userfile'),function(req,res){
  res.send('Uploaded : '+req.file);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'MySecret',
    resave: false,             //밑에 두줄 오류 때문에 썼는데 뭔지 모르겠음 
    saveUninitialized: true    //https://github.com/expressjs/session/issues/56
}));


app.use('/join', join);
app.use('/login', login);

//app.use('/', index);
app.use('/admin_movie', admin_movie);

app.use('/movie_list', movie_list);
app.use('/movie_detail', movie_detail);
app.use('/reservation', reservation);
app.use('/screen', screen);
app.use('/mypage', mypage);
app.use('/payment', payment);
app.use('/payment_confirm', payment_confirm);

app.use('/locations',locations);
app.use('/about_us',about_us);
app.use('/asks',asks);
app.use('/events',events)

//보류
app.use('/image',express.static('uploads'));//stataic image 업로드 로드 관련

//mongoose configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie');

var List = mongoose.model('lists');

/* GET users listing. */
app.get('/', function(req, res, next) {
    //console.log(List_score);
    List.find({},function(error,boxoffice){
        List.find({},function(error,new_movie){
            List.find({'movie_playdate':0},function(error,nogaebong){
              List.find({})
             res.render('main',{
            
            'boxoffice':boxoffice,
            'new_movie':new_movie,
            'nogaebong':nogaebong,
            'session' : req.session
            });
          })
        
        }).sort({'movie_playdate':-1})

    }).sort({'movie_audience':-1})
    console.log(session);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;