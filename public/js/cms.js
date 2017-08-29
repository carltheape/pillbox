$(document).ready(function() {
  // Getting jQuery references to the schedule notes, medicine, form, and patient select
  var notesInput = $("#notes");
  var schedInput = $("#sched");
  var dosageInput = $("#dosage");
  var med_nameInput = $("#med_name");
  var cmsForm = $("#cms");
  var patientSelect = $("#patient");
  var rxurl="";
  var medCode = "";
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", api);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a schedule)
  var url = window.location.search;
  var scheduleId;
  var patientId;
  // Sets a flag for whether or not we're updating a schedule to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the schedule id from the url
  // In '?schedule_id=1', scheduleId is 1
  if (url.indexOf("?schedule_id=") !== -1) {
    scheduleId = url.split("=")[1];
    getScheduleData(scheduleId, "schedule");
  }
  // Otherwise if we have a patient_id in our url, preset the patient select box to be our Patient
  else if (url.indexOf("?patient_id=") !== -1) {
    patientId = url.split("=")[1];
  }

  // Getting the patients, and their schedules
  getPatients();

  function api(event, res){
    event.preventDefault();
    var drug = $("#med_name").val();
        var queryURL = "https://rximage.nlm.nih.gov/api/rximage/1/rxnav?name="+drug;


        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          calling = response;
          console.log(queryURL);
          rxurl = response.nlmRxImages["0"].imageUrl;
          medCode = response.nlmRxImages["0"].rxcui;
          // console.log(rxurl);
          handleFormSubmit();
  
});
        
        
    };

  // A function for handling what happens when the form to create a new schedule is submitted
  function handleFormSubmit() {
    console.log(rxurl);
    event.preventDefault();
    // Wont submit the schedule if we are missing a medicine, or patient
    if (!med_nameInput.val().trim() || !patientSelect.val()) {
      return;
    }
    // Constructing a newSchedule object to hand to the database
    var newSchedule = {
      img_link: rxurl,
      med_code: medCode,
      med_name: med_nameInput
        .val()
        .trim(),
      dosage: dosageInput
        .val()
        .trim(),
      sched: schedInput
        .val()
        .trim(),        
      notes: notesInput
        .val()
        .trim(),
      PatientId: patientSelect.val()
    };

    // If we're updating a schedule run updateSchedule to update a schedule
    // Otherwise run submitSchedule to create a whole new schedule.
    if (updating) {
      newSchedule.id = scheduleId;
      updateSchedule(newSchedule);
    }
    else {
      submitSchedule(newSchedule);
    }
  }

  // Submits a new schedule and brings user to pillbox page upon completion
  function submitSchedule(schedule) {
    $.post("/api/schedules", schedule, function() {
      window.location.href = "/pillbox";
    });
  }

  // Gets schedule data for the current schedule if we're editing, or if we're adding to an patient's existing schedules
  function getScheduleData(id, type) {
    var queryUrl;
    switch (type) {
      case "schedule":
        queryUrl = "/api/schedules/" + id;
        break;
      case "patient":
        queryUrl = "/api/patients/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.PatientId || data.id);
        // If this schedule exists, prefill our cms forms with its data
        med_nameInput.val(data.med_name);

        dosageInput.val(data.dosage);
        schedInput.val(data.sched);
                        
        notesInput.val(data.notes);
        patientId = data.PatientId || data.id;
        // If we have a schedule with this id, set a flag for us to know to update the schedule
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Patients and then render our list of Patients
  function getPatients() {
    $.get("/api/patients", renderPatientList);
  }
  // Function to either render a list of patients, or if there are none, direct the user to the page
  // to create an patient first
  function renderPatientList(data) {
    if (!data.length) {
      window.location.href = "/patients";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPatientRow(data[i]));
      console.log(data[i]);
    }
    patientSelect.empty();
    console.log("rowsToAdd: " + rowsToAdd);
    console.log("patientSelect: " + patientSelect);
    patientSelect.append(rowsToAdd);
    patientSelect.val(patientId);
  }

  // Creates the patient options in the dropdown
  function createPatientRow(patient) {
    var listOption = $("<option>");
    listOption.attr("value", patient.id);
    listOption.text(patient.name);
    return listOption;
  }

  // Update a given schedule, bring user to the pillbox page when done
  function updateSchedule(schedule) {
    $.ajax({
      method: "PUT",
      url: "/api/schedules",
      data: schedule
    })
    .done(function() {
      window.location.href = "/pillbox";
    });
  }
});
