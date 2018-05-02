var mongoose=require ('mongoose');
var db = require('./config');
//Second hand shop stuff posts.
var products = mongoose.Schema({
	name: { type : String, required : true },
	userType: { type : String, required : true },
	productName: { type : String, required : true },
	productDisc:{ type : String, required : true },
	productImg:{ type : String }

});


var Product = mongoose.model('Product', products);



module.exports = Product;