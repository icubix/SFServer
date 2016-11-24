var con = require('mysql');

var connection = con.createConnection({
	host:'localhost',
	user: 'root',
	password: '',
	database: 'sf'
});

connection.connect();


var SchoolFinder = function(){};

SchoolFinder.prototype.getList = function(req,res){
	console.log('vamsi');
	var data = [{"firstname":"kalidasu","lastname":"surada","email":"kalidasu.surada@gmail.com"},
		{"firstname":"vamsi","lastname":"surada","email":"vamsi.surada@gmail.com"}
		];
//console.log(data);
return data;
};

module.exports = new SchoolFinder();
