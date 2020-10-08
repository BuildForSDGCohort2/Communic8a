firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {
            BindProfile(user.uid);
            $("#loginemail").empty();
            $("#loginemail").append(user.email);
          

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

function BindProfile(SchoolAuth) {
    var dvhide1 = document.getElementById("overlay");
    dvhide1.style.display = "block";
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/auth.svc/BindProfile",
        data: '{"SchoolAuth": "' + SchoolAuth + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindProfile,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessBindProfile(response) {
    var school = response.d;
    $(school).each(function () {
        document.getElementById('feFirstName').value = this.Name;
        document.getElementById('fePassword').value = this.Phone;
        document.getElementById('feEmailAddress').value = this.Email;
        document.getElementById('textarea1').value = this.Address;
        document.getElementById('feLastName').value = this.Website;
        document.getElementById('Text1').value = this.MerchantId;
        if (this.Logo === "") {
        } else {
            $("#imagePreview").attr("src", this.Logo);
        }
    });
    var dvhide1 = document.getElementById("overlay");
    dvhide1.style.display = "none";
}

$(document).ready(function () {
    $("#imgInput").change(function () {
        readURL(this);
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            $('#imagePreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function DeleteLogo() {
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/auth.svc/DeleteLogo",
        data: '{"SchoolAuth": "' + SchoolAuth + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessSave

    });
}

function OnSuccessSave(response) {
    var placeholder = "img/logo-placeholder-generic.200x200.png";
    $("#imagePreview").attr("src", placeholder);
}

function UpdateProfile() {
    if ($('#imgInput').get(0).files.length === 0) {
        Update();
    } else {
        UpdateImage();
    }
}

function Update() {
    var address = escapeNewLineChars(document.getElementById('textarea1').value);
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/auth.svc/Update",
        data: '{"Name": "' + document.getElementById('feFirstName').value + '", "Website": "' + document.getElementById('feLastName').value + '", "Email": "' + document.getElementById('feEmailAddress').value + '", "Phone": "' + document.getElementById('fePassword').value + '", "Address": "' + address + '", "MerchantId": "' + document.getElementById('Text1').value + '", "SchoolAuth": "' + user.uid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessUpdate,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}
function OnSuccessUpdate(response) {
    alert(response.d);
    window.location.reload(false);
}

function UpdateImage() {
    var address = escapeNewLineChars(document.getElementById('textarea1').value);
    var images = $('#imagePreview').attr('src');
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/auth.svc/UpdateImage",
        data: '{"Name": "' + document.getElementById('feFirstName').value + '", "Website": "' + document.getElementById('feLastName').value + '", "Email": "' + document.getElementById('feEmailAddress').value + '", "Phone": "' + document.getElementById('fePassword').value + '", "Address": "' + address + '", "MerchantId": "' + document.getElementById('Text1').value + '", "SchoolAuth": "' + user.uid + '", "Logo": "' + images + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessUpdateImage,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}
function OnSuccessUpdateImage(response) {
    alert(response.d);
    window.location.reload(false);
}

function escapeNewLineChars(valueToEscape) {
    if (valueToEscape != null && valueToEscape != "") {
        return valueToEscape.replace(/\n/g, "\\n");
    } else {
        return valueToEscape;
    }
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


function clearnotify() {
    document.getElementById('sendtitle').value = "";
    document.getElementById('sendnotify').value = "";
}



