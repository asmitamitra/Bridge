var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  company: String,
  loc: String,
  industry: String,
  description: String,
  pitch_line: String,
  password: String,            ///Hash Created string

  follow_investor: [{
    investor_company: {type: String}
  }]


});

var User = mongoose.model('User', userSchema);
module.exports = User;
