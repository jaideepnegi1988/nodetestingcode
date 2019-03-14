var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var user_route = require("./routes/user_route.js");
var userapi = require("./routes/userapi.js");
var cookiePaser = require("cookie-parser");
var session = require("express-session");
const configSetting = require("./config/config.json");

const os = require("os");
const net = require("net");

//console.log(net.createConnection());

process.app_path = __dirname;



app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/user',user_route);
app.use('/userapi',userapi);
app.use(cookiePaser());
app.use(session({
	secret: 'secret key',
  	resave: true,
  	saveUninitialized: true
  }));


app.get('/',function(req,res){
	//console.log(configSetting);
	//res.send(process.NODE_ENV);
	res.render("index.pug");
	//res.redirect("/user/login");
});


// Cookies routes
app.get("/setcookies", function(req,res){
	var userObj = {"fname":"Ram","lname":"Prasad","email":"jaideepnegi1988@gmail.com"};
	var deptObj = {"dname":"Bank Sector","address":"Noida","country":"india"};
	res.cookie('userdetails',userObj);
	res.cookie('deptdetails',deptObj).send("Cookies department data set");

});

app.get("/getcookies", function(req,res){
	var cookie_data = req.cookies;
	res.send(cookie_data);
});

app.get("/clearcookies/:id", function(req,res){
	if(req.params.id == 1){
		res.clearCookie('userdetails').send("User cookies cleared");
	}else if(req.params.id == 2){
		res.clearCookie('deptdetails').send("Department cookies cleared");
	}else{
		res.send("Invalid request to clear cookies");
	}
});

// End cookies routes

//Session routes

app.get("/setsession",function(req,res){
	if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      req.session.username = 'jaideep';
      res.send("Welcome to this page for the first time!");
   }
});

app.get('/getsession',function(req,res){
	if(req.session.page_views){
		res.send("Current session value "+ req.session.page_views);
	}else{
		res.send("session not set yet");
	}
});

app.get('/clearsession',function(req,res){
	req.session.destroy();
	res.send("session cleared");
});

// End Session

// jwt token system


app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});




//app.listen(3000);

 app.listen(configSetting.development.port,function(){
	console.log("Server Listening Started with port:" + configSetting.development.port);
});