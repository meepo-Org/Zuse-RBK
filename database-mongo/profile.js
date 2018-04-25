
var mongoose=require ('mongoose');
var db = require('./config');

var profile = mongoose.Schema({
  name: { type : String, required : true },
  select: { type : String, required : true },
  post:{ type : String, required : true }
});


var Profile = mongoose.model('Profile', profile);


// var Save=function(req,res){
// 	console.log(req.body.select)

// 	var name=req.boby.name
// 	var select=req.body.select
// 	var post=req.body.post

// 	  var p = new Profile({
//           name: name,
//           select: select,
//           post:post
//         });

// 	p.save(function(err,data) {
//            if(err){
//        res.status(500).send(err);
//          }

//          else{
//           res.status(201).send("Thank You");
//           console.log('hi yyyyyyyyy')
//         }
// 	})
// }

module.exports = Profile;