const fs = require('fs');
const jwt  = require('jsonwebtoken');
const signoption = {
		issuer: 'mytestjwt',
		subject: 'for generation jwt token',
		expiresIn : 300,
		algorithm:  "RS256"
};

const verifyOptions = {
		issuer: 'mytestjwt',
		subject: 'for generation jwt token',
		expiresIn : 300,
		algorithm:  "[RS256]"
};

const jwttoken = function(user_id){
	var privateKEY  = fs.readFileSync(process.app_path+'/config/jwt_private.key', 'utf8');
	return jwt.sign({'user_id': user_id}, privateKEY,signoption);
}

//validate a token from user, if token get expired it will generate 
// token_status = 200(verified) , 403(expired & regenerated), 404 (unexpected error)
const validateToken = function(token){
	try{
		var publicKey = fs.readFileSync(process.app_path+'/config/jwt_public.key','utf8');
		return {'token_status': 200, 'message': 'token verfied' , 'token': jwt.verify(token, publicKey, verifyOptions)}
	}catch(error){
		if(error.name == 'TokenExpiredError'){
			let login_status = true;
			if(login_status){
				return {'token_status' : 403, 'message': 'token regenerated', 'token': jwttoken('jnegi1988')};
			}else{
				return {'token_status' : 404, 'message': 'Please login again'};
			}
		} else{
			return {'token_status' : 404, 'message': 'Something went wrong'};
		}
	}
}

module.exports = {'jwstoken': jwttoken, 'validateToken': validateToken };