$(document).ready(function() {
  // Getting references to the name inout and patient container, as well as the table body
  var nameInput = $("#patient-name");
  var patientList = $("tbody");
  var patientContainer = $(".patient-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // a Patient
  $(document).on("submit", "#patient-form", handlePatientFormSubmit);
  $(document).on("click", ".delete-patient", handleDeleteButtonPress);

  // Getting the intiial list of Patients
  getPatients();

  // A function to handle what happens when the form is submitted to create a new Patient
  function handlePatientFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertPatient function and passing in the value of the name input
    upsertPatient({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating a patient. Calls getPatients upon completion
  function upsertPatient(patientData) {
    $.post("/api/patients", patientData)
      .then(getPatients);
  }

  // Function for creating a new list row for patients
  function createPatientRow(patientData) {
    var newTr = $("<tr>");
    newTr.data("patient", patientData);
    newTr.append("<td>" + patientData.name + "</td>");
    // newTr.append("<td> " + patientData.Posts.length + "</td>");
    newTr.append("<td> " + patientData.Schedules.length + "</td>");
    newTr.append("<td><a href='/pillbox?patient_id=" + patientData.id + "'>Go to Schedules</a></td>");
    newTr.append("<td><a href='/cms?patient_id=" + patientData.id + "'>Create a Schedule</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-patient'>Delete Patient</a></td>");
    return newTr;
  }

  // Function for retrieving patients and getting them ready to be rendered to the page
  function getPatients() {
    $.get("/api/patients", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPatientRow(data[i]));
      }
      renderPatientList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of patients to the page
  function renderPatientList(rows) {
    patientList.children().not(":last").remove();
    patientContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      patientList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no patients
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create an Patient before you can create a Schedule.");
    patientContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("patient");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/patients/" + id
    })
    .done(getPatients);
  }
});
