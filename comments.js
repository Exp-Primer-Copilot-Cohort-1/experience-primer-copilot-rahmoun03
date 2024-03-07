// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up port
var port = process.env.PORT || 8080;

// Create a router
var router = express.Router();

// Set up router middleware
router.use(function(req, res, next) {
  console.log('Something is happening...');
  next();
});

// Set up router
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the comments API!' });
});

// Set up router
router.route('/comments')
  .post(function(req, res) {
    var comment = req.body.comment;
    fs.readFile('comments.json', 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
          if (err) {
            console.log(err);
          } else {
            res.json({ message: 'Comment added!' });
          }
        });
      }
    });
  })
  .get(function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var comments = JSON.parse(data);
        res.json(comments);
      }
    });
  });

// Set up router
router.route('/comments/:id')
  .get(function(req, res) {
    var id = req.params.id;
    fs.readFile('comments.json', 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var comments = JSON.parse(data);
        res.json(comments[id]);
      }
    });
  })
  .put(function(req, res) {
    var id = req.params.id;
    var comment = req.body.comment;
    fs.readFile('comments.json', 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var comments = JSON.parse(data);
        comments[id] = comment;
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
          if (err) {
            console.log(err);
          }