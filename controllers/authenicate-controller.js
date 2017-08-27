// var connection = require("./../config");
var bcrypt = require("bcrypt-nodejs");

module.exports.authenicate = function(req, res) {
	var email = req.body.email,
	var password = req.body.password;

	connection.query("SELECT * FROM users WHERE email = ?", [email], function (error, results, fields) {
		if (error) {
			res.json({
				status: false,
				message: "there is an error with the query"
			});
		} else {
		// Checks to see if email exists in database
			if(results.length > 0){
			//Checks to verify password
				bcrypt.compare(password, results[0].password, function(err, resp){	
					if (!resp){
						res.json({
							status: false,
							message: "Email and password do not match"
						});
					} else {
						res.json({
							status: true,
							message: "Successful Login"
						})
					}
				});
			} else {
				res.json({
					status: false,
					message: "Email does not exits"
				});
			}
		}
	});
}