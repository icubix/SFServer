require('rootpath')();

var express = require('express');
var app = express();
var sfObject = require('../School/school.js');
var bodyParser = require('body-parser');
var cors = require('cors');

router = express.Router({
	mergeParms: true
});
app.use(bodyParser.json());

router.use(cors());

console.log('test');

router.get('/',function(req,res){
	var data = sfObject.getList(req,res);
	return res.json(data);
});

router.post('/addschool',function(req,res){
	console.log("abc");
	var data = sfObject.AddSchool(req,res);

	return data;
});

router.get('/getSchools',function(req,res){
	var data = sfObject.getSchools(req,res);
	return data;
});

router.get('/getSchool',function(req,res){
	var data = sfObject.getSchool(req,res);
  
	return data;
});

router.post('/searchSchools',function(req,res){
	var data = sfObject.searchSchools(req,res);
	return data;
});

module.exports = router;