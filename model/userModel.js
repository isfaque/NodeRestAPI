var db = require('../config/dbconnection');
 
var User = {
 
	getAllUsers:function(callback){
		return db.query("Select * from users",callback);
	},

	getUserById:function(id,callback){
		return db.query("select * from users where usrId=?",[id],callback);
	},

	addUser:function(User,callback){
		return db.query("Insert into users(usrUserName, usrStatusId, usrStatusName) values(?,?,?)",[User.usrUserName,1,'active'],callback);
	},

	deleteUser:function(id,callback){
		return db.query("delete from users where usrId=?",[id],callback);
	},

	updateUser:function(id,User,callback){
		return db.query("update users set usrUserName=? where usrId=?",[User.usrUserName,id],callback);
	}
 
};

module.exports = User;