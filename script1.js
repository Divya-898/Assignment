$(document).ready(function () {
  var baseUrl = 'https://fakestoreapi.com/products';
  var keyId = localStorage.getItem('id');
  var keyUser = localStorage.getItem('getvalue');
  var loginUrl = 'https://fakestoreapi.com/users';
  var loader = $(".loader-row").removeClass("d-none");


  function makeCall(type, baseUrl, wrapperCall , data) {
    $.ajax({
      type: type,
      url: baseUrl,
      data: data,
     // beforeSend:loader,
      success: wrapperCall,
    });
  }
  
  wrapperCall = function (response) {
    getProducts(response);
    listData = `<tr><th>Id:</th>`;
    listData += `<th>Title:</th>`;
    listData += `<th class="tbl-head">Action:</th>`;
    listData += `<th></th></tr>`;
    $('.product-data').append(listData);
    $.each(response ,function(key ,value) {
      var tblProduct = `<tr><td>${value.id}</td>`;
      tblProduct += `<td>${value.title}</td>`;
      tblProduct += `<td><button type="button" class=" btn btn-primary edit-btn" data-id="${value.id}">UPDATE</button></td>`;
      tblProduct += `<td><button type="button" class=" btn btn-danger delete-btn" data-type="${value.id}">DELETE</button></td><tr>`;
      $('.product-wrap').append(tblProduct);
    })

    $('.edit-btn').click(function () {
      var productData = $(this).attr('data-id');
       toggleModal($('#update-modal'), true)
        toggleModal($('#update-modal'), true)
      $('#edit-items input').val("");
      var productUrl = baseUrl + '/' + productData; 
      var productFun = function (response) {
        $('#edit-title').val(response.title);
        $('#edit-price').val(response.price);
        $('#edit-description').val(response.description);
        $('#edit-img').val(response.image);
        $('#category-dropdown').append($(`<option>${response.category}</option>`))
      };

      $('#update-form').click(function () {
       makeCall('PUT', productUrl, function updateFun(){
        toggleModal($('#list-modal'), true)==true? toggleModal($('#list-modal'), true):toggleModal($('#update-modal'), false) || $('#modal-section').html(`<p>Item has been updated successfully</p>`);
       }, null);
      });
      makeCall('GET', productUrl, productFun, null);
    });

    $('.delete-btn, #denied-btn').click(function () {
      var deleteId = $(this).attr('data-type');
      ('denied-btn' == $(this).attr('id')) ? toggleModal($('#delete-modal'),false) || location.reload(): toggleModal($('#delete-modal'),true) 
      var deleteUrl = baseUrl + '/' + deleteId;
      $('#confirm-btn').click(function () {
       var deleteFun = toggleModal($('#confirm-modal'),true) == true ? toggleModal($('#confirm-modal'),true) && toggleModal($('#delete-modal'),false) :toggleModal($('#delete-modal'),false);
        makeCall('DELETE', deleteUrl, deleteFun, null);
      })
    });
  }

  //update a product
  function getUrl(index, urlData) {
    urlData += `<div> <div class="product-img"><img src='${index.image}'></div>`;
    urlData += `<p><b>Title: </b>${index.title}</p>`;
    urlData += `<p><b>Price: </b>${index.price}</p>`;
    urlData += `<p><b>Description:</b></p><q>${index.description}</q><p>`;
    urlData += `<p><b>Rate: </b>${index.rating.rate}</p>`;
    urlData += `<p><b>Count: </b>${index.rating.count}</p></div></div>`;
    return urlData;
  }

  function getProducts(response) {
    for (let i = 0; i < response.length; i++) {
      let index = response[i];
      var urlData = `<div class="main-content"  data-type="${[i]}" data-toggle="modal" data-target="#small-Modal"> `;
      $('.maintain').append(getUrl(index, urlData));
    }
    $('.main-content').click(function () {
      var tempData = $(this).attr('data-type');
      let index = response[tempData];
      var urlData = `<div class="main-content">`;
      urlData = `<button type="button" id="btn-list" class="btn-primary">show</button>`
      $('.modal-wrapper').html(getUrl(index, urlData));
    });
  }

  $(document).on('dblclick', '#btn-list,.dropdown', function(){ 
    ('dropdown' == $(this).attr('class')) ? $('.dropdown-menu').toggle() :alert('Modal is open to here');
  });
  
  $('#admin-modal, .main-content, .close , #btn-submit').click(function (e) {
   ('admin-modal'==$(this).attr('id')) ? toggleModal($('#new-modal'), true): ('close' == $(this).attr('class'))? toggleModal($('.modal'),false) || location.reload() :toggleModal($('#small-Modal'), true);
   ('btn-submit' == $(this).attr('id')) ? makeCall('GET', loginUrl,  loginUser) :false;
  });

  function toggleModal(modalId, show) {
    show == true ? modalId.show() : modalId.hide();
  }

  //categoriesurl
  var categoryUrl = baseUrl + '/categories';
  makeCall('GET', categoryUrl, function categoryFun(response){
   $.each(response, function(key, value) {
      $('.product-items').append(`<div class="product-list" data-id="${value}">${value}</div>`);
      $('#dropdown-list').append($(`<option>${value}</option>`));
    })
    $('.product-items .product-list,.dropdown-item,.product-limit').dblclick(function () {
      $('.maintain').empty();
      var limitProducts = $('.product-limit').val();
      toggleModal($('.sign-content'),true == true) ? toggleModal($('.sign-content'),true): toggleModal($('#main-box'),false) || toggleModal($(".outer-wrapper"), false);
      var getData = $(this).attr('data-id');
      var getUrl = baseUrl+ '/category/' + getData;
      var navFun = function (response) {
         getProducts(response);
        };
     ('product-limit' == $(this).attr('class')) ? makeCall('GET', baseUrl+ `?limit=${limitProducts}`, navFun, null): ('product-list' == $(this).attr('class'))?makeCall('GET', getUrl, navFun):makeCall('GET', baseUrl+ `?sort=${getData}`, navFun, null);
    });
  }, null);

  var loginUser =function (response) {
      $('#signin-form').valid();
    for (var i = 0; i < response.length; i++) {
      var obj = { username: $('#username').val(), pass: $('#pass').val(), responseId : response[i].id };
      if (response[i].username == obj.username && response[i].password == obj.pass) {
        localStorage.setItem('getvalue', obj.username);
        localStorage.setItem('id', obj.responseId);
        window.location.href = 'wishlist.html';
      } 
      else if (response[i].username != obj.username && response[i].password == obj.pass) {
        $('.error-message').html('Please enter a valid user');
      } 
      else if (response[i].username == obj.username && response[i].password != obj.pass) {
        $('.error-message').html('Please enter a valid password');
      }
    }
  }

  //cart section
  var cartUrl = 'https://fakestoreapi.com/carts/user/' + keyId;
  makeCall('GET', cartUrl,  function cartFun(response) {
    $(".loader-row").addClass("d-none");
    tblData = `<tr><th>UserID: ${response[0].userId}</th>`;
    tblData += `<th>Date: ${response[0].date}</th></tr>`;
    tblData += `<tr><th>ProductId</th>`;
    tblData += `<th>Quantity</th></tr>`;
    $('.cart-data').append(tblData);
    for (let i = 0; i < response.length; i++) {
      var list = response[i].products;
      for (let j = 0; j < list.length; j++) {
        var tblProduct = `<tr><td>${list[j].productId}</td>`;
        tblProduct += `<td>${list[j].quantity}</td><tr>`;
        $('.cart-wrap').append(tblProduct);
      }
    }
  },null)

  $('#sign-user').click(function () {
    (keyUser!= null) ? localStorage.removeItem('getvalue') : 'Login' ;
  });
  (keyUser!= null) ? $('#result').html(keyUser) && $('#sign-user').html('Logout') : false

  //wishlist
  $('#bag-info, #wishlist-container ,.admin-section').click(function(){
    mainNavigation = ('bag-info' == $(this).attr('id')) ? 'cart.html' : ('admin-section' == $(this).attr('class') ? 'admin.html' : 'wishlist.html');
    window.open(!keyUser ? 'signin.html' : mainNavigation, '_self');
  })

  $('#submit-form').click(function (event) {
    event.preventDefault();
    data = $('#register').serialize();
     $('#register').valid() ? makeCall('POST', baseUrl, function addProduct(){
      toggleModal($('#list-modal'), true) == true ? toggleModal($('#list-modal'), true) : toggleModal($('#new-modal'), false)|| $('#modal-section').html('<p>Item has been added</p>') ;
     }, data):false;
   });

  $('.form-validation').validate({
    rules: {
      title: 'required',
      description: 'required',
      price: 'required',
      categoryImg: 'required',
      item: 'required',
      username: 'required',
      pass: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      title: 'Title must be required',
      description: 'Description must be required',
      price: 'Price must be required',
      categoryImg: 'Image must be required',
      item: 'Category must be required',
      username: 'Username must be required',
      pass: {
        required: 'Password must be required',
        minlength: 'Please enter at least 5 character',
      },
    },
  });
  makeCall('GET', baseUrl, wrapperCall, loader);
 });

 