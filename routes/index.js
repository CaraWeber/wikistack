'use strict';
var express = require('express');
var router = express.Router();
//var tweetBank = require('../tweetBank');
var client = require('../db');

module.exports = function makeRouterWithSockets (io) {
	 router.get('/', function(req, res, next){
	 	console.log("hey")});
  return router;
}
