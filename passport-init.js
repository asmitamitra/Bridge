var LocalStrategy  = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
//var users = {};
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Investor = mongoose.model('Investor');
//var users = {};
module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    //tell passport which id to be use
    console.log('serializing user:', user._id);
    return done(null, user._id);
  });

  passport.serializeUser(function(investor, done) {
    //tell passport which id to be use
    console.log('serializing investor:', investor._id);
    return done(null, investor._id);
  });
  passport.deserializeUser(function(id, done){
    //return user object back
    User.findById(id, function(err, user){
            if(err) {
                return done(err, false);
            }
            if(!user){
                return done('user not found', false);
            }
            //we found the user object provide it back to passport
            return  done(user, true);
        })
  });
  passport.deserializeUser(function(id, done){
    //return user object back
    Investor.findById(id, function(err, investor){
            if(err) {
                return done(err, false);
            }
            if(!investor){
                return done('user not found', false);
            }
            //we found the user object provide it back to passport
            return  done(investor, true);
        })
  });

  passport.use('login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){
        User.findOne({'username' : username },
          function(err, user) {
            if(err)
              return done(err, false);
            if(!user) {
              console.log('User not found with the email + ',username);
              return done(null, false);
            }
            if(!isValidPassword) {
              console.log('Invalid password');
              return done(null, false);
            }
            else{
            //User and password both matches return user
            return done(null, user);}
          }
      );
    }
  ));

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){
      User.findOne({'company' : req.body.company},function(err, user){
      if(err) {
        console.log('error in signup');
        return done(err, false);
      }
      if(user) {
        console.log('Company already exists');
        return done('Company already exists', false);
      }
       else
        {
        console.log('create new user');
        var user = new User();
        user.username = username;
        user.email = req.body.email;
        user.company = req.body.company;
        user.loc = req.body.loc;
        user.industry = req.body.industry;
        user.pitch_line = req.body.pitch_line;
        user.password = createHash(password);

        user.save(function(err, user){
          if(err) {
            return done(err, false)
            throw err;
          }
            else {
            console.log('Signed Up successfully with name' + user.username);
            return done(null, user);
          }
        });
      }
    });
    }
  ));

  passport.use('investor_login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){
        Investor.findOne({'username' : username },
          function(err, investor) {
            if(err)
              return done(err, false);
            if(!investor) {
              console.log('Investor not found with the email + ',username);
              return done(null, false);
            }
            if(!isValidPassword) {
              console.log('Invalid password');
              return done(null, false);
            }
            else{
            //User and password both matches return user
            return done(null, user);}
          }
      );
    }
  ));

  passport.use('investor_signup', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){
      Investor.findOne({'username' : username},function(err, investor){
      if(err) {
        console.log('error in signup');
        return done(err, false);
      }
      if(investor) {
        console.log('Username is already taken');
        return done('Username is already taken', false);
      }
       else
        {
        console.log('create new investor');
        var investor = new Investor();
        investor.username = username;
        investor.email = req.body.email;
        investor.company = req.body.company;
        investor.industry = req.body.industry;
        investor.loc = req.body.loc;
        investor.password = createHash(password);
        investor.desc = req.body.desc;
        investor.website_url = req.body.web;
        investor.employees = req.body.emp;
        investor.save(function(err, investor){
          if(err) {
            return done(err, false)
            throw err;
          }
            else {
            console.log('Signed Up successfully with name' + investor.username);
            return done(null, investor);
          }
        });
      }
    });
    }
  ));

  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  };

  //Generates hash Passwords using bcrypt
  var createHash = function(password) {
    bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
