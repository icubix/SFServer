var Auth = function(){};


Auth.prototype.GetStudentList = function(){
	
var data = [{"firstname":"kalidasu","lastname":"surada","email":"kalidasu.surada@gmail.com"},
		{"firstname":"vamsi","lastname":"surada","email":"vamsi.surada@gmail.com"}
		];
//console.log(data);
return data;
};

Auth.prototype.addRoles = function(){

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

Auth.prototype.addUserRoles = function(){

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

Auth.prototype.validateLogin = function(){

	var query = "select * from sfusers where UserName = '" + req.body.UserName + "' and Password = '" + req.body.Password +"'";
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

Auth.prototype.register = function(){
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
			AddUsers(req.body.UserName,req.body.Password,req.body.EmailAddress,result.insertId,1,req.body.roleID);
			return res.json(result);
		}
	});

};

function AddUsers(username,password,emailAddress,userID,isActive,roleID)
{
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
	var query = "insert into sfuserroles(UserID,RoleID) values(" + UserID + "," + roleID +");";
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
}

module.exports = new Auth();		

// User Settings
