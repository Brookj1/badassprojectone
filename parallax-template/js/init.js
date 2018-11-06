(function ($) {
  $(function () {

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

var database = firebase.database();
// end firebase

// // event listener for the drop down search options
// document.addEventListener('DOMContentLoaded', function () {
//   var elems = document.querySelectorAll('select');
//   var instances = M.FormSelect.init(elems, options);
// });

// // Or with jQuery

// $(document).ready(function () {
//   $('select').formSelect();
// });

// var instance = M.FormSelect.getInstance(elem);

// /* jQuery Method Calls
//   You can still use the old jQuery plugin method calls.
//   But you won't be able to access instance properties.

//   $('select').formSelect('methodName');
//   $('select').formSelect('methodName', paramName);
// */

// instance.getSelectedValues();
// // end drop downs

// Testing the API calls
// This one is for the LoC API, this test works but when we tested it with the click event, it threw an error - not sure why
// var locQueryURL = "https://www.loc.gov/books/?q=" +
// "Gunslinger" + "&fo=json";

// $.ajax({
//   url: locQueryURL,
//   method: "GET"
// }).then(function (response) {
//   var locResults = response.featured_items;
//   console.log(locResults);
//   console.log(response);
// });

// open library API call, this returns an object that doesn't look like it's in JSON
// var openQueryURL = "http://openlibrary.org/search.json?q=harry+potter";

// $.ajax({
//   url: openQueryURL,
//   method: "GET"
// }).then(function (response) {
//   // var openResults = response.data;
//   console.log(response);
// });

//event listener for when someone hits the submit button that run ajax calls and pushes information to database
$("#submitBtn").on("click", function (event) {
  event.preventDefault();

  //pulls input from the search field and stores in a variable
  var searchTerm = $("#autocomplete-input").val().trim();

  //pushes to database
  database.ref().push({
    searchTerm: searchTerm
  })

  //URLs to use in ajax calls
  var locQueryURL = "https://www.loc.gov/books/?q=" +
    searchTerm + "&fo=json";

  var openQueryURL = "http://openlibrary.org/search.json?q=" +
    searchTerm;

  // if () {
  // }

  //ajax calls for each API and console logging results
  $.ajax({
    url: locQueryURL,
    method: "GET"
  }).then(function (response) {
    var locResults = response.featured_items;
    console.log(response);
    console.log(locResults);
  });

  $.ajax({
    url: openQueryURL,
    method: "GET"
  }).then(function (response) {
    // var openResults = response.data;
    console.log(response);
  });
})
// $("tbody").append("<tr><td>" +  + "</td><td>" +  + "</td><td>" +  + "</td><td>" +  + "</td><td>" +  + "</td><>tr>");
