const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const BookDataSchema = new Schema({
  owner : String,
  name : String,
  author : String
});

const BookData = mongoose.model('bookdata',BookDataSchema);

module.exports= BookData;
