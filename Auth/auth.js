var con = require('mysql');

var connection = con.createConnection({
	host:'localhost',
	user: 'root',
	password: '',
	database: 'sf'
});

connection.connect();


var Auth = function(){};


Auth.prototype.GetStudentList = function(){
	
var data = [{"firstname":"kalidasu","lastname":"surada","email":"kalidasu.surada@gmail.com"},
		{"firstname":"vamsi","lastname":"surada","email":"vamsi.surada@gmail.com"}
		];
//console.log(data);
return data;
};

Auth.prototype.GetRoles = function(req,res) {
	console.log("datacoming");
	var query = "select * from sfroles where roleID not in(1,2)";
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			return res.json(result);
		}
	});
	// body...
};

Auth.prototype.addRoles = function(req,res){

	var query = "insert into sfroles(RoleName,isActive) values('" + req.body.roleName + "',1);";
	connection.query(query,function(err,result){
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

Auth.prototype.addUserRoles = function(req,res){

	var query = "insert into sfuserroles(RoleID,UserID) values("+req.body.UserID +"," + req.body.RoleID +");";
	connection.query(query,function(err,result){
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

Auth.prototype.validateLogin = function(req,res){

	var query = "select * from sfusers where UserName = '" + req.body.UserName + "' and Password = '" + req.body.Password +"'";
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(result);
			return res.json(result);
		}
	});
};

Auth.prototype.register = function(req,res){
	console.log(req);
	var query = "insert into sfperson(FirstName,LastName,EmailAddress,MobileNumber,PersonTypeID,isActive) values('" +
				req.body.FirstName + "','" +
				req.body.LastName + "','" +
				req.body.EmailAddress + "','" +
				req.body.MobileNumber +"'," +
				req.body.PersonTypeID +","+
				req.body.isActive +");";
	console.log(query);
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(result.insertId);
			AddUsers(req.body.UserName,req.body.Password,req.body.EmailAddress,result.insertId,1,req.body.RoleID);
			return res.json(result);
		}
	});

};

function AddUsers(username,password,emailAddress,userID,isActive,roleID)
{
	console.log(username);
	console.log("kali");
	var query = "insert into sfusers(UserID,UserName,Password,EmailAddress,isActive) values("+
				userID + ",'" +
				username + "','" +
				password +"','" +
				emailAddress +"'," +
				isActive +");";

	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(result.insertId);
			AddUserRoles(userID,roleID);
		}
	});
}

function AddUserRoles(UserID,roleID){
	//console.log(UserID,roleID);
	var query = "insert into sfuserroles(UserID,RoleID) values(" + UserID + "," + roleID +");";
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(result.insertId);
			return UserID;

		}
	});
}

module.exports = new Auth();		

// User Settings

