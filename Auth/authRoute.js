require('rootpath')();

var express = require('express');
var app = express();
var Auth = require('../Auth/auth.js');
var bodyParser = require('body-parser');
var cors = require('cors');

router = express.Router({
	mergeParms: true
});
app.use(bodyParser.json());

router.use(cors());

router.get('/',function(req,res){
	//console.log('testing');
	 var data = Auth.GetStudentList();
	 return res.json(data);
});

router.post('/addRoles',function(req,res){
	var data = Auth.addRoles(req,res);
	return data;
});

router.post('/addUserRoles',function(req,res){
	var data = Auth.addUserRoles(req,res);
	return data;
});


router.post('/validateLogin',function(req,res){
	var data = Auth.validateLogin(req,res);
	return data;
});

router.post('/register',function(req,res){
	var data = Auth.register(req,res);
	return data;
});

router.get('/getRoles',function(req,res){

	var data = Auth.GetRoles(req,res);
	return data;
})


module.exports = router;
