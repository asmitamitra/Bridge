var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Investor = mongoose.model('Investor');


var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var done=false;
var bodyParser = require('body-parser');
var path = require('path');

router.use(function(req, res, next){

	if(req.method === "GET") {
		//continue to next middleware
		return next();
	}
	if(!req.isAuthenticated()){
		//user not authenticated
		return res.redirect('/login');
	}
	//user authenticated continue to next middleware
	return next();
});

router.route('/browse')

			.get(function(req, res){
				User.find(function(err, data){
					if(err){res.send(500, err);}
					res.send(data);
					return data;
				})
			})
router.route('/browse_startup')

		.get(function(req, res){
			User.find(function(err, data){
				if(err){res.send(500, err);}
				res.send(data);
				return data;
			})
		})

router.get('/browse_startup/:id', function(req, res){

				var company = req.params.id;
				User.find({company: req.params.id}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;

				})
		})

router.get('/browse_investor/:id', function(req, res){

				var company = req.params.id;
				Investor.find({company: req.params.id}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);

					res.send(data);
					return data;

				})
		})

router.get('/browse_investor/:id', function(req, res){

				var company = req.params.id;
				Investor.find({company: req.params.id}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);

					res.send(data);
					return data;

			})
	})


router.get('/follow/:name/:id', function(req, res){


	User.update({username: req.params.id}, {$push: {follow_investor: {investor_company: req.params.name}}}, {upsert: true}, function(err, data){
		if(err){ res.send(500, err);}
		console.log('in success data ' + data);
		res.send(data);
	});
})
// //router.get('/follow/:name/:id', function(req, res){
// 	console.log('in follow request');
// })

router.get('/lookfollow/:name', function(req, res){


	User.find({username: req.params.name}, function(err, data){
		if(err){ res.send(500, err);}
		console.log('in success data ' + data);
		res.send(data);

	});
})

router.route('/browse_investor')

			.get(function(req, res){
				Investor.find(function(err, data){
					if(err){res.send(500, err);}
					res.send(data);
					return data;
				})
		})


router.route('/browse_delhi')

			.get(function(req, res){
				User.find({loc: 'Delhi'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;
			})
	})


router.route('/browse_mumbai')

			.get(function(req, res){
				User.find({loc: 'Mumbai'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;
				})
		})


router.route('/browse_bangalore')

		.get(function(req, res){
				User.find({loc: 'Bangalore'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;
				})
		})


router.route('/browse_noida')

		.get(function(req, res){
				User.find({loc: 'Noida'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;

					})
	})

router.route('/browse_pune')

				.get(function(req, res){
					User.find({loc: 'Pune'}, function(err, data){
						if(err){res.send(500, err);}
						console.log(data);
						res.send(data);
						return data;
				})
	})

router.route('/browse_kolkata')

				.get(function(req, res){
					User.find({loc: 'Kolkata'}, function(err, data){
						if(err){res.send(500, err);}
						console.log(data);
						res.send(data);
						return data;
				})
	})

router.route('/browse_surat')

				.get(function(req, res){
					User.find({loc: 'Surat'}, function(err, data){
						if(err){res.send(500, err);}
						console.log(data);
						res.send(data);
						return data;
				})
	})

router.route('/browse_hyderabad')

				.get(function(req, res){
					User.find({loc: 'Hyderabad'}, function(err, data){
						if(err){res.send(500, err);}
						console.log(data);
						res.send(data);
						return data;
				})
	})


/*Industry wise browse apis */

router.route('/browse_health')

		.get(function(req, res){
				User.find({industry: 'Health'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
							return res.send(data);

					})
			})


router.route('/browse_food')

		.get(function(req, res){
				User.find({industry: 'Food'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);res.send(data);
					return data;
					})
			})

router.route('/browse_web')

		.get(function(req, res){
				User.find({industry: 'Web'}, function(err, data){
					if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;
					})
			})

router.route('/browse_consumer')

		.get(function(req, res){
				User.find({industry: 'Consumer Services'}, function(err, data){
				if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;
				})
		})
router.route('/browse_media')

		.get(function(req, res){
				User.find({industry: 'Media Services'}, function(err, data){
				if(err){res.send(500, err);}
					console.log(data);
					res.send(data);
					return data;
					})
	})

router.route('/browse_education')

		.get(function(req,res){
			console.log('are you here');
			User.find({industry: 'Education'}, function(err,data){
				if(err){res.send(500,err);}
				console.log(data);
				res.send(data);
				return data;
			})
		})


	router.route('/browse_business')

			.get(function(req, res){
					User.find({industry: 'Business Services'}, function(err, data){
						if(err){res.send(500, err);}
						console.log(data);res.send(data);
						return data;
						})
				})

	router.route('/browse_finance')

			.get(function(req, res){
					User.find({industry: 'Financial Services'}, function(err, data){
						if(err){res.send(500, err);}
						console.log(data);
						res.send(data);
						return data;
						})
				})

	router.route('/browse_it')

			.get(function(req, res){
					User.find({industry: 'IT Services'}, function(err, data){
					if(err){res.send(500, err);}
						console.log(data);
						res.send(data);
						return data;
					})
			})

	router.route('/upload')
	.post(function(req,res){
	    upload(req,res,function(err) {
	        if(err) {
	            return res.end("Error uploading file.");
	        }
	        res.end("File is uploaded");
	    });
	});




module.exports = router;
