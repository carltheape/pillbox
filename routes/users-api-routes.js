var db = require("../models");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Schedule
        db.user.findAll({
            include: [db.Schedule]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/users", function(req, res) {

        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            var newUser = {
                email: req.body.email,
                password: hash
            };
                    db.User.create(newUser).then(function(dbUser) {
            res.json(dbUser);
        });
        });

    });
}