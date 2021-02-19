var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  models.posts
    .findAll({include: [{ model: models.users }]})
    .then(postFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(postFound));
    });
});
router.get('/:id', function(req, res, next) {
  models.actor
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.film }]
    })
    .then(actorsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    });
});

router.post('/', function (req, res, next) {
  models.post.findOrCreate({
    where: { 
      first_name: req.body.first_name, 
      last_name: req.body.last_name 
    }
  })
  .spread(function(result, created) {
    if (created) {
      res.redirect('/post/' + result.postId);
    } else {
      res.status(400);
      res.send('post already exists');
    }
  });
});

router.put("/:id", function (req, res, next) {
  let PostId = parseInt(req.params.id);
  models.post
    .update(req.body, { where: { post_id: PostId } })
    .then(result => res.redirect('/post/' + PostId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the post.  Please check the information.");
    });
});

router.delete("/:id", function (req, res, next) {
  let PostId = parseInt(req.params.id);
  models.posts
    .destroy({
      where: { post_id: PostId }
    })
    .then(result => res.redirect('/post'))
    .catch(err => { 
      res.status(400); 
      res.send("There was a problem deleting the post. Please make sure you are specifying the correct id."); 
    }
);
});
