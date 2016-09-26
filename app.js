'use strict'

var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var routes = require('./routes/wiki');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');
//var socketio = require('socket.io');
var models= require('./models/');
var db = require('./db');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// // start the server
// var server = app.listen(1337, function(){
//   console.log('listening on port 1337');
// });
// //var io = socketio.listen(server);

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);



app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.use('/', routes);
// app.use('/wiki', routes);

// app.use('/', function(req, res, next){
// 	res.redirect('/wiki');
// });