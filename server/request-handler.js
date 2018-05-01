var request = require('request');
var bcrypt = require('bcrypt');
var db=require('../database-mongo/config.js');
var User=require('../database-mongo/user.js');
var Stuff=require('../database-mongo/stuff.js');
var Suggest=require('../database-mongo/suggest.js');
var Product=require('../database-mongo/product.js');
var Message=require('../database-mongo/message.js');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util=require('./utility.js')

exports.signupUser = function(req, res) {
  var userName = req.body['states[userName]'];
  var passWord = req.body['states[passWord]'];
  var Email = req.body['states[Email]'];
  var userType = req.body['states[userType]'];
  var location=req.body['states[location]'];

  console.log(User,"user")

  User.findOne({ Email: Email },function(err,found){


   if (!found ){
     var newUser = new User({
      userName: userName,
      passWord: passWord,
      Email: Email,
      userType:userType,
      location:location

    });
     bcrypt.hash(passWord, 10, function(err, hash) {
      newUser.passWord=hash;
      newUser.save(function(err,obj) {
       if(err){
        res.status(500).send(err);
        console.log("error")
      }
      else{
        res.status(201).send("Thank You");
      }
    })
    });

   }
   else{
    res.status(201).send("")
  }
})  
} 

exports.signinUser = function(req, res) {
  var userName = req.body['states[userName]'];
  var passWord = req.body['states[passWord]'];
  User.findOne({ userName: userName },function(err,user){
   if (!user ){
    console.log("user not exist")
  } else {
    var data="kk";
    User.comparePassword(passWord,user.passWord, function(err,match) {
      if (match) {
        data="coreeeeect";
        res.status(201).send(data);
        console.log("coreeeeect");
      } else {
        console.log("innnnncoreeeeect");
        data="";
        res.status(201).send(data);
      }
    });
  }
});
};


exports.Stuffsave = function(req, res) {
  var name=req.body.name;
  var select=req.body.select;
  var post=req.body.post;
  var newstuff = new Stuff({
    name: name,
    select: select,
    post:post
  });

  newstuff.save(function(err,data) {
   if(err){
     res.status(500).send(err);
   }

   else{
    res.status(201).send(data);
    console.log('saved')
  }
})
}
exports.deletePost= function(req, res) {
  Stuff.remove({_id:req.body.id},function(err,data){
   if(err){
     res.status(500).send("err");
   }
   else{
    res.status(201).send("deleted");
  }
})
}

exports.addSuggest= function(req, res) {
  var name=req.body.name;
  var type=req.body.type;
  var content=req.body.content;
  var newSuggestion = new Suggest({
    name: name,
    type: type,
    content:content,
    count:0
  });

  newSuggestion.save(function(err,data) {
   if(err){
     res.status(500).send(err);
   }

   else{
    res.status(201).send("suggection saved");
    console.log('saved')
  }
})
}

exports.showSuggest= function(req, res) {
  Suggest.find({ type:req.body.type},function(err,data){

   if(err){
     res.status(500).send(err);
   }

   else{
    res.status(201).send(data);
    console.log('suggetion as req')
  }
})
}

exports.updateLikes=function (req, res) {
  console.log(req.body.id)
  console.log("countttt",req.body.count)
  Suggest.findByIdAndUpdate({_id:req.body.id},{ count: req.body.count}, function (err, data) {
    if (err){ console.log("errrrrr",err)};
    res.send(data);
  }
  )
}

exports.home= function(req, res) {
  Stuff.find({},function(err,data){

   if(err){
     res.status(500).send(err);
   }

   else{
    res.status(201).send(data);
    console.log('extra')
  }
})
}

exports.message=function(req,res){
 console.log(req.body.name,'test')
 Message.find({to:req.body.name},function(err,data){
  if(err){
   res.status(500).send(err);
 }

 else{
  res.status(201).send(data);
  console.log('message retrieved')
}
})
}

exports.sendMessage=function(req,res){
  console.log(req.body.From)
  console.log(req.body.to)
  console.log(req.body.content)
  var From=req.body.From;
  var to=req.body.to;
  var content=req.body.content;
  var newMessage=new Message(
   {From:From,
     to:to,
     content:content}
     )
  newMessage.save(function(err,data){
    if(err){
      res.status(500).send(err);
      console.log("there was an error")
    }else{
      res.status(201).send(data);
      console.log('message sent successfully ')
    }
  })

}

exports.logout = function(req, res) {
  res.send("logout");
}

exports.addProduct = function (req , res) {
  var name=req.body.name;
  var productName=req.body.productName;
  var productDisc=req.body.productDisc;
  var productImg=req.body.productImg;

  var newProduct = new Product({
    name: name,
    productName: productName,
    productDisc:productDisc , 
    productImg:productImg
  });

  newProduct.save(function(err,data) {
   if(err){
     res.status(500).send(err);
   }

   else{
    res.status(201).send(data);
    console.log('saved')
  }
})
}

exports.getProduct = function (req , res) {
  Product.find({},function(err,data){
    if(err){
     res.status(500).send(err);
   }

   else{
    res.status(201).send(data);
    console.log('Product work')
  }
})
}