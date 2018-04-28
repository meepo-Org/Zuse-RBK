var mongoose = require('mongoose');
var db = require('./config');
//Messages for second hand shop stuff, in order to contact the donar.
var message = mongoose.Schema({
	From: { type : String, required : true },
	to: { type : String, required : true },
	content:{ type : String, required : true }
});


var Message = mongoose.model('Message', message);

module.exports= Message;
