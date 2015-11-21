/*var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/images/icons"));
app.use(express.static(__dirname + "/public/images/bground"));
app.use(express.static(__dirname + "/public/images/city"));
app.use(express.static(__dirname + "/public/stylesheets"));

app.listen(8080);
console.log("Server running on port 8080");
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');


mongoose.connect('mongodb://localhost/bridgeit');
var db = mongoose.connection;


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/images/icons"));
app.use(express.static(__dirname + "/public/images/bground"));
app.use(express.static(__dirname + "/public/images/city"));
app.use(express.static(__dirname + "/public/stylesheets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(validator([]));

var router = express.Router();

// Start the server once database established
db.once('open', function(){
	app.listen(8080);
	console.log("Server running on port 8080");
});

var Startup = require('./models/startupmodel');


router.use(function(req,res,next){
	console.log('Something is happening');
	next();
});

router.get('/', function(req,res){
	console.log('Hooray welcome to our api');
	//res.json({message: 'Hooray welcome to our api'});
});

router.route('/new')
	  .post(function(req, res){

	  				req.assert('fname', 'Name is required').notEmpty();
	  				req.assert('lname', 'Name is required').notEmpty();
	  				req.assert('email','Not a valid email').isEmail();
	  				var errors = req.validationErrors();
	  				if(!errors)
	  				{
						var person = new Startup({


							fname: req.body.fname,
							lname: req.body.lname,
							companyname: req.body.cname,
							location: req.body.loc,
							mail: req.body.email,
							password: req.body.pwd,
							confirmpassword: req.body.vpwd
						});

						person.save(function(error,data){
							//console.log(data);
							//res.json(data);
						});
						Startup.find({}, function(err,data){
							console.log(data);
							res.json(data);
						});
					}
					else
					{
						res.send(errors);
					}
	  });

app.use('/api',router);
