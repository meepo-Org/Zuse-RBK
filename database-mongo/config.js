var mongoose=require ("mongoose");
var databaseConnect = 'mongodb://localhost/ReduceRuse'
mongoose.connect(databaseConnect);
//"mongodb://recycle:123456789@ds151554.mlab.com:51554/recycle"
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

module.exports = db;