var express = require('express');
var router = express.Router();
var staticModels = require('../staticModels/planets');

router.get('/staticPlanets', function (req, res, next) {

  res.send(JSON.stringify(
    staticModels.planet
  ));
});


module.exports = router;
