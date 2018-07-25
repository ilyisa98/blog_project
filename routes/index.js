var express = require('express');
var router = express.Router();
var request = require('request');


var Blogs = require('../db.json');
///////////////////////////////////////////HOMEPAGE///////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
//res.render('index', { title: 'Home', blogs: myBlogs.Blogs});
    
 request.get({
     url: 'http://localhost:8000/Blogs',
     json: true
 }, function(error, response, body){
     //what to send when function has finished
     res.render('index', { title: 'Home', blogs: body});
 });    
});

///////////////////////////////////////////ARCHIVEPAGE///////////////////////////////////////
//GET blogs page
router.get('/blogs', function(req, res, next) {
   request.get({
     url: 'http://localhost:8000/Blogs',
     json: true
}, function(error, response, body){
       res.render('blogs', { title: 'Blogs', blogs: body });
 });  

});


///////////////////////////////////////////CONTACTPAGE///////////////////////////////////////
//GET contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});
//GET contact page
router.get('/contact/submit', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});

///////////////////////////////////////////EDIT DATA///////////////////////////////////////
//GET edit page
//router.get('/edit/:id', function(req, res, next) {
//    
//       let urlPath = req.path;
//    
//        if(urlPath.length == 7){
//           let postVal = urlPath.slice(-1);
//           res.render('edit', { title: 'Edit Blog', blogs: Blogs.Blogs[postVal -1] });
//        }
//    
//        if(urlPath.length = 8){
//           let postVal = urlPath.slice(-2);
//           res.render('edit', { title: 'Edit Blog', blogs: Blogs.Blogs[postVal -1] });
//        }
//     
//});

router.get('/edit/:id', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/Blogs/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        res.render('edit', { title: 'Edit Blog',blogs: JSON.parse(body)});
    });
})

///////////////////////////////////////////DELETE DATA///////////////////////////////////////
/* GET delete BLOG-ID.*/
router.get('/delete/:id', function(req, res, next) {
  //make a post request to our database
  request({
    url: "http://localhost:8000/Blogs/"  + req.params.id,
    method: "DELETE",
    }, function(error, response, body) {

        res.redirect('/');
    });
});


///////////////////////////////////////////VIEW DATA///////////////////////////////////////
//GET view page

//router.get('/view/:id', function(req, res, next) {
//    
//
//    
//       let urlPath = req.path;
//    
//           
//        if(urlPath.length == 7){
//           let postVal = urlPath.slice(-1);
//           res.render('view', { title: 'Read More', blogs: Blogs.Blogs + req.params.id, });
//        }
//    
//        if(urlPath.length = 8){
//           let postVal = urlPath.slice(-2);
//           res.render('view', { title: 'Read More', blogs: Blogs.Blogs[postVal -1] });
//        }
//    
//   
//});



router.get('/view/:id', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/Blogs/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        res.render('view', { title: 'Read More',blogs: JSON.parse(body)});
    });
})


///////////////////////////////////////////UPDATE DATA///////////////////////////////////////


router.post('/update/:id', function(req, res, next) {

    request({
    url: "http://localhost:8000/Blogs/"+ req.params.id,
    method: "PUT",
    form: {
        "title": req.body.title,
        "author": req.body.author,
        "date": req.body.date,
        "image": req.body.image,
        "content": req.body.content
    }
    }, function(error, response, body) {
        res.redirect('/');
        
    });
})


///////////////////////////////////////////POST DATA///////////////////////////////////////
//GET new page
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Create New Blog' });
});

//Post new page
router.post('/new', function(req, res , next) {

//create a variable a post   
 let obj = {
  "title": req.body.title,
  "author": req.body.author,
  "date": req.body.date,
  "image": req.body.image,
  "content": req.body.content,
}

 //write logic to save this data
 
 request.post({
     url: 'http://localhost:8000/Blogs',
     body: obj,
     json: true
 }, function(error, response, body){
//what to send when function has finished
     res.redirect('/');
 });

    
    });

module.exports = router;
