firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {
            BindSchool(user.uid);
            bindalbums(user.uid);
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

function bindalbums(date) {
    var user = firebase.auth().currentUser;
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/gallery.svc/BindAlbums",
        data: '{"SchoolAuth": "' + user.uid + '"}',
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
        $("#albums tr").remove();
        var row = '<tr><td>There are no albums</td></tr>'
        $("#albums tbody").append(row);
        var dvhide1 = document.getElementById("overlay");
        dvhide1.style.display = "none";
    }
    else {
        $("#albums tr").remove();
        var actions =
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
        var table = $("#albums tbody").eq(0).clone(true);
        var customers = response.d;
        $("#albums tbody").eq(1).remove();
        var placeholder = "'img/picture.png'";
        $(customers).each(function () {
            var row = '<tr><td style="display: none;">' + this.AlbumId + '</td><td><img border="3" height="64" width="64" src=' + placeholder + '"></img></td><td><div style="font-weight: bold">' + this.Name + '</div><br /><span>' + this.Date + '<span></td><td> ' + actions + '</td></tr>'
            $("#albums tbody").append(row);
        });
        var dvhide1 = document.getElementById("overlay");
        dvhide1.style.display = "none";
    }
}

$(".add").click(function () {
    var dvhide2 = document.getElementById("galleries");
    dvhide2.style.display = "none";
    var dvhide2 = document.getElementById("gallery");
    dvhide2.style.display = "block";

    var etop = $('#gallery').offset().top;
    $(window).scrollTop(etop);
    $(".add").attr('disabled', 'disabled');
});

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function initialize(id, date){
        var albumname = document.getElementById('Text1').value;
        var user = firebase.auth().currentUser;
        $("#dZUpload").dropzone({
            url: '../upload.ashx?id=' + id + '&auth='+ user.uid +'&name='+ albumname +'&date='+ date +'',
            maxFiles: 25,
            addRemoveLinks: true,
            success: function (file, response) {
                var imgName = response;
                file.previewElement.classList.add("dz-success");
                console.log("Successfully uploaded :" + imgName);
                update(id, albumname);
            },
            error: function (file, response) {
                file.previewElement.classList.add("dz-error");
            }
        });    
}

Dropzone.autoDiscover = false;

$(document).ready(function(){
   $(document).on("click", ".edit", function () {
            var row = $(this).closest("tr");
            var id = row.find("td").html();
            var name =  $(this).parents('tr').find("div").text();
            var albumdate = $(this).parents('tr').find("span").text();
            edit(id, name, albumdate);
        });
   $(document).on("click", ".delete", function () {
        if (confirm("Are you sure you want to delete this album")) {
            $(this).parents("tr").remove();
            var row = $(this).closest("tr");
            var id = row.find("td").html();
            deletealbum(id);
        }
        });
    $(document).on("click", ".wrapper", function () {
           // $(this).parents("div").remove();
            var row = $(this).closest("div");
            var id = row.find("img").attr("alt");
            row.remove();
            deletephoto(id);
        });
});

$('#Text1').on('keypress', function (e) {
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr('readonly', true);
             e.preventDefault(e);
             var today = new Date();
             var dd = String(today.getDate()).padStart(2, '0');
             var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
             var yyyy = today.getFullYear();

             today = yyyy + '-' + mm + '-' + dd;
             initialize(uuidv4(), today);
             var dvhide3 = document.getElementById("dZUpload");
             dvhide3.style.display = "block";
             
         }
   });

   function closealbum(){
   $('#Text1').attr('readonly', false);
   $(".add").removeAttr('disabled');
   var dvhide2 = document.getElementById("galleries");
    dvhide2.style.display = "block";
    var dvhide2 = document.getElementById("gallery");
    dvhide2.style.display = "none";
    var dvhide3 = document.getElementById("dZUpload");
    dvhide3.style.display = "none";
    Dropzone.forElement("#dZUpload").destroy();
   }

   function edit(id, name, date){
      document.getElementById('Text1').value = name;
      $('#Text1').attr('readonly', true);
      
      initialize(id, date);
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/gallery.svc/BindPhotos",
        data: '{"Id": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessEdit,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessEdit(response) {
    $('#preview').html('');
    var dvhide2 = document.getElementById("galleries");
    dvhide2.style.display = "none";
    var dvhide2 = document.getElementById("gallery");
    dvhide2.style.display = "block";
    var dvhide2 = document.getElementById("dZUpload");
    dvhide2.style.display = "block";
    var etop = $('#gallery').offset().top;
    
    
    $(window).scrollTop(etop);
    $(".add").attr('disabled', 'disabled');

    var companies = response.d;
    $(companies).each(function () {

        var photo = '<div class="wrapper"><img style="margin: 10px" src=' + this.Url + ' alt=' + this.AlbumId + ' height="150" width="150"/><span class="close"></span></div>';
        $('#preview').append(photo);
        
    });
}

function deletephoto(id){
$.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/gallery.svc/Delete",
        data: '{"AlbumId": "' + id + '"}',
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
}

function update(id, name){
      document.getElementById('Text1').value = name;
      $('#Text1').attr('readonly', true);
    $.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/gallery.svc/BindPhotos",
        data: '{"Id": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessUpdate,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccessUpdate(response) {
    $('#preview').html('');
    
    var companies = response.d;
    $(companies).each(function () {

        var photo = '<div class="wrapper"><img style="margin: 10px" src=' + this.Url + ' alt=' + this.AlbumId + ' height="150" width="150"/><span class="close"></span></div>';
        $('#preview').append(photo);
        
    });
}

function deletealbum(id){
$.ajax({
        type: "POST",
        url: "http://www.communic8a.co.za/gallery.svc/DeleteAlbum",
        data: '{"Id": "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDeleteAlbum,
        failure: function (response) {
            alert(response.d);
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccessDeleteAlbum(response) {
alert(response.d)
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