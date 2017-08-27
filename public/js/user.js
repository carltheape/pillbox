$(document).ready(function() {
var mailInput = $("#form-email");
var passInput = $("#form-password");

 $(document).on("submit", "#reg", handlePatientFormSubmit);

   function handlePatientFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    // Calling the upsertPatient function and passing in the value of the name input
    insertUser({
      email: mailInput.val(),
      password: passInput.val()
    });
  };

    function insertUser(userData) {
    $.post("/api/users", userData)
  }

});