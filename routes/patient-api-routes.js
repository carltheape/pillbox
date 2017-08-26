var db = require("../models");

module.exports = function(app) {
  app.get("/api/patients", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Schedule
    db.Patient.findAll({
      include: [db.Schedule]
    }).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  app.get("/api/patients/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Schedule
    db.Patient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Schedule]
    }).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  app.post("/api/patients", function(req, res) {
    db.Patient.create(req.body).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  app.delete("/api/patients/:id", function(req, res) {
    db.Patient.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

};
