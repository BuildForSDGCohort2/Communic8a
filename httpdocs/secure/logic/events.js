firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {
            BindSchool(user.uid);
            $("#loginemail").empty();
            $("#loginemail").append(user.email);
            binddates(user.uid);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            bindevents(today);

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
        error: function (response) {
            alert(response.d);
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


function bindevents(date) {
    var user = firebase.auth().currentUser;
    $("#event").html("");
    $("#event").html(date);
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/events.svc/BindEvents",
        data: '{"Date": "' + date + '", "SchoolAuth": "' + user.uid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindEvents,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessBindEvents(response) {
    if (!$.trim(response.d)) {
        $("#eventstable tr").remove();
        var row = '<tr><td>There are no events scheduled</td></tr>'
        $("#eventstable tbody").append(row);
        var dvhide1 = document.getElementById("overlay");
        dvhide1.style.display = "none";
    }
    else {
        $("#eventstable tr").remove();
        var actions =
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
        var table = $("#eventstable tbody").eq(0).clone(true);
        var customers = response.d;
        $("#eventstable tbody").eq(1).remove();
        var placeholder = "'img/event-placeholder-list.png'";
        $(customers).each(function () { var row = '<tr><td style="display: none;">' + this.EventId + '</td><td><div class="container-fluid"><div class="row"><div class="col-12 mt-3"><div class="card"><div class="card-horizontal"><div class="img-square-wrapper"><img height="200px" width="200px" class="" src="' + this.Poster + '" onerror="this.onerror=null;this.src=' + placeholder + ';"></div><div class="card-body"><h4 class="card-title">' + this.Title + '</h4><p class="card-text">' + this.Description + '</p></div></div><div class="card-footer"><small class="text-muted"> ' + actions + '</small></div></div></div></div></div></td></tr>'
            $("#eventstable tbody").append(row);
        });
        var dvhide1 = document.getElementById("overlay");
        dvhide1.style.display = "none";
    }
}

$(".add").click(function () {
    var dvhide2 = document.getElementById("eventsedit");
    dvhide2.style.display = "block";
    var dvhide3 = document.getElementById("createbutton");
    dvhide3.style.display = "block";
    var dvhide4 = document.getElementById("updatebutton");
    dvhide4.style.display = "none";
    Clear();
    var etop = $('#eventsedit').offset().top;
    $(window).scrollTop(etop);
    $(".add").attr('disabled', 'disabled');
});

function Clear() {
    document.getElementById('feLastName').value = "";
    document.getElementById('textarea2').value = "";
    document.getElementById('fePassword').value = "";
    document.getElementById('Text2').value = "";
    $('Img1').attr('src', '');
}




function binddates(SchoolAuth) {

    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/events.svc/BindDates",
        data: '{"SchoolAuth": "' + SchoolAuth + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindDates,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessBindDates(response) {
    var testing = response.d;
    $("#demo").zabuto_calendar({ data: testing,  action: function () { myDateFunction(this.id); } });
    }


    function myDateFunction(id) {
        var date = $("#" + id).data("date");
        //var hasEvent = $("#" + id).data("hasEvent");
        bindevents(date);
    };

    function CreateEvent() {
        if ($('#imgInput').get(0).files.length === 0) {
            Create();
        } else {
            CreateImage();
        }
    }

    function UpdateEvent() {
        if ($('#imgInput').get(0).files.length === 0) {
            Update();
        } else {
            UpdateImage();
        }
    }

    function Create() {
        var user = firebase.auth().currentUser;
        var descrip = escapeNewLineChars(document.getElementById('textarea2').value);
        $.ajax({
            type: "POST",
            url: "http://www.communic8a.co.za/events.svc/Create",
            data: '{"Title": "' + document.getElementById('feLastName').value + '", "Description": "' + descrip + '", "Date": "' + document.getElementById('fePassword').value + '", "Venue": "' + document.getElementById('Text2').value + '", "SchoolAuth": "' + user.uid + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessCreate,
            error: function (a, b, c) {
                alert(a.responseText);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    function OnSuccessCreate(response) {
        alert(response.d);
    }

    function CreateImage() {
        var images = $('#Img1').attr('src');
        var user = firebase.auth().currentUser;
        var descrip = escapeNewLineChars(document.getElementById('textarea2').value);
        $.ajax({
            type: "POST",
            url: "http://www.communic8a.co.za/events.svc/CreateImage",
            data: '{"Title": "' + document.getElementById('feLastName').value + '", "Description": "' + descrip + '", "Date": "' + document.getElementById('fePassword').value + '", "Venue": "' + document.getElementById('Text2').value + '", "Poster": "' + images + '", "SchoolAuth": "' + user.uid + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessCreateImage,
            error: function (a, b, c) {
                alert(a.responseText);
            },
            failure: function (response) {
                alert(response.d);
            }
        });

    }

    function OnSuccessCreateImage(response) {
        alert(response.d);
        Clear();
    }

    function Update(){
        var descrip = escapeNewLineChars(document.getElementById('textarea2').value);
        $.ajax({
            type: "POST",
            url: "http://www.communic8a.co.za/events.svc/Update",
            data: '{"EventId": "' + document.getElementById('Text1').value + '", "Title": "' + document.getElementById('feLastName').value + '", "Description": "' + descrip + '", "Date": "' + document.getElementById('fePassword').value + '", "Venue": "' + document.getElementById('Text2').value + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessUpdate,
            error: function (a, b, c) {
                alert(a.responseText);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    function OnSuccessUpdate(response) {
        alert(response.d);
        Clear();
        Cancel();
    }

    function UpdateImage() {
        var images = $('#Img1').attr('src');
        var descrip = escapeNewLineChars(document.getElementById('textarea2').value);
        $.ajax({
            type: "POST",
            url: "http://www.communic8a.co.za/events.svc/UpdateImage",
            data: '{"EventId": "' + document.getElementById('Text1').value + '", "Title": "' + document.getElementById('feLastName').value + '", "Description": "' + descrip + '", "Date": "' + document.getElementById('fePassword').value + '", "Venue": "' + document.getElementById('Text2').value + '", "Poster": "' + images + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessUpdateImage,
            error: function (a, b, c) {
                alert(a.responseText);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    function OnSuccessUpdateImage(response) {
        alert(response.d);
        Cancel();
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $('#Img1').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(document).ready(function () {
        $("#imgInput").change(function () {
            readURL(this);
        });
    });

    function escapeNewLineChars(valueToEscape) {
        if (valueToEscape != null && valueToEscape != "") {
            return valueToEscape.replace(/\n/g, "\\n");
        } else {
            return valueToEscape;
        }
    }

    function Cancel() {
        Clear();
        var dvhide1 = document.getElementById("eventsedit");
        dvhide1.style.display = "none";
        $(".add").removeAttr("disabled");
    }

    function edit(id) {
        document.getElementById('Text1').value = id;
        $.ajax({
            type: "POST",
            url: "http://www.communic8a.co.za/events.svc/Edit",
            data: '{"EventId": "' + id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessEdit,
            failure: function (response) {
                alert(response.d);
            },
            error: function (a, b, c) {
                alert(a.responseText);
            },
        });
    }

    function OnSuccessEdit(response) {
        Clear();
        var dvhide2 = document.getElementById("createbutton");
        dvhide2.style.display = "none";
        var dvhide2 = document.getElementById("eventsedit");
        dvhide2.style.display = "block";
        var dvhide2 = document.getElementById("updatebutton");
        dvhide2.style.display = "block";
        var etop = $('#eventsedit').offset().top;
        $(window).scrollTop(etop);
        $(".add").attr('disabled', 'disabled');
        var canidates = response.d;
        $(canidates).each(function () {
            document.getElementById('feLastName').value = this.Title;
            document.getElementById('textarea2').value = this.Description;
            document.getElementById('fePassword').value = this.Date;
            document.getElementById('Text2').value = this.Venue;
            if (this.Poster === "") {
            } else {
                $("#Img1").attr("src", this.Poster);
            }
        });
    }

    function Delete(id) {
        var user = firebase.auth().currentUser;
        $.ajax({
            type: "POST",
            url: "http://www.communic8a.co.za/events.svc/Delete",
            data: '{"EventId": "' + id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessDelete,
            error: function (a, b, c) {
                alert(a.responseText);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    function OnSuccessDelete(response) {
        alert(response.d);
    }

    $(function () {
        $("#fePassword").datepicker();
        autoclose: true
    });

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