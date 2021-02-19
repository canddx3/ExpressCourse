var express = require('express');
var router = express.Router();
var storyData = require('../models/storyData');

router.get('/beginning', function(req, res, next) {
  let story = storyData.storyLine.find(data => {
  return data.storyPart ===  "beginning";
  });
  res.render('beginning', { story });
});

router.get('/middle', function(req, res, next) {
  let story = storyData.storyLine.find(data => {
    return data.storyPart === "middle";
  });
  res.render('middle', { story });
});

router.get('/end', function(req, res, next) {
  let story = storyData.storyLine.find(data =>{
    return data.storyPart === "end";
  });
  res.render('end', { story });
});

module.exports = router;
