$(document).ready(function() {
  /* global moment */

  // pillboxContainer holds all of our schedules
  var pillboxContainer = $(".pillbox-container");
  var scheduleCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleScheduleDelete);
  $(document).on("click", "button.edit", handleScheduleEdit);
  // Variable to hold our schedules
  var schedules;

  // The code below handles the case where we want to get pillbox schedules for a specific patient
  // Looks for a query param in the url for patient_id
  var url = window.location.search;
  var patientId;
  if (url.indexOf("?patient_id=") !== -1) {
    patientId = url.split("=")[1];
    getSchedules(patientId);
  }
  // If there's no patientId we just get all schedules as usual
  else {
    getSchedules();
  }


  // This function grabs schedules from the database and updates the view
  function getSchedules(patient) {
    patientId = patient || "";
    if (patientId) {
      patientId = "/?patient_id=" + patientId;
    }
    $.get("/api/schedules" + patientId, function(data) {
      console.log("Schedules", data);
      schedules = data;
      if (!schedules || !schedules.length) {
        displayEmpty(patient);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete schedules
  function deleteSchedule(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/schedules/" + id
    })
    .done(function() {
      getSchedules(scheduleCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed schedule HTML inside pillboxContainer
  function initializeRows() {
    pillboxContainer.empty();
    var schedulesToAdd = [];
    for (var i = 0; i < schedules.length; i++) {
      schedulesToAdd.push(createNewRow(schedules[i]));
    }
    pillboxContainer.append(schedulesToAdd);
  }

  // This function constructs a schedule's HTML
  function createNewRow(schedule) {
    // var formattedDate = new Date(schedule.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newSchedulePanel = $("<div>");
    newSchedulePanel.addClass("panel panel-default");
    var newSchedulePanelHeading = $("<div>");
    newSchedulePanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newScheduleMed_name = $("<h2>");

    // var newScheduleDate = $("<small>");
    var newScheduleDosage = $("<small>");
    var newScheduleSched = $("<small>");

    var newSchedulePatient = $("<h5>");
    newSchedulePatient.text("Patient: " + schedule.Patient.name);
    newSchedulePatient.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });



    var newSchedulePanelNotes = $("<div>");
    newSchedulePanelNotes.addClass("panel-body");
    var newScheduleNotes = $("<p>");
    newScheduleMed_name.text(schedule.med_name + " ");
    newScheduleNotes.text(schedule.notes);
    // newScheduleDate.text(formattedDate);
    newScheduleDosage.text(schedule.dosage + " ");
    newScheduleSched.text(schedule.sched + " ");   

    // newScheduleMed_name.append(newScheduleDate);
    newScheduleMed_name.append(newScheduleDosage);
    newScheduleMed_name.append(newScheduleSched);

    newSchedulePanelHeading.append(deleteBtn);
    newSchedulePanelHeading.append(editBtn);
    newSchedulePanelHeading.append(newScheduleMed_name);

    newSchedulePanelHeading.append(newScheduleMed_name);
    newSchedulePanelHeading.append(newScheduleMed_name);

    newSchedulePanelHeading.append(newSchedulePatient);
    newSchedulePanelNotes.append(newScheduleNotes);
    newSchedulePanel.append(newSchedulePanelHeading);
    newSchedulePanel.append(newSchedulePanelNotes);
    newSchedulePanel.data("schedule", schedule);
    return newSchedulePanel;
  }

  // This function figures out which schedule we want to delete and then calls deleteSchedule
  function handleScheduleDelete() {
    var currentSchedule = $(this)
      .parent()
      .parent()
      .data("schedule");
    deleteSchedule(currentSchedule.id);
  }

  // This function figures out which schedule we want to edit and takes it to the appropriate url
  function handleScheduleEdit() {
    var currentSchedule = $(this)
      .parent()
      .parent()
      .data("schedule");
    window.location.href = "/cms?schedule_id=" + currentSchedule.id;
  }

  // This function displays a messagae when there are no schedules
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Patient #" + id;
    }
    pillboxContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No schedules yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    pillboxContainer.append(messageh2);
  }

});
