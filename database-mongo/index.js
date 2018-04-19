var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
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
  userName: String,
  passWord: String

});


var User = mongoose.model('User', user);

var selectAll = function(callback) {
  User.find({}, function(err, user) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};
User.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.passWord, function(err, isMatch) {
      if(err){
        callback(err)
      }else{
            callback(null,isMatch);}

    });
  }

user.pre('save',function(next) {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.passWord, null, null).bind(this)
      .then(function(hash) {
        this.passWord = hash;
        next();
      });
  })
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

