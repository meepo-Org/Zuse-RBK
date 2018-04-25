//this schema is for account
var mongoose = require('mongoose');
var db = require('./config');


var suggest = mongoose.Schema({
  name: { type : String, required : true },
  type: { type : String, required : true },
  content: { type : String, required : true }
});


var Suggest = mongoose.model('Suggest', suggest);



// var selectAll = function(callback) {
//   Suggest.find({}, function(err, suggest) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, user);
//     }
//   });
// };


// user.pre('save',function(next) {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.passWord, null, null).bind(this)
//       .then(function(hash) {
//         this.passWord = hash;
//         next();
//       });
//   })

// var deleteAll=function(callback){
//   Suggest.remove({},function(err,data){
//     if(err){
//       callback(err,null)
//     }else{
//       callback(null,data)
//     }

//   })
// }





module.exports = Suggest;
// module.exports.selectAll = selectAll;
// module.exports.deleteAll = deleteAll;

