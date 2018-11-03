function generateSearch() {

  var search = $(this).attr("data-name");
  var queryURL = "https://www.loc.gov/books/?q=" +
  search + "fo=json";
  
  (function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

  // Firebase information and initialization
  var config = {
    apiKey: "AIzaSyCREFeSA5eZ1W_Wg4Iw-8CJJfYAxPzzL70",
    authDomain: "dontforkthisup.firebaseapp.com",
    databaseURL: "https://dontforkthisup.firebaseio.com",
    projectId: "dontforkthisup",
    storageBucket: "dontforkthisup.appspot.com",
    messagingSenderId: "1092097473350"
  };
  firebase.initializeApp(config);
// end firebase

// event listener for the drop down search options
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$(document).ready(function(){
  $('select').formSelect();
});

var instance = M.FormSelect.getInstance(elem);

/* jQuery Method Calls
  You can still use the old jQuery plugin method calls.
  But you won't be able to access instance properties.

  $('select').formSelect('methodName');
  $('select').formSelect('methodName', paramName);
*/

instance.getSelectedValues();
// end drop downs
