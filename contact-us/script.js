//toggle bar
$(document).ready(function () {
  var baseUrl = 'https://dog.ceo/api/';
  $('.menu-icon').click(function(e){
    e.preventDefault();
    $('nav').toggleClass('open');
  });

  // get the jquery index page
  function getDog(type, baseUrl , makeCall){
    $.ajax({
      type: type,
      url: baseUrl,
      success: makeCall
    });
  }

  var makeCall = function(data){
    $('pre').html(JSON.stringify(data, null, 4));
    $('.dog-collection .img-breed').html('<img src=' + data.message + '>');
  }

  $('.get-muldog,.get-hound,.get-afghan-hound').click(function(){
    ('get-muldog' == $(this).attr('class')) ? getDog('GET', baseUrl+'breeds/image/random', makeCall) : (('get-afghan-hound' == $(this).attr('class')) ? getDog('GET', baseUrl+'breed/hound/afghan/images/random', makeCall) : getDog('GET', baseUrl+'breed/hound/images/random', makeCall));
  })

  $('#get-dog,.get-alldog').on ('click',function(){
  ('get-dog') == $(this).attr('id') ? getDog('GET', baseUrl+'breeds/image/random', makeCall) : getDog('GET', baseUrl+'breed/'+ $('.dog-selector').val()+'/images/random', dogFun);
  })

  var dogFun = function(data){ 
    $('.demo-image').html('<img src=' + data.message + '>')
  }

  $('.dog-selector').on('change', function(){
    getDog('GET', baseUrl+'breed/'+$('.dog-selector').val()+'/images/random', dogFun)
  });
  
  getDog('GET', baseUrl+'breeds/list/all', function(data){
    var breeds = data.message;
    var fidog = Object.keys(breeds)[0];
    $.each(breeds, function(dog){
      if (breeds[dog].length < 1){
        $('.dog-selector').append('<option value='+dog+'>'+ dog +'</option>');
      }
    });
    getDog('GET', baseUrl+'breed/' + fidog + '/images/random', function(data){
      $('.demo-image').append('<img src=' + data.message + '>');
    })
  });

  // by breed
  var commonImg = function(data){
    $(".random-pic").empty();
    $('random-click pre').html(JSON.stringify(data, null, 4));
    $.each(data.message, function (index, item) {
      $('.random-pic').append('<img src=' + item + '>');
    });
  }
  $('.get-dog-multiple,.get-hound-multiple,#getDataBtn').click(function(){
  ('getDataBtn' == $(this).attr('id')) ? getDog('GET', baseUrl+'breeds/list/all', houndFun) : getDog('GET', baseUrl+'breeds/image/random/3', commonImg)
  });
  
  // random page
  var houndFun = function(data){
    $('#hound-dog pre').html(JSON.stringify(data, null, 4));
  }

  getDog('GET', baseUrl+'breeds/image/random', makeCall);
  getDog('GET', baseUrl+'breed/'+'hound/images/random', makeCall)
  getDog('GET', baseUrl+'breeds/image/random/3', commonImg)
  getDog('GET', baseUrl+'breed/hound/afghan/images/random', makeCall)
  getDog('GET', baseUrl+'breed/hound/images/random/3', commonImg)
  getDog('GET', baseUrl+'breed/hound/images', houndFun);
  getDog('GET', baseUrl+'breed/hound/list', houndFun);
  getDog('GET', baseUrl+'breed/hound/afghan/images', houndFun);
}); 
