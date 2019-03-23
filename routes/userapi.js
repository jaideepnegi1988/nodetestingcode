var express = require('express');
var app = express();
var router = express.Router();
var connectionPool = require("../config/connection.js");
var jwtModel = require("../models/tokenjws.js");


const apiauthMiddleWare = function(req,res,next){
	let status = true;
	if(status){
		next();
	}else{
		res.json({'status':'api not allowed'});
	}
}

router.use(apiauthMiddleWare);



router.get('/getcountry',function(req,res){
	//res.sendStatus(200);
	connectionPool.getConnection(function(err,connection){
		if (err) {
          connection.release();
          throw err;
        } 

        connection.query("select * from countries order by name",function(err,result,fields){
        	connection.release();
        	if(err){
        		res.json({'status':500});
        		return;
        	}
        	//res.render("countrylist",{"dataset":result});
        	res.setHeader('Content-Type', 'application/json');
        	res.json({
				'status': 200,
				'message':'Data fetched Successfully!!',
				'countrylist': result
			});
        });

	});
	
});

router.get('/apitoken/:userid',function(req,res){
	const token = jwtModel.jwstoken(req.params.userid);
	res.json(token);
});

router.get('/tokenstatus',function(req,res){
	let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam5lZ2kxMjMiLCJ1c2VybmFtZSI6InRlc3RpbmdfdXNlciIsImlhdCI6MTU1MzA3MjQyNSwiZXhwIjoxNTUzMDcyNzI1LCJpc3MiOiJteXRlc3Rqd3QiLCJzdWIiOiJmb3IgZ2VuZXJhdGlvbiBqd3QgdG9rZW4ifQ.SsSUWK7Lh7QNKXYr3_Qgn8aRg2klb5ac_c8WqAX9FBWtXnM4lsOy3VR9hWw8bobpXODKZIqEYlfDa1v62Hv4tRmthaf_DnHSXz9t2CQfinM9-iNNx6SOi9Cz3Ql9pgZbP2fHXlXvtnlhimsxcjeF4fB_unkOnTWid1US2AttOTE';
	const validate_response = jwtModel.validateToken(token);
	res.setHeader('Content-Type', 'application/json');
	res.json(validate_response);
});


router.get('/tokendecode',function(req,res){
	let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam5lZ2kxMjMiLCJ1c2VybmFtZSI6InRlc3RpbmdfdXNlciIsImlhdCI6MTU1MzA3MjQyNSwiZXhwIjoxNTUzMDcyNzI1LCJpc3MiOiJteXRlc3Rqd3QiLCJzdWIiOiJmb3IgZ2VuZXJhdGlvbiBqd3QgdG9rZW4ifQ.SsSUWK7Lh7QNKXYr3_Qgn8aRg2klb5ac_c8WqAX9FBWtXnM4lsOy3VR9hWw8bobpXODKZIqEYlfDa1v62Hv4tRmthaf_DnHSXz9t2CQfinM9-iNNx6SOi9Cz3Ql9pgZbP2fHXlXvtnlhimsxcjeF4fB_unkOnTWid1US2AttOTE';
	res.json(jwtModel.decodeToken(token));
});



module.exports = router;