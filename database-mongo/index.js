var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

mongoose.connect('mongodb://localhost/ReduceRuse');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var user = mongoose.Schema({
  userName: { type : String, required : true },
  passWord: { type : String, required : true },
  Email:{ type : String, required : true }
});


var User = mongoose.model('User', user);

//this schema is for account

var account = mongoose.Schema({
  userName: { type : String, required : true },
  imageurl: { type : String, required : true },
  description:{ type : String, required : true }
});


var account = mongoose.model('account', user);




var selectAll = function(callback) {
  User.find({}, function(err, user) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};


User.comparePassword = function(attemptedPassword,savedPassword,callback) {
    bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
      if(err){
        callback(err)
      }else{
        callback(null,isMatch);}

    });
  }

// user.pre('save',function(next) {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.passWord, null, null).bind(this)
//       .then(function(hash) {
//         this.passWord = hash;
//         next();
//       });
//   })

var deleteAll=function(callback){
  User.remove({},function(err,data){
    if(err){
      callback(err,null)
    }else{
      callback(null,data)
    }

  })
}
var updateValue=function(req,res,newVal,callback){
  User.findByIdAndUpdate(req.user.userName, newVal, { 'new': true}, function(err,data){
    if(err){
      callback(err,null)
    }else{
      callback(null,data)
    }
  });
}





module.exports.User = User;
module.exports.selectAll = selectAll;
module.exports.deleteAll = deleteAll;
module.exports.updateValue = updateValue;
module.exports.account = account;
