var crypto = require('crypto');
var bcrypt = require('bcrypt');
var db=require('../database-mongo/index.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util=require('./utility.js')
exports.signupUserForm = function(req, res) {
  res.send('Signup');
};

exports.signupUser = function(req, res) {
  var userName = req.body['states[userName]'];
  var passWord = req.body['states[passWord]'];
  var Email = req.body['states[Email]'];
  //console.log(req.body['states[userName]'],'in')

   db.User.findOne({ Email: Email },function(err,found){
   
   if (!found ){
     var newUser = new db.User({
          userName: userName,
          passWord: passWord,
          Email: Email

       });
       bcrypt.hash(passWord, 10, function(err, hash) {
        newUser.passWord=hash;
        newUser.save(function(err,obj) {
         if(err){
            res.status(500).send(err);
         }
         else{
          res.status(201).send("Thank You");
          console.log('Im in ')
        }
       })
      });
       // newUser.save(function(err,obj) {
       //   if(err){
       //      res.status(500).send(err);
       //   }
       //   else{
       //    res.status(201).send("Thank You");
       //    console.log('Im in ')
       //  }
       // })
   }
   else{
    res.status(201).send("")
  }
 })
}
    // .fetch()
    // .then(function(user) {
    //   if (!user) {
    //     var newUser = new db.User({
    //       username: username,
    //       password: password
    //     });
    //     newUser.save() 
    //       .then(function(newUser) {
    //         Users.add(newUser);
    //         util.createSession(req, res, newUser);
    //       });
    //   } else {
    //     console.log('Account already exists');
    //     res.redirect('/Signup');
    //   }
    // });



// exports.signinUserForm = function(req, res) {
//   res.render('signin');
// };


exports.signinUser = function(req, res) {
  var userName = req.body['states[userName]'];
  var passWord = req.body['states[passWord]'];
 db.User.findOne({ userName: userName },function(err,user){
   if (!user ){
        console.log("user not exist")
      } else {
        var data;
        db.User.comparePassword(passWord,user.passWord, function(err,match) {
          if (match) {
            data="coreeeeect";
            //util.createSession(req, res, db.User);
            console.log("coreeeeect");
          } else {
            console.log("innnnncoreeeeect");
            data="";
          }
        });
        res.status(201).send(data)
      }
    });
};

<<<<<<< HEAD
exports.signinUserForm = function(req, res) {
  res.render('signin');
};

exports.signinUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        res.redirect('/signin');
      } else {
        User.comparePassword(password, user.password, function(err, match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/signin');
          }
        });
      }
    });
};
=======

>>>>>>> second commit
