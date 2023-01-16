var countries =[];
countries.push({countryid: 1, Name: 'India'});
countries.push({countryid: 2, Name: 'Pakistan'});
countries.push({countryid: 3, Name: 'China'});
var cities =[];
cities.push ({cityId: 1, countryid: 1, Name: 'Madhya Pradesh'}),
cities.push ({cityId: 2, countryid: 1, Name: 'Uttar Pradesh'}),
cities.push ({cityId: 3, countryid: 1, Name: 'Maharastra'}),
cities.push ({cityId: 4, countryid: 2, Name: 'Lahore'}),
cities.push ({cityId: 5, countryid: 2, Name: 'Karachi'}),
cities.push ({cityId: 6, countryid: 2, Name: 'Islamabad'}),
cities.push ({cityId: 7, countryid: 3, Name: 'Shanghai'}),
cities.push ({cityId: 8, countryid: 3, Name: 'Baijing'})
$(document).ready(function(){
        $("input[type='button']").click(function(){
            var radioValue = $("input[name='gender']:checked").val();
            if(radioValue){
                alert("Your are a - " + radioValue);
            }
        });
        var cmb1 = $("#counrty");
        var opt = $("<option>");
          opt.attr("value", "0");
          opt.text("--select--");
          cmb1.append(opt);
         for(var i = 0 ; i<countries.length; i++){
          var opt =$ ("<option>");
          opt.attr("value", countries[i].countryid);
          opt.text(countries[i].Name);
          cmb1.append(opt);
        }
        cmb1.change(function (e){
          var cmbState = $("#state");
          cmbState.find("option:not(:first)").remove();
         var cid = $(this).val();
         for(var i = 0 ; i<cities.length; i++){
          if(cities[i].countryid == cid){
            var opt =$ ("<option>");
            opt.attr("value", cities[i].cityId);
            opt.text(cities[i].Name);
            cmbState.append(opt);
          }
      }
   })
       
});
   
jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
 //form validation
 jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
$("#myform").validate({
  rules: {
    field: {
      required: true,
      range: [0, 100]
    },
    field1: {
      required: true,
      email: true
    },
  },
    submitHandler: function(form){
       form.submit();
        alert("successfully");
     }
});
//validate the contact number
var input = document.querySelector("#phone");
    window.intlTelInput(input, {
      utilsScript : "build/js/utils.js",
    });

//validate the name input
function validateName(){
  var name= $('#contact-name').val();
  var name_regex = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  if(name.length == 0)
      {   
          $('#name-error').text("Name is required");
          return false;
      }
    if(!name.match(name_regex)){
    var str= $('#name-error').text( "write full name");
    console.log(str)
    return false;
    }
    $('#name-error').text( 'valid');
    return true;
  }
//country section
function showheight(newvalue){
        let min=150;
        $('#slider_label').html(newvalue);
        //document.getElementById('slider_label1').innerHTML= min;
        }
function getVals(){
        // Get slider values
        let parent = this.parentNode;
        let slides = $("input[name='username']")
        let slide1 = parseInt( slides[0].value );
        let slide2 = parseInt( slides[1].value );
        // Neither slider will clip the other, so make sure we determine which is larger
        if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
         let displayElement = $(".rangeValues")[0];
            displayElement.innerHTML =  + slide1 
            let displayElement1 = $(".rangeValues1")[0];
            displayElement1.innerHTML =  + slide2 ;
      }
      window.onload = function(){
        // Initialize Sliders
        let sliderSections = $(".range-slider");
            for( let x = 0; x < sliderSections.length; x++ ){
              let sliders = $(sliderSections[x]).find("input");
              for( let y = 0; y < sliders.length; y++ ){
                if( sliders[y].type === "range" ){
                  sliders[y].oninput = getVals;
                  // Manually trigger event first time to display values
                  sliders[y].oninput();
                }
              }
            }
     }