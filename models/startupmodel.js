var mongoose = require('mongoose');
var schema = mongoose.Schema({
	fname: String,
	lname: String,
	companyname: String,
	location: String,
	mail: String,
	password: String,
	confirmpassword: String
});


var Startup = mongoose.model('Enterpreneur', schema);
module.exports = Startup;