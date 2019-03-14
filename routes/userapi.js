var express = require('express');
var router = express.Router();
var connectionPool = require("../config/connection.js");
var jwtModel = require("../models/tokenjws.js");


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
	let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam5lZ2kxOTg4IiwiaWF0IjoxNTUyNTU0Mzk1LCJleHAiOjE1NTI1NTQ2OTUsImlzcyI6Im15dGVzdGp3dCIsInN1YiI6ImZvciBnZW5lcmF0aW9uIGp3dCB0b2tlbiJ9.QDScsQpRoJhjK6sDa3b1PVRbsBAiP5mcJaT1TPXrVHTUgQm2VUOTaMihFoZ7TGPoaE-1EeV0kzeVjyDm247hLUDebq7yo9Go_nE67Sca3sdRmrpK_VNbfGapPrq-4Lsetn3fZaQMv9rjjM2TE4gMbS1wZhQ60GfebIPR18dwBGo';
	const validate_response = jwtModel.validateToken(token);
	res.setHeader('Content-Type', 'application/json');
	res.json(validate_response);
	/*if(token_status == 200){
		res.json({
			'status' : 404,
			'message': 'expired',
		});
	}else{
		res.json({
			'status': 200,
			'message': 'Token verified',
			'token': validate_response
		});
	}*/
	
});



module.exports = router;