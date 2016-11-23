require('rootpath')();

var express = require('express');
var app = express();
var Auth = require('./auth.js');
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



module.exports = router;
