var http = require('http');
var url = require('url');
var dt = require("./myfirstmodule.js");
var uc = require('upper-case');
var nodemailer = require("nodemailer");
var mysql = require("mysql");


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//console.log(req.url);
  //res.write("The date and time are currently: " + dt.myDateTime());
  if(req.url == '/'){
	  res.write(uc("Hello World"));
  }
  if(req.url == '/display_data'){
	  res.write("The date and time are currently: " + dt.myDateTime());
  }
  if(req.url == '/sendemail'){
	 var transportMedium = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'jaideep.beckett@gmail.com',
			pass: 'jaideep.88'
		}
	 });
	 
	 var mailOption = {
		 from: 'jaideep.beckett@gmail.com',
		 to: '', // enter email id
		 subject: 'Testing email',
		 html: '<h1>Welcome</h1><p>This is node emailer testing report</p>'
	 };
	 
	 transportMedium.sendMail(mailOption,function(error,info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		} 
	 });
  }
  
  if(req.url == '/countrylist'){
	 var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'test'
	 });
	 
	 con.connect(function(err){
		if(err) throw err;
		con.query("SELECT * FROM countries", function (err, result, fields) {
			if (err) throw err;
			result.forEach(function(dataset){
				console.log(dataset.name);
			});
		});
	 });

		
  }
  
  res.end();
}).listen(8080);