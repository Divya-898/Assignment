$(document).ready(function(){
  var keyUser = localStorage.getItem('getvalue');
  $('#submit-form').click(function (e){
    e.preventDefault();
    $.ajax({
      type: 'get',
      url: 'login.json',
      success: function (data) {
        var obj = { username: $('#username').val(), pass: $('#pass').val() };
      for(var i=0 ; i<data.length ; i++){ 
        if (data[i].username == obj.username && data[i].password == obj.pass) {
          localStorage.setItem('getvalue', obj.username);
          window.location.href = 'index.html';
        }  else if (data[i].username != obj.username && data[i].password == obj.pass) {
          $('#name-error').html('Please enter a valid username and password');
        } 
        else if (data[i].username == obj.username && data[i].password != obj.pass) {
          $('#name-error').html('Please enter a valid password');
        }
        else if (obj.username == '' ||  obj.pass == '') {
          $('#name-error').html('Please enter a username and password');
        }
        }}
    });
  });

  $('#pass').keyup(function(){
    var name = $("#pass").val();
    var name_regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?])^.{7,9}$";
    if (!name.match(name_regex)) {
    return $('#name-error').text('Please fill valid password');
    }
    $('#name-error').text('Password format is valid');
  })

  $('.close, #fa-thumbs-up').click(function(){
    ("fa-thumbs-up" == $(this).attr("id")) ? $(this).toggleClass('fa-thumbs') : location.reload(); 
  });

  $('#sign-user').click(function(){
    keyUser != null ? localStorage.removeItem('getvalue') : 'Login';
  });
  keyUser != null ? ($('#sign-user')).html(`<button class="btn btn-primary mt-3">Logout</button>`) &&  $('.profile-name h3, .story-img h3').html(keyUser) : false;

  $('.photo-box .test-popup-link').magnificPopup({
    type:'image',
    gallery: {
      enabled: true
    }
  });

  $('#fa-share,#share-img').click(function(e){
  ('fa-share' == $(this).attr('id')) ? $('.share-img').counterUp() : $('.share-info').counterUp();
  })
})


  

