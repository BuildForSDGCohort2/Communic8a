firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {
            BindSchool(user.uid);
            BindStudents(user.uid);
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

function BindStudents(SchoolAuth) {

    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/BindStudents",
        data: '{"SchoolAuth": "' + SchoolAuth + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindStudents,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessBindStudents(response) {
    var actions =
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
    var manage =
        '<a href="#" class="extram">Extra Murals</a><br />' +
        '<a href="#" class="capturep">Capture Payment/Fee</a><br />' +
        '<a href="#" class="state">Statement</a>';
    var table = $("#students tbody").eq(0).clone(true);
    var customers = response.d;
    $("#students tbody").eq(1).remove();
    $(customers).each(function () {
        var row = '<tr><td style="display: none;">' + this.AccountId + '</td> <td>' + this.Name + '</td><td>' + this.Surname + '</td><td>' + this.Class + '</td><td> ' + actions + '</td><td> ' + manage + '</td></tr>'
        $("#students tbody").append(row);
    });
    $('#students').DataTable();
    var dvhide1 = document.getElementById("overlay");
    dvhide1.style.display = "none";
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

$(document).ready(function () {

    $(document).on("click", ".extram", function () {
        var row = $(this).closest("tr");
        var id = row.find("td").html();
        BindEM(id);
    });
    $(document).on("click", ".capturep", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            var id = $(this).parents('tr').find("td:eq(0)").text();
            bindState(id);
        });
    });
    $(document).on("click", ".state", function () {
            var row = $(this).closest("tr");
            var id = row.find("td").html();
            BindStatement(id);
    });
    $(document).on("click", ".edit", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            var id = $(this).parents('tr').find("td:eq(0)").text();
            editaccount(id);
        });
    });
    $(document).on("click", ".delete", function () {
        if (confirm("Are you sure you want to delete this student account? This action is permanant and all student data will be deleted.")) {
            $(this).parents("tr").remove();
            var row = $(this).closest("tr");
            var id = row.find("td").html();
            deleteaccount(id);
        }
    });
    $(document).on("click", ".editEm", function () {
        var row = $(this).closest("tr");
        var id = row.find("td").html();
        editem(id);
    });
    $(document).on("click", ".deleteEm", function () {
        if (confirm("Are you sure you want to delete this extra mural activity from this student?")) {
            $(this).parents("tr").remove();
            var row = $(this).closest("tr");
            var id = row.find("td").html();
            deleteem(id);

        }
    });
});

$(function () {
    $("#dob").datepicker();
    autoclose: true
});

$(function () {
    $("#date").datepicker();
    autoclose: true
});

$(".add").click(function () {
    var dvhide1 = document.getElementById("studentsbind");
    dvhide1.style.display = "none";
    var dvhide2 = document.getElementById("student");
    dvhide2.style.display = "block";
    var dvhide3 = document.getElementById("createbutton");
    dvhide3.style.display = "block";
    var dvhide4 = document.getElementById("updatebutton");
    dvhide4.style.display = "none";
    Clear();

});

function addnew() {
    var dvhide1 = document.getElementById("emtable");
    dvhide1.style.display = "none";
    var dvhide2 = document.getElementById("emitem");
    dvhide2.style.display = "block";
    var dvhide3 = document.getElementById("Button1");
    dvhide3.style.display = "block";
    var dvhide4 = document.getElementById("Button2");
    dvhide4.style.display = "none";
    ClearEm();
}

function Clear() {
    document.getElementById('Text1').value = "";
    document.getElementById('Name').value = "";
    document.getElementById('Surname').value = "";
    document.getElementById('idnumber').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('Address').value = "";
    document.getElementById('Fees').value = "";
    document.getElementById('Number1').value = "";
    document.getElementById('Parent1').value = "";
    document.getElementById('ParentEmail1').value = "";
    document.getElementById('ParentNumber1').value = "";
    document.getElementById('Parent2').value = "";
    document.getElementById('ParentEmail2').value = "";
    document.getElementById('ParentNumber2').value = "";
    document.getElementById('Class').value = "";
    document.getElementById('StudentNumber').value = "";
}

function ClearEm() {
    document.getElementById('Text').value = "";
    document.getElementById('Text2').value = "";
    document.getElementById('Number2').value = "";
}

function Cancel() {
    var dvhide1 = document.getElementById("studentsbind");
    dvhide1.style.display = "block";
    var dvhide2 = document.getElementById("student");
    dvhide2.style.display = "none";
    var dvhide3 = document.getElementById("createbutton");
    dvhide3.style.display = "none";
    var dvhide4 = document.getElementById("updatebutton");
    dvhide4.style.display = "none";
    Clear();
}

function CancelEm() {
    var dvhide1 = document.getElementById("emtable");
    dvhide1.style.display = "block";
    var dvhide2 = document.getElementById("emitem");
    dvhide2.style.display = "none";
    var dvhide3 = document.getElementById("Button1");
    dvhide3.style.display = "none";
    var dvhide4 = document.getElementById("Button2");
    dvhide4.style.display = "none";
    ClearEm();
}

function Create() {
    var address = escapeNewLineChars(document.getElementById('Address').value);
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/Create",
        data: '{"Name": "' + document.getElementById('Name').value + '", "Surname": "' + document.getElementById('Surname').value + '", "IDNumber": "' + document.getElementById('idnumber').value + '", "Dob": "' + document.getElementById('dob').value + '", "Address": "' + address + '", "Fees": "' + document.getElementById('Fees').value + '", "PaymentDate": "' + document.getElementById('Number1').value + '", "Parent1": "' + document.getElementById('Parent1').value + '", "ParentEmail1": "' + document.getElementById('ParentEmail1').value + '", "ParentNumber1": "' + document.getElementById('ParentNumber1').value + '", "Parent2": "' + document.getElementById('Parent2').value + '", "ParentEmail2": "' + document.getElementById('ParentEmail2').value + '", "ParentNumber2": "' + document.getElementById('ParentNumber2').value + '", "Class": "' + document.getElementById('Class').value + '", "StudentNumber": "' + document.getElementById('StudentNumber').value + '", "SchoolAuth": "' + user.uid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCreate,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }

    });
}

function OnSuccessCreate(response) {
    var user = firebase.auth().currentUser;
    alert(response.d);
    $("#students tr").remove();
    $("#schoolname").append(this.Name);
    Cancel();
    BindSchool(user.uid);
    BindStudents(user.uid);
}

function escapeNewLineChars(valueToEscape) {
    if (valueToEscape != null && valueToEscape != "") {
        return valueToEscape.replace(/\n/g, "\\n");
    } else {
        return valueToEscape;
    }
}

function bindState(id) {
    $("#myModal2").modal("show");
    $("#Text5").on('blur change input', function () {
        $(this).val(function (i, input) {
            input = input.replace(/\D/g, '');
            return (input / 100).toFixed(2);
        });
    }).trigger('blur');
    document.getElementById('Text7').value = "";
    document.getElementById('Text7').value = id;
}


function BindEM(AccountId) {
   
    document.getElementById('Text4').value = "";
    document.getElementById('Text4').value = AccountId;

    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/BindEm",
        data: '{"AccountId": "' + AccountId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindEm,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessBindEm(response) {
    $("#myModal").modal("show");
    $("#Text2").on('blur change input', function () {
        $(this).val(function (i, input) {
            input = input.replace(/\D/g, '');
            return (input / 100).toFixed(2);
        });
    }).trigger('blur');

    var actions =
        '<a class="editEm" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="deleteEm" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
    var table = $("#Table1 tbody").eq(0).clone(true);
    var customers = response.d;
    $("#Table1 tbody").eq(1).remove();
    $(customers).each(function () {
        var row = '<tr><td style="display: none;">' + this.EmId + '</td> <td>' + this.Name + '</td><td> ' + actions + '</td></tr>'
        $("#Table1 tbody").append(row);
    });
}

function editaccount(id) {
    document.getElementById('Text1').value = id;

    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/Edit",
        data: '{"AccountId": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessEditAccount,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessEditAccount(response) {
    var dvhide1 = document.getElementById("studentsbind");
    dvhide1.style.display = "none";
    var dvhide2 = document.getElementById("student");
    dvhide2.style.display = "block";
    var dvhide3 = document.getElementById("createbutton");
    dvhide3.style.display = "none";
    var dvhide4 = document.getElementById("updatebutton");
    dvhide4.style.display = "block";

    var companies = response.d;
    $(companies).each(function () {

        document.getElementById('Name').value = this.Name;
        document.getElementById('Surname').value = this.Surname;
        document.getElementById('idnumber').value = this.IDNumber;
        document.getElementById('dob').value = this.Dob;
        document.getElementById('Address').value = this.Address;
        document.getElementById('Fees').value = this.SchoolFees;
        document.getElementById('Number1').value = this.PaymentDate;
        document.getElementById('Parent1').value = this.MothersName;
        document.getElementById('ParentEmail1').value = this.Email1;
        document.getElementById('ParentNumber1').value = this.Phone1;
        document.getElementById('Parent2').value = this.FathersName;
        document.getElementById('ParentEmail2').value = this.Email2;
        document.getElementById('ParentNumber2').value = this.Phone2;
        document.getElementById('Class').value = this.Class;
        document.getElementById('StudentNumber').value = this.StudentNumber;
    });
}

$("#Fees").on('blur change input', function () {
    $(this).val(function (i, input) {
        input = input.replace(/\D/g, '');
        return (input / 100).toFixed(2);
    });
}).trigger('blur');


function Update() {
    var address = escapeNewLineChars(document.getElementById('Address').value);
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/Update",
        data: '{"Name": "' + document.getElementById('Name').value + '", "Surname": "' + document.getElementById('Surname').value + '", "IDNumber": "' + document.getElementById('idnumber').value + '", "Dob": "' + document.getElementById('dob').value + '", "Address": "' + address + '", "Fees": "' + document.getElementById('Fees').value + '", "PaymentDate": "' + document.getElementById('Number1').value + '", "Parent1": "' + document.getElementById('Parent1').value + '", "ParentEmail1": "' + document.getElementById('ParentEmail1').value + '", "ParentNumber1": "' + document.getElementById('ParentNumber1').value + '", "Parent2": "' + document.getElementById('Parent2').value + '", "ParentEmail2": "' + document.getElementById('ParentEmail2').value + '", "ParentNumber2": "' + document.getElementById('ParentNumber2').value + '", "Class": "' + document.getElementById('Class').value + '", "StudentNumber": "' + document.getElementById('StudentNumber').value + '", "AccountId": "' + document.getElementById('Text1').value + '"}',
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
    var user = firebase.auth().currentUser;
    alert(response.d);
    Cancel();
    BindSchool(user.uid);
}

function deleteaccount(id) {
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/Delete",
        data: '{"AccountId": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDelete,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessDelete(response) {
    alert(response.d);
}

function editem(id) {
    document.getElementById('Text3').value = id;

    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/EditEm",
        data: '{"EmId": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessEditEm,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessEditEm(response) {
    var dvhide1 = document.getElementById("emtable");
    dvhide1.style.display = "none";
    var dvhide2 = document.getElementById("emitem");
    dvhide2.style.display = "block";
    var dvhide3 = document.getElementById("Button1");
    dvhide3.style.display = "none";
    var dvhide4 = document.getElementById("Button2");
    dvhide4.style.display = "block";

    var companies = response.d;
    $(companies).each(function () {

        document.getElementById('Text').value = this.Name;
        document.getElementById('Text2').value = this.Amount;
        document.getElementById('Number2').value = this.PaymentDate;
    });
}

function UpdateEm() {
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/UpdateEm",
        data: '{"Name": "' + document.getElementById('Text').value + '", "Amount": "' + document.getElementById('Text2').value + '", "PaymentDate": "' + document.getElementById('Number2').value + '", "EmId": "' + document.getElementById('Text3').value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessUpdateEm,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessUpdateEm(response) {
    alert(response.d);
    CancelEm();
    $("#myModal").modal("hide"); 

}

function deleteem(id) {
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/DeleteEm",
        data: '{"EmId": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDeleteEm,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessDeleteEm(response) {
    alert(response.d);
    CancelEm();
    $("#myModal").modal("hide");
}

function CreateEm() {
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/CreateEm",
        data: '{"Name": "' + document.getElementById('Text').value + '", "Amount": "' + document.getElementById('Text2').value + '", "PaymentDate": "' + document.getElementById('Number2').value + '", "AccountId": "' + document.getElementById('Text4').value + '", "SchoolAuth": "' + user.uid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCreateEm,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }

    });
}

function OnSuccessCreateEm(response) {
    var id = document.getElementById('Text4').value;
    alert(response.d);
    $("#Table1 tr").remove();
    CancelEm();
    BindEM(id);
}

function CreateTransact() {
    var user = firebase.auth().currentUser;
    var checked = $(".radiobutton:checked").val();
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/CreateTransact",
        data: '{"Description": "' + document.getElementById('Text6').value + '", "Allocation": "' + checked + '", "Amount": "' + document.getElementById('Text5').value + '", "AccountId": "' + document.getElementById('Text7').value + '", "SchoolAuth": "' + user.uid + '", "Date": "' + document.getElementById('date').value + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCreateTransact,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }

    });
}

function OnSuccessCreateTransact(response) {
    alert(response.d);
    $("#myModal2").modal("hide");
}

function BindStatement(AccountId) {

    document.getElementById('Text8').value = "";
    document.getElementById('Text8').value = AccountId;

    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/accounts.svc/BindStatement",
        data: '{"AccountId": "' + AccountId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessBindBindStatement,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessBindBindStatement(response) {
    $("#myModal3").modal("show");
    var actions =
        '<a class="editEm" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="deleteEm" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
    var table = $("#Table1 tbody").eq(0).clone(true);
    var customers = response.d;
    $("#Table2 tbody").eq(1).remove();
    $(customers).each(function () {
        var row = '<tr><td style="display: none;">' + this.StatementId + '</td><td>' + this.Date + '</td><td>' + this.Description + '</td><td> ' + this.Credit + '</td><td> ' + this.Debit + '</td></tr>'
        $("#Table2 tbody").append(row);
    });
}

function printDiv(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    var divElements2 = document.getElementById("heading").innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
              "<html><head>" + divElements2 + "<title></title></head><body>" +
              divElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;


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