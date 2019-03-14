var mysql = require('mysql');
const configSetting = require("./config.json");
var connectionPool = mysql.createPool({
	connectionLimit : 10,
	host: configSetting.development.host,
	user: 'root',
	password: '',
	database: 'test'
});

module.exports = connectionPool;