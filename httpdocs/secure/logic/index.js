firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {
            BindSchool(user.uid);
            $("#loginemail").empty();
            $("#loginemail").append(user.email);
            BindSummary(user.uid);
        }

    } else {
        // No user is signed in.
        window.location.replace('http://www.communic8a.co.za/index/login.htm');
    }
});

function logout() {
    firebase.auth().signOut()

   .then(function () {

   }, function (error) {
       console.log('Signout failed')
   });

}

function BindSchool(SchoolAuth) {
    var dvhide1 = document.getElementById("overlay");
    dvhide1.style.display = "block";
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/BindSchool",
        data: '{"SchoolAuth": "' + SchoolAuth + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindSchool,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessBindSchool(response) {
    var school = response.d;
    $(school).each(function () {
        $("#schoolname").append(this.Name);
        if (this.Logo === "") {
        } else {
            $("#imagePreview").attr("src", this.Logo);
        }
    });
}

function BindSummary(SchoolAuth) {
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/auth.svc/BindSummary",
        data: '{"SchoolAuth": "' + SchoolAuth + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindSummary,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessBindSummary(response) {
    var school = response.d;
    $(school).each(function () {
        $("#students").append(this.Students);
        $("#events").append(this.Events);
        $("#galleries").append(this.Galleries);
        $("#notifications").append(this.Notifications);
        if (this.Payments === "1") {
            $("#payments").append("Enabled");
        } else {
            $("#payments").append("Disabled");
        }
    });
    var dvhide1 = document.getElementById("overlay");
    dvhide1.style.display = "none";
}

function SendNotification() {
    $("#myNotify").modal("hide");
    var dvhide1 = document.getElementById("sendoverlay");
    dvhide1.style.display = "block";
    var user = firebase.auth().currentUser;
    var notify = escapeNewLineChars(document.getElementById('sendnotify').value);
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/notifications.svc/SendNotification",
        data: '{"Title": "' + document.getElementById('sendtitle').value + '", "Message": "' + notify + '", "SchoolAuth": "' + user.uid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessSendNotification,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessSendNotification(response) {
    alert(response.d)
    var dvhide1 = document.getElementById("sendoverlay");
    dvhide1.style.display = "none";
}

function escapeNewLineChars(valueToEscape) {
    if (valueToEscape != null && valueToEscape != "") {
        return valueToEscape.replace(/\n/g, "\\n");
    } else {
        return valueToEscape;
    }
}

function clearnotify() {
    document.getElementById('sendtitle').value = "";
    document.getElementById('sendnotify').value = "";
}