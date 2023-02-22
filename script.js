$(document).ready(function(){
var keyUser = localStorage.getItem("getvalue");
$("#submit-form").click(function (e) {
  e.preventDefault();
  $.ajax({
    type: "get",
    url: "login.json",
    success: function (data) {
      var obj = { username: $("#username").val(), pass: $("#pass").val() };
      if (data.username == obj.username && data.password == obj.pass) {
        localStorage.setItem("getvalue", obj.username);
        window.location.href = 'index.html';
      } else {
        $("#name-error").text("username and password is not matched");
      }
    },
  });
});

 $('#pass').keyup(function(){
  var name = $("#pass").val();
  var name_regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?])^.{7,9}$";
  if (name.length == 0) {
    return $("#name-error").text("password is required");
  }if (!name.match(name_regex)) {
   return $("#name-error").text("Please fill valid password");
  }
  $("#name-error").text("Password format is valid");
})

$(".photo-box img, .close, .fa-thumbs-up").click(function () {
  ("close" == $(this).attr("class")) ? location.reload() : ("fa-thumbs-up" == $(this).attr("data-id")) ? $(".fa-thumbs-up").css("color", "blue") : $(".modal-body").html(`<img src=${$(this).attr("src")} width=470px>`);
});

$("#sign-user").click(function () {
  keyUser != null ? localStorage.removeItem("getvalue") : "Login";
});
keyUser != null ? $("#sign-user").html(`<button class="btn btn-primary mt-3">Logout</button>`) : false;
})