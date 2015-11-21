var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Investor = mongoose.model('Investor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
router.get('/browse', function(req, res, next){
  User.find(function(err, docs){
    return res.send(docs);
    console.log(docs);

  })
})
router.get('/browse_delhi,', function(req, res, next){
  User.find({loc: 'delhi'}, function(err, docs){
    res.send('Startups in Delhi    '+ docs);
    console.log(docs);
  })
})
*/
module.exports = router;
