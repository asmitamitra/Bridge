var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Investor = mongoose.model('Investor');


module.exports = function(passport) {

  router.post('/login', function(req, res, next) {
    passport.authenticate('login' , function(err, user, info) {
      if (user === false) {
        // handle login error ...
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
      } else {
        // handle successful login ...
        res.send({state: 'success', user: user || null});
      }
    })(req, res, next);
  }
);

router.post('/signup', function(req, res, next) {
  passport.authenticate('signup' , function(err, user, info) {
    if (user === false) {
      // handle login error ...
    } else {
      // handle successful login ...
      res.send({state: 'success', user: user || null});
    }
  })(req, res, next);

});


router.post('/investor_signup', function(req, res, next) {
  passport.authenticate('investor_signup' , function(err, investor, info) {
    if (investor === false) {
      // handle login error ...
    } else {
      // handle successful login ...
      res.send({state: 'success', investor: investor || null});
    }
  })(req, res, next);

});

router.post('/investor_login', function(req, res, next) {
  passport.authenticate('investor_signin' , function(err, user, info) {
    if (user === false) {
      // handle login error ...
    } else {
      // handle successful login ...
      res.send({state: 'success', user: user || null});
    }
  })(req, res, next);

});
  router.get('/signout', function(req, res) {
      req.signout();
      res.redirect('/');
  });

  router.get('/auth/browse', function(req, res){
    var resp = User.find({}, function(err, doc){});
    res.send(resp);
  })

  return router;
}
