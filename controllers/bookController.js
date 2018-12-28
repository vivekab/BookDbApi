module.exports =function (app) {

  const mongoose = require('mongoose');
  const bookData = require('../models/bookData');
  const express = require('express');
  const jwt = require('jsonwebtoken');

  app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(req.body);
    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });

    }
  });


  app.post('/books',function (req,res) {
    bookData({
      owner : app.get('myusername'),
      name : req.body.name,
      author : req.body.author
    }).save(function (err,data) {
      if(err){
        res.status(404).send(err);
      }
      else {
        res.status(202).send("successfully inserted");
      }
    });
  });

  app.get('/books',function (req,res) {

    bookData.find({owner : app.get('myusername')},' name author',function (err,books) {
      res.status(200).send(books);
    });
  });


};
