var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var knex = require('./db/knex.js');
var pg = require('pg');
var bcrypt = require('bcrypt');
var bookshelf = require('bookshelf')(knex);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

function users(){
  return knex('users');
}

function cities(){
  return knex('cities');
}

function user_cities(){
  return knex('user_cities');
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
})

app.get('/users', function(req, res){
  users().then(function(result){
    res.json(result);
  })
})

app.post('/users', function(req, res){
  var hash = bcrypt.hashSync(req.body.password, 8);
  users().insert({
    name: req.body.name,
    password: hash,
    email: req.body.email,
    home_city: req.body.homeCity,
  })
})

app.get('/:id', function(req, res){
  users().then(function(result){
    res.json(result);
  })
})

app.get('/cities', function(req, res){

})




app.listen(3000, function(req, res){
  console.log('Listening on port 3000');
})
