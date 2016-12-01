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

SchoolFinder.prototype.AddSchool = function(req,res){
	var query = "insert into sfschooldetails(InstituteName,NoOfStudents,NoOfTeachers,ClassGroups,Description,SchoolChildrenRatio,"+
				+"PhoneNumber,EmailAddress,Website,Latitude,Longitude) values(" +
				+ "'" + req.body.InstituteName + "'," +
				+ "'" + req.body.NoOfStudents + "'," +
				+ "'" + req.body.NoOfTeachers + "'," +
				+ "'" + req.body.ClassGroups + "'," +
				+ "'" + req.body.Description + "'," +
				+ "'" + req.body.SchoolChildrenRatio + "'," +
				+ "'" + req.body.PhoneNumber + "'," +
				+ "'" + req.body.EmailAddress + "'," +
				+ "'" + req.body.Website + "'," +
				+ "'" + req.body.Latitude + "'," +
				+ "'" + req.body.Longitude + "'" +
				+ ");";
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			return res.json(result);
			var instituteID = result.insertId;
			AddAddress(instituteID,req.body.Street1,req.body.Street2,req.body.City,req.body.State,req.body.ZipCode);
		}
	});
};

function AddMapAddress(instituteID,addressID)
{
	var query = "insert into sfschooladdress(InstituteID,AddressID) values("+ instituteID +"," + addressID +");";

	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(result.insertId);
		}
	});
};

function AddAddress(instituteID,Street1,Street2,City,State,ZipCode)
{
	var query = "insert into sfaddress(Street1,Street2,Area,ZipCode) values("+
				+ "'" + Street1 +"'," +
				+ "'" + Street2 +"'," +
				+ "'" + City +"'," +
				+ "'" + ZipCode +"'" +
				+ ");";

	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(result.insertId);
			AddMapAddress(instituteID,result.insertId);
		}
	});
};

module.exports = new SchoolFinder();
