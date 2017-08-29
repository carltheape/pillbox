// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // pillbox route loads pillbox.html
  app.get("/pillbox", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/pillbox.html"));
  });

  // patients route loads patient-manager.html
  app.get("/patients", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/patient-manager.html"));
  });

};
