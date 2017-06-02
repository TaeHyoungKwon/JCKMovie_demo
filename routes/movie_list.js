var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var List = mongoose.model('lists');

var List_score = function(){
    return List.find().sort({'movie_plydate':1});   
}

router.get('/', function(req, res, next) {    
    //console.log(List_score);
    List.find({},function(error,all){
        List.find({},function(error,top4){
            List.find({},function(error,score){

            res.render('movie_list',{
            
                'all':all,
                'top4':top4,
                'score':score,
            	'session' : req.session
                });
            }).sort({'movie_score':-1})
        }).sort({'movie_audience':-1})
    })
});

router.post('/search', function(req, res, next){

	var title = req.body.movie_title;
	//console.log(title);
    List.findOne({'movie_title' : title },function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
    	res.render('movie_search', {
    		'datas' : data
    	});
	console.log(data.movie_title);
	});


});

module.exports = router;
