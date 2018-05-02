var mongoose=require ('mongoose');
var db = require('./config');
//Second hand shop stuff posts.
var stuffSchema = mongoose.Schema({
	name: { type : String, required : true },
	select: { type : String, required : true },
	post:{ type : String, required : true },
	stuffImg: { type : String, required : true },
	prodName: {type : String, required : true},
	prodOwner: {type : String, required : true}
});


var Stuff = mongoose.model('Stuff', stuffSchema);




module.exports = Stuff;
