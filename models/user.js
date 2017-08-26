module.exports = function(sequelize, Datatypes){
	var User = sequelize.define("User", {
		email:Datatypes.STRING,
		password: Datatypes.STRING
	});
	return User;
}