module.exports = function(app) {
  var userController = require('./userController');
  var bookController = require('./bookController');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const config = require('../config');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  mongoose.connect(config.database,function (err) {
     if(err)
       console.log('Connection Failed');
     else {
       console.log('Connection successfully established');
     }
   });
  app.set('superSecret', config.secret);




  userController(app);
  bookController(app);
};
