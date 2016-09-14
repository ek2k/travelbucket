var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var knex = require('./db/knex.js');
var pg = require('pg');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  function(username, password, done) {
    db.users.findOne({email: email}, function(err, user) {
      if(err) {return done(err);}
      if(!email) {
        return done(null, false, {message: 'Incorrect email.'});
      }
      if(!user.validPassword(password)) {
        return done(null, false, {message: 'Incorrect password'});
      }
    return done(null, user);
  });
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
})

function users(){
  return knex('users');
}

function cities(){
  return knex('cities');
}

function user_cities(){
  return knex('user_cities');
}

app.get('/users', function(req, res){
  users().then(function(result){
    res.json(result);
  })
});

app.post('/users', function(req, res){
  var hash = bcrypt.hashSync(req.body.password, 8);
  users().insert({
    fname: req.body.fname,
    lname: req.body.lname,
    password: hash,
    email: req.body.email,
    home_city: req.body.home_city
  }).then(function(result){
    res.json(result);
  })
})

app.get('/users/:id', function(req, res) {
  users().where('id', req.params.id).first().then(function(result){
    res.json(result);
  })
})

app.put('/users/:id', function(req, res) {
  users().where('id', req.params.id).first().then(function(result){
    res.json(result);
  })
})

app.delete('/users/:id', function(req, res) {
  users().where('id', req.params.id).first().then(function(result){
    res.json('result');
  })
})

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/user',
//   failureRedirect: '/login',
//   failureFlash: true
// )});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    users().where('id', req.params.id).first().then(function(result){
      res.json('result');
    })
  });






var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Listening on ' + port);
})
