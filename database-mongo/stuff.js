var mongoose=require ('mongoose');
var db = require('./config');
//Second hand shop stuff posts.
var stuff = mongoose.Schema({
	name: { type : String, required : true },
	select: { type : String, required : true },
	post:{ type : String, required : true },
	stuffImg: { type : String, required : true }
});


var Stuff = mongoose.model('Stuff', stuff);




module.exports = Stuff;