var mongoose = require('mongoose');
var db = require('./config');

var suggest = mongoose.Schema({
	name: { type : String, required : true },
	type: { type : String, required : true },
	content: { type : String, required : true },
	count:{ type : Number, required : true }
});

var Suggest = mongoose.model('Suggest', suggest);

module.exports = Suggest;

