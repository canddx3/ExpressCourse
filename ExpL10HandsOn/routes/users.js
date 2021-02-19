var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });

    router.get('/', function (req, res, next) {
      models.users.findAll({})
      .then(users => {
        if (req.user.Admin === true) {
          res.render('users', {
            users: users
          });
        } else {
          res.send('User is not an Admin');
        }
      });
      });
      
    router.get('/login', function(req, res, next) {
      res.render('login');
    });
    
    router.post('/login', function (req, res, next) {
      models.users.findOne({
        where: {
          Username: req.body.username,
          Password:req.body.password
        }
      }).then(user => {
        if (!user) {
          console.log('User not found');
          return res.status(401).json({
            message: "Login Failed"
          });
        } else {
          let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
          if (passwordMatch) {
            let token = authService.signUser(user);
            res.cookie('jwt', token);
            res.redirect('profile');
          } else {
            console.log('Wrong password');
            res.send('Wrong password');
          }
        }
      });
    });

    router.get('/profile', function (req, res, next) {
      let token = req.cookies.jwt;
      if (token) {
        authService.verifyUser(token)
          .then(user => {
            if (user) {
              res.send(JSON.stringify(user));
            } else {
              res.status(401);
              res.send('Invalid authentication token');
            }
          });
      } else {
        res.status(401);
        res.send('Must be logged in');
      }
    });

    router.get('/logout', function (req, res, next) {
      res.cookie('jwt', "", { expires: new Date(0) });
      res.send('Logged out');
      });
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
