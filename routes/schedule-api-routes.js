// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the schedules
  app.get("/api/schedules", function(req, res) {
    var query = {};
    if (req.query.patient_id) {
      query.PatientId = req.query.patient_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Patient
    db.Schedule.findAll({
      where: query,
      include: [db.Patient]
    }).then(function(dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // Get rotue for retrieving a single schedule
  app.get("/api/schedules/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Patient
    db.Schedule.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Patient]
    }).then(function(dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // POST route for saving a new schedule
  app.post("/api/schedules", function(req, res) {
    db.Schedule.create(req.body).then(function(dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // DELETE route for deleting schedules
  app.delete("/api/schedules/:id", function(req, res) {
    db.Schedule.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // PUT route for updating Shedules
  app.put("/api/schedules", function(req, res) {
    db.Schedule.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbSchedule) {
        res.json(dbSchedule);
      });
  });
};
