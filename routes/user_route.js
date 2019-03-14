var express = require('express');
var router = express.Router();
var connectionPool = require("../config/connection.js");

router.get('/',function(req,res){
	res.send("index form");
});

router.get('/details',function(req,res){
	connectionPool.getConnection(function(err,connection){
		if (err) {
          connection.release();
          throw err;
        } 

        connection.query("select * from countries order by name",function(err,result,fields){
        	connection.release();
        	res.render("countrylist",{"dataset":result});
        	/*result.forEach(function(dataset){
				console.log(dataset.name);
			});*/
        });

	});
});

router.get('/login',function(req,res){
	res.render("login");
});

router.post('/login',function(req,res){
	var logininfo = req.body;
	res.send(logininfo);
});


router.get('/signup',function(req,res){
	res.render("signup");
});

router.get('/forgetpassword',function(req,res){
	res.send("forget password form 1");
});



//export this router to use in our index.js
module.exports = router;