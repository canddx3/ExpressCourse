var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const models = require('../models');

router.get('/category', function(req, res, next) {
  models.category.findAll({}).then(categoryFound => {
    res.render('category', {
      category: categoryFound
    });
  });
});

router.post('/category', (req, res) => {
  models.category
    .findOrCreate({
      where: {
        name: req.body.name,
        last_update: req.body.last_update,
        default_price: req.body.default_price
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/category');
      } else {
        res.render('This category already exists!');
      }
    });
});

router.get('/category/:id', function(req, res, next) {
  let catId = parseInt(req.params.id);
  models.category.findOne({where: {category_id: catId}}).then(category => {
      res.render('categoryid', {
        category: category
      });
    });
});

module.exports = router;
