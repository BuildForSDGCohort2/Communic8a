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

function authenticate(){

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

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
      
      var userEmail = document.getElementById("resetemail").value;

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
    var dvhide1 = document.getElementById("login");
    dvhide1.style.display = "none";
    var dvhide2 = document.getElementById("login1");
    dvhide2.style.display = "block";
    Clear();
}

   function loginuser() {
    var dvhide1 = document.getElementById("login");
    dvhide1.style.display = "block";
    var dvhide2 = document.getElementById("login1");
    dvhide2.style.display = "none";
    Clear();
}

function Clear() {
    document.getElementById('resetemail').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}

function create(){
   if($.trim($('#Text1').val()) == '' || $.trim($('#Text2').val()) == '' || $.trim($('#Text3').val()) == '' || $.trim($('#Text4').val()) == '' || $.trim($('#Text5').val()) == '' || $.trim($('#Text6').val()) == '' || $.trim($('#Text7').val()) == '' || $.trim($('#inlineFormCustomSelect').val()) == '' ){
      alert('Please complete all fields');
   }else{
   var dvhide1 = document.getElementById("overlay");
    dvhide1.style.display = "block";
   create_account();}
}

function create_account(){

  var userEmail = document.getElementById("Text1").value;
  var userPass = document.getElementById("Text2").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
  
  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  
}

function createprofile() {
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "https://www.bridgingnet.co.za/Services/Service.svc/RegisterCanidate",
        data: '{"name": "' + document.getElementById('Text3').value + '", "surname": "' + document.getElementById('Text4').value + '", "email": "' + user.email + '", "authid": "' + user.uid + '", "telephone": "' + document.getElementById('Text5').value + '", "sector": "' + document.getElementById('inlineFormCustomSelect').value + '", "citizenship": "' + document.getElementById('Text6').value + '", "idnumber": "' + document.getElementById('Text7').value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: function (a, b, c) {
            alert(a.responseText);},
        failure: function (response) {
            alert(response.d);
        }
        
    });
}

function OnSuccess(response) {
    alert(response.d);
    window.location.replace('http://www.communic8a.co.za/secure/index.htm');
}