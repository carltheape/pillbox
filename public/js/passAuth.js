$(document).ready(function() {



var password = document.getElementById("form-password")
  , confirm_password = document.getElementById("form-passwordrep");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

});