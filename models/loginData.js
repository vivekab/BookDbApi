const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const LoginDataSchema = new Schema({
  name : String
});

const loginData = mongoose.model('logindata',LoginDataSchema);

module.exports= loginData;
