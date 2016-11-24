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

module.exports = router;