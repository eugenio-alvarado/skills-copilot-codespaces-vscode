// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true });

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set view engine
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { comments: comments });
    }
  });
});

// Add comment
app.post('/add', (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    message: req.body.message
  });

  comment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Server listening
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

