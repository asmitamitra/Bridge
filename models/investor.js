var mongoose = require('mongoose');
var iSchema = new mongoose.Schema({
  username: String,
  email: String,
  company: String,
  password: String,           ///Hash Created string
  industry: String,
  loc: String,
  employees: String,
  website_url: String,
  desc: String

});

var Investor = mongoose.model('Investor', iSchema);
module.exports = Investor;
