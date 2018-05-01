var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var db = require('./config');

var user = mongoose.Schema({
  userType:String,
  userName: { type : String, required : true },
  passWord: { type : String, required : true },
  Email:{ type : String, required : true },
  location:String,
  freeProducts:[],
  paidProducts:[],
  buyRecord:[],
  sellRecord:[]

});


var User = mongoose.model('User', user);


User.comparePassword = function(attemptedPassword,savedPassword,callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if(err){
      callback(err)
    }else{
      callback(null,isMatch);}

    });
}
User.addProduct = function (Product ,user) {

  user.freeProducts.push(Product)
  console.log(user)
  user.save()
}

module.exports= User;
