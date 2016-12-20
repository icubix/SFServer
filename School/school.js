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
	var datetime = require('node-datetime');
	var dt = datetime.create();
	var fomratted = dt.format('m/d/Y H:M:S');
	console.log(fomratted);
	console.log("sef");
	var query = "insert into sfschooldetails(InstituteName,NoOfStudents,NoOfTeachers,ClassGroups,Description,SchoolChildrenRatio,PhoneNumber,EmailAddress,Website,Latitude,Longitude,CreatedBy,CreatedDate) values(" +
				 "'" + req.body.InstituteName + "'," +
				 "'" + req.body.NoOfStudents + "'," +
				 "'" + req.body.NoOfTeachers + "'," +
				 "'" + req.body.ClassGroups + "'," +
				 "'" + req.body.Description + "'," +
				 "'" + req.body.SchoolChildrenRatio + "'," +
				 "'" + req.body.PhoneNumber + "'," +
				 "'" + req.body.EmailAddress + "'," +
				 "'" + req.body.Website + "'," +
				 "'" + req.body.Latitude + "'," +
				 "'" + req.body.Longitude + "'," +
				 "'" + req.body.UserID + "'," +
				 "'" + fomratted + "'" +
				 ");";

    console.log(query);
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			
			var instituteID = result.insertId;
			var ExpiryYear =req.body.Year;
			var ExpiryMonth =req.body.Month;
			console.log(instituteID);
			AddAddress(instituteID,req.body.Street1,req.body.Street2,req.body.City,req.body.State,req.body.ZipCode);
			AddCreditCardDtls(req.body.UserID,instituteID,req.body.FirstName,req.body.LastName,req.body.CardNumber,req.body.CVV,ExpiryMonth,ExpiryYear);
			return res.json(result);
			//var instituteID = result.insertId;
			
		}
	});
};


SchoolFinder.prototype.UpdateSchool = function(req,res){
var instituteID = req.body.InstituteID;
var query = "update set " +
				"InstituteName = " + "'" + req.body.InstituteName + "'," +
			    "NoOfStudents = "	+ "'" + req.body.NoOfStudents + "'," +
			    "NoOfTeachers = " + "'" + req.body.NoOfTeachers + "'," +
			    "ClassGroups = " + "'" + req.body.ClassGroups + "'," +
			    "Description = " +  "'" + req.body.Description + "'," +
			    "SchoolChildrenRatio = " + "'" + req.body.SchoolChildrenRatio + "'," +
			    "PhoneNumber = " + "'" + req.body.PhoneNumber + "'," +
			    "EmailAddress = " + "'" + req.body.EmailAddress + "'," +
			    "Website = " + "'" + req.body.Website + "'," +
			    "Longitude = " + "'" + req.body.Longitude + "'," +
			    "Latitude = " + "'" + req.body.Latitude + "'," +
			    "from sfschooldetails where InstituteID = " + instituteID;

	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			return res.json(result);
			updateAddress(req.body.AddressID,req.body.Street1,req.body.Street2,req.body.State,req.body.City,req.body.ZipCode);
			updateCreditCardDtls(req.body.UserID,req.body.InstituteID,req.body.FirstName,req.body.LastName,req.body.CardNumber,req.body.CVV,req.body.Month,req.body.Year);
		}
	});
};


function updateAddress(addressID,Street1,Street2,State,City,ZipCode)
{
	var query = "update set "+
				"Street1 = " + "'" + Street1 + "'," +
			    "Street2 = " + "'" + Street2 + "'," +
			    "State = " + "'" + State + "'," +
			    "City = " + "'" + City + "'," +
			    "ZipCode = " + "'" + ZipCode + "'" +
			    "from sfaddress where AddressID = " + addressID;
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

function AddCreditCardDtls(UserID,InstituteID,FirstName,LastName,CardNumber,CVV,Month,Year)
{
	var query = "insert into sfcreditcarddetails(AddedBy,InstituteID,FirstName,LastName,CardNumber,CVV,ExpiryMonth,ExpiryYear) values(" +
				"'" + UserID + "'," +
				"'" + InstituteID + "'," +
				"'" + FirstName + "'," +
				"'" + LastName + "'," +
				"'" + CardNumber + "'," +
				"'" + CVV + "'," +
				"'" + Month + "'," +
				"'" + Year + "'" +
				");";
    console.log(query);
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

function updateCreditCardDtls(UserID,InstituteID,FirstName,LastName,CardNumber,CVV,Month,Year)
{
	var query = "update set " +
				"FirstName = " + "'" + FirstName + "'," +
				"LastName = " + "'" + LastName +"'," +
				"CardNumber = "+ "'" + CardNumber +"'," +
				"CVV =" + "'" + CVV + "'," +
				"Month = " + "'" + Month + "'," +
				"Year = " + "'" + Year + "'" +
				"Where InstituteID = " + InstituteID;
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(res.json(result));
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
				 "'" + Street1 +"'," +
				 "'" + Street2 +"'," +
				 "'" + City +"'," +
				 "'" + ZipCode +"'" +
				 ");";
	console.log(query);
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

SchoolFinder.prototype.getSchools = function(req,res) {
	
	var query =   " select sd.*,sa.* " +
				  "	from sfschooldetails sd " + 
				  " inner join sfschooladdress sad on sd.InstituteID = sd.InstituteID " +
				  "	inner join sfaddress sa on sa.AddressID = sad.AddressID;"

	console.log(query);
	connection.query(query,function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			//console.log(result);
			return res.json(result);
		}
	});
};

SchoolFinder.prototype.getSchool = function(req,res) {
  console.log("shankar");
	var InstituteID = req.body.InstituteID;
	var query =   " select sd.*sa.* " +
				  "	from sfschooldetails sd " + 
				  " inner join sfschooladdress sad on sd.InstituteID = sd.InstituteID " +
				  "	inner join sfaddress sa on sa.AddressID = sad.AddressID " +
				  " Where sd.InstituteID = " + InstituteID;

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

SchoolFinder.prototype.searchSchools = function(req,res){
	// console.log("hitting");
	// console.log(req.body);
	var addressOne = req.body.addressOne;
	var addressTwo = req.body.addressTwo;
	var state =  req.body.State;
	var Zipcode = req.body.Zipcode;
	var lat = req.body.lat;
	var long = req.body.long;
	var radius = req.body.radius;

	console.log(req.body);
	console.log(req.body.addressOne);
	console.log(addressOne);
	var query =   " select sd.*,sa.* " +
				  "	from sfschooldetails sd " + 
				  " left join sfschooladdress sad on sd.InstituteID = sad.InstituteID " +
				  "	left join sfaddress sa on sa.AddressID = sad.AddressID " +
				  " Where 1 = 1 "

	if(addressOne != undefined)
	{
		query = query + " and sa.Street1 LIKE '%" + addressOne + "%'";
	}

	if(addressTwo != undefined)
	{
		query = query + " and sa.Street2 LIKE '%" + addressTwo + "%'";
	}

	if(Zipcode != undefined)
	{
		query = query + " and sa.ZipCode LIKE '%" + Zipcode + "%'";
	}

    if(state != undefined)
	{
		query = query + " and sa.Area LIKE '%" + state + "%'";
	}

	if(lat != undefined && long != undefined && radius != undefined)
	{
		//query = query + " and sa.Latitude LIKE '%" + lat + "%'";
		//query = query + " and sa.Longitude LIKE '%" + long + "%'";
		//query = query + "( 3959 * acos( cos( radians(17.414478) ) * cos( radians("+ lat +" ) ) * cos( radians("+ long +" ) - radians(78.466646) ) + sin( radians(17.414478) ) * sin( radians("+ lat +") ) ) ) AS distance HAVING distance < " + radius;
	}

	console.log(query);
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
	})
};



module.exports = new SchoolFinder();
