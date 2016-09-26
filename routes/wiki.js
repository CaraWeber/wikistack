'use strict';
var express = require('express');
var router = express.Router();
//var tweetBank = require('../tweetBank');
var client = require('../db');
var models= require('../models/')

function respondWithAllPages (req, res, next){
    var pageList = models.Page.findAll()
    .then(function(pagesRet){
      res.render('index',{pagesRet: pagesRet})});
      // res.render('index', {
      // title: 'Twitter.js',
      // tweets: tweets,
      // showForm: true
      // });
  }

router.get('/', respondWithAllPages);
router.get('/wiki', respondWithAllPages);
    


router.post('/', function(req,res, next){
	var author= req.body.authorName;
	var email= req.body.authorEmail; 
	var title= req.body.title; 
	var content= req.body.content; 
	var status= req.body.status; 

 models.User.findOrCreate({
    where: {name: author, email: email}
  }).then(function(pageUser){
    var user= pageUser[0];
    console.log(pageUser);
    
	var page = models.Page.build({
    title: title,
    content: content, 
    status: status,
    date: "2014-01-01"
  });
  // res.render('wikipage', {
  //   title: newPage.title,
  //   content: newPage.content
  // });
	return page.save()
	.then(function(newPage){
    return page.setAuthor(user);
}).then(function(page){ res.redirect(page.route)}).catch(function(err){
    console.log(err);
    //res.render('error');
  });
});
});

router.get('/wiki/add', function (req, res, next){
	res.render('addpage');
});

router.get('/users', function(req, res, next){
  models.User.findAll().then(function(users){
      res.render('authorindex',{users: users})})
});

router.get('/users/:id', function(req, res, next){
  var userID = req.query.id;
  models.Page.findAll({
    where: {authorId: userID}
  }).then(function(articles){
 //   res.render(NEW TEMPLATE WITH AUTHOR ARTICLES)
  })

});
  
router.get('/:url', function(req, res, next){
  models.Page.findOne({
    where: {urlTitle: req.params.url},
    include: [
    {model: models.User, as: 'author' }]
  }).then(function(foundPage){
      console.log("this is foundPage! " + foundPage.author.name);
      res.render('wikipage', {
      page: foundPage
    });
  }).catch(next)
})


module.exports = router;
