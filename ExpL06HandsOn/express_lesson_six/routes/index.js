const express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/actors', function(req, res, next) {
  models.actor
    .findAll({ 
      attributes: ['actor_id', 'first_name', 'last_name'],
      include: [{ 
        model: models.film, 
        attributes: ['film_id', 'title', 'description', 'rental_rate', 'rating'] 
      }]      
    })
    .then(actorsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    });
});
router.get('/actors/:id', function(req, res, next) {
  models.actor
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.film }]
    })
    .then(actorsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    });
});
router.post('/actors', function (req, res, next) {
  models.actor.findOrCreate({
    where: { 
      first_name: req.body.first_name, 
      last_name: req.body.last_name 
    }
  })
  .spread(function(result, created) {
    if (created) {
      res.redirect('/actors/' + result.actor_id);
    } else {
      res.status(400);
      res.send('Actor already exists');
    }
  });
});

module.exports = router;
