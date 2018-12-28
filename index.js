const express = require('express');
var mainController = require('./controllers/mainController');

var app = express();

mainController(app);

app.listen(3000);
console.log('listening to port 3000');
