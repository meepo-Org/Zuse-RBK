var express = require('express');
var bodyParser = require('body-parser');
var database = require('../database-mongo/config.js');
var app = express();

 var handler=require('./request-handler.js');
 var mongoose=require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/Signup', handler.signupUser);
app.post('/FreeProducts', handler.Stuffsave);
app.post('/Suggest', handler.addSuggest);
app.post('/suggestions', handler.showSuggest);
app.put('/SuggestionList',handler.updateLikes )
app.delete('/delete',handler.deletePost )
app.get('/Logout', handler.logout);
app.post('/Login', handler.signinUser);
app.get('/Home', handler.home);
app.post('/Message',handler.sendMessage)
app.post('/inbox',handler.message);
app.post('/Products', handler.addProduct)
app.get('/Products', handler.getProduct)
app.post('/Sender', handler.getSenderLocation)
app.post('/User', handler.getUserInfo)

app.get('/', function (req, res) {
   res.send("");
 });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});