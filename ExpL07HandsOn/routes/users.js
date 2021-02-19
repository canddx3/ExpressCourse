var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport');

var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport');

//users//
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
//signup//
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
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('login');
      } else {
        res.send('This user already exists');
      }
    });
});

//login//
router.get('/login', function (req, res, next) {
  res.render('login');
  });
  router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res, next) { res.redirect('profile'); });
  router.get('/profile', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username
          });
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
  });

  //id//
  router.get('/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user) {
        res.render('profile', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Username: user.Username
        });
      } else {
        res.send('User not found');
      }
    });
  });
  //delete//
  router.get("/:id/delete", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users
    .destroy({
      where: { UserId: userId }
    })
    .then(result => res.redirect('/users/signup'));
  });
  router.get('/:id/updateDelete', function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users.update(
    {
      Deleted: 1
    },
    {
      where: {
        UserId: userId
      }
    }
  )
    .then(user => {
      res.render('updateDeleted');
    });
  });
  module.exports = router;
  