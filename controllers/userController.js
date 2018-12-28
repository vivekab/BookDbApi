module.exports =function (app) {

  const userData = require('../models/userData');
  const bookController = require('../controllers/bookController');
  const expressValidator = require('express-validator');
  const jwt = require('jsonwebtoken');

  var bcrypt = require('bcrypt');
  const saltRounds = 10;

  app.use(expressValidator());


  app.post('/login',function(req,res) {

    userData.find({username : req.body.username },function (err,result) {
      if(err){
        res.send(err);
      }
      if(result.length){
        bcrypt.compare(req.body.password, result[0].password, function(err, resp) {
          if(err) throw err;
          if(!(resp == true)) {
            res.status(400).send({message:"Incorrect Password"});
          }
          else{
            console.log(result);
            const payload = {
              user : result[0].username
            };
            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn: 60 * 60
            },function (err,token) {
              if(err) throw err;
              app.set('myusername',req.body.username);
              res.status(200).json({
                token: token
              });

            });
          }
        });
      }
      else{
        res.status(404).send({message:"User not found"});
        console.log(result);

      }
    });
  })

  app.post('/register',function (req,res) {

    req.checkBody('username','Username cannot be empty').notEmpty();
    req.checkBody('password','Password cannot be empty').notEmpty();
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");

    const errors=req.validationErrors();

    const username =req.body.username;
    const password =req.body.password;

    if(errors){
      console.log('errors:',errors);
      res.status(400).send(errors);
    }
    else{

      bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        userData({
          username : username,
          password : hash
        }).save(function (err,result) {
          if(err){
            console.log(err);
            res.status(409).send({message:"username already exists"});
          }
          else {
            res.status(201).send({message:"user Successfully created"});
          }
        });
      });
    }
  });

  app.get('/users',function (req,res) {

    userData.find({},'username',function (err,users) {
      if(err){
        throw err;
      }
      else{
        res.send(users);
      }
    });
  });

};
