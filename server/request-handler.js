var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var User=require('../database-mongo/index.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util=require('./utility.js')
exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(newUser) {
            Users.add(newUser);
            util.createSession(req, res, newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

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