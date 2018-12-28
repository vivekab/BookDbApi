const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const UserDataSchema = new Schema({
  username : { type : String , unique : true, required : true },
  password : { type : String , unique : true, required : true }
});

const UserData = mongoose.model('userdata',UserDataSchema);

module.exports= UserData;
