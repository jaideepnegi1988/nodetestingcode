const fs = require('fs');
const jwt  = require('jsonwebtoken');
var payload = {
	'user_id': 'jnegi123',
	'username': 'testing_user'
};
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

const jwttoken = function(){
	var privateKEY  = fs.readFileSync(process.app_path+'/config/jwt_private.key', 'utf8');
	return jwt.sign(payload, privateKEY,signoption);
}

//validate a token from user, if token get expired it will generate 
// token_status = 200(verified) , 403(expired & regenerated), 404 (unexpected error)
const validateToken = function(token){
	try{
		var publicKey = fs.readFileSync(process.app_path+'/config/jwt_public.key','utf8');
		return {'token_status': 200, 'message': 'token verfied' , 'token': jwt.verify(token, publicKey, verifyOptions)}
	}catch(error){
		if(error.name == 'TokenExpiredError'){
			previous_paylod = decodeToken(token);
			payload.user_id = previous_paylod.payload.user_id;
			payload.username = previous_paylod.payload.username;
			//console.log(payload);
			return {'token_status' : 403, 'message': 'token regenerated', 'token': jwttoken()};
			/*let login_status = false;
			if(login_status){
				return {'token_status' : 403, 'message': 'token regenerated', 'token': jwttoken('jnegi123')};
			}else{
				return {'token_status' : 404, 'message': 'Please login again'};
			}*/
		} else{
			return {'token_status' : 404, 'message': 'Something went wrong'};
		}
	}
}

const decodeToken = function(token){
	return jwt.decode(token, {complete: true});
}



module.exports = {'jwstoken': jwttoken, 'validateToken': validateToken, 'decodeToken': decodeToken};