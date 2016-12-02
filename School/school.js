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


SchoolFinder.prototype.UpdateSchool = function(req,res){
var instituteID = req.body.InstituteID;
var query = "update set " +
				"InstituteName = " + "'" + req.body.InstituteName + "'," +
			  + "NoOfStudents = "	+ "'" + req.body.NoOfStudents + "'," +
			  + "NoOfTeachers = " + "'" + req.body.NoOfTeachers + "'," +
			  + "ClassGroups = " + "'" + req.body.ClassGroups + "'," +
			  + "Description = " +  "'" + req.body.Description + "'," +
			  + "SchoolChildrenRatio = " + "'" + req.body.SchoolChildrenRatio + "'," +
			  + "PhoneNumber = " + "'" + req.body.PhoneNumber + "'," +
			  + "EmailAddress = " + "'" + req.body.EmailAddress + "'," +
			  + "Website = " + "'" + req.body.Website + "'," +
			  + "Longitude = " + "'" + req.body.Longitude + "'," +
			  + "Latitude = " + "'" + req.body.Latitude + "'," +
			  + "from sfschooldetails where InstituteID = " + instituteID;

	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			return res.json(result);
			updateAddress(req.body.AddressID,req.body.Street1,req.body.Street2,req.body.State,req.body.City,req.body.ZipCode);
		}
	});
};


function updateAddress(addressID,Street1,Street2,State,City,ZipCode)
{
	var query = "update set "+
				+ "Street1 = " + "'" + Street1 + "'," +
				+ "Street2 = " + "'" + Street2 + "'," +
				+ "State = " + "'" + State + "'," +
				+ "City = " + "'" + City + "'," +
				+ "ZipCode = " + "'" + ZipCode + "'" +
				+ "from sfaddress where AddressID = " + addressID;
	conneciton.query(query,function(req,res){
		if(err)
		{
			console.log(err);
		}
		else
		{
			return res.json(result);
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
