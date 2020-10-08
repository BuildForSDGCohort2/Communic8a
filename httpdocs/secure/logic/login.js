firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {
            window.location.replace('http://www.communic8a.co.za/secure/index.htm');
        }

    } else {
        // No user is signed in.
    }
});

function login(){

  var userEmail = document.getElementById("LoginEmail").value;
  var userPass = document.getElementById("LoginPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  
  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  
}

function send_passwordreset() {
      //var user = firebase.auth().currentUser;
      //var email = user.email;
      
      var userEmail = document.getElementById("ResetEmail").value;

      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

    function reset() {
    var dvhide1 = document.getElementById("loginform");
    dvhide1.style.display = "none";
    var dvhide2 = document.getElementById("resetform");
    dvhide2.style.display = "block";
    Clear();
}

   function loginuser() {
    var dvhide1 = document.getElementById("loginform");
    dvhide1.style.display = "block";
    var dvhide2 = document.getElementById("resetform");
    dvhide2.style.display = "none";
    Clear();
}

function Clear() {
    document.getElementById('LoginEmail').value = "";
    document.getElementById('LoginPassword').value = "";
    document.getElementById('ResetEmail').value = "";
}