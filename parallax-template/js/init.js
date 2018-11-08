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
// This one is for the loc API, this test works but when we tested it with the click event, it threw an error - not sure why
// var dplaQueryURL = "https://www.loc.gov/books/?q=" +
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
  var dplaQueryURL = "https://api.dp.la/v2/items?sourceResource.type=text&sourceResource.format=%22Electronic+resource%22&hasView&sourceResource.title=" +
    searchTerm + " &api_key=464064d20cce9184e65cf353572713b5";
   

  var openQueryURL = "http://openlibrary.org/search.json?q=" +
    searchTerm + "&limit=10"

  // if () {
  // }

  //ajax calls for each API and console logging results
  $.ajax({
    url: dplaQueryURL,
    method: "GET"
  }).then(function (response) {
    var dplaResults = response;
    // console.log(response);
    // console.log(dplaResults);

    
    var results = dplaResults.docs;
    for (var i = 0; i < results.length; i++) {
      var newRow = $("<tr>");
      // console.log(results[i]);


    var dplaCover;

    if (results[i].object) {
      dplaCover = results[i].object;
    } 
    else {
      dplaCover = "https://vignette.wikia.nocookie.net/darkseries/images/9/96/No_book_cover_lg.jpg/revision/latest?cb=20170826200421";
    }

    var tdCover = $("<img>").attr("src", dplaCover).css({"width": "150px", "height": "200px"});
      newRow.append(tdCover);

    var dplaTitle = results[i].sourceResource.title;
    var tdTitle = $("<td>").text(dplaTitle);
    newRow.append(tdTitle);

    var dplaAuthor = results[i].sourceResource.creator;
    var tdAuthor = $("<td>").text(dplaAuthor);
    newRow.append(tdAuthor);

    var dplaPubDate = results[i].sourceResource.date.begin;
    var tdPubDate = $("<td>").text(dplaPubDate);
    newRow.append(tdPubDate);

    var dplaCollection = "Digital Public Library of America";
    var tdCollection = $("<td>").text(dplaCollection);
    newRow.append(tdCollection);


    $("tbody").append(newRow);

    } 
  });

  $.ajax({
    url: openQueryURL,
    method: "GET"
  }).then(function (response) {
    // var openResults = response.data;
    // console.log(JSON.parse(response));
    var parseResponse = JSON.parse(response);
    console.log(parseResponse.docs);


    var results = parseResponse.docs;
    for (var i = 0; i < results.length; i++) {
      var newRow = $("<tr>")

      var cover;

    if (results[i].cover_edition_key) {
      cover = "https://covers.openlibrary.org/b/olid/" + results[i].cover_edition_key + ".jpg";
    } 
    else {
      cover = "https://vignette.wikia.nocookie.net/darkseries/images/9/96/No_book_cover_lg.jpg/revision/latest?cb=20170826200421";
    }

      // var cover = "https://covers.openlibrary.org/b/olid/" + results[i].cover_edition_key + ".jpg";
      var tdCover = $("<img>").attr("src", cover).css({"width": "150px", "height": "200px"});
      newRow.append(tdCover);

      var title = results[i].title;
      var tdTitle = $("<td>").text(title);
      // console.log("title", title);
      newRow.append(tdTitle);

      var author = results[i].author_name;
      var tdAuthor = $("<td>").text(author);
      console.log = ("author", author);
      newRow.append(tdAuthor);

      var pubDate = results[i].publish_year;
      var tdPubDate = $("<td>").text(pubDate);
      console.log = ("pubDate", pubDate);
      newRow.append(tdPubDate);

      var collection = "Open Library";
      var tdCollection = $("<td>").text(collection);
      newRow.append(tdCollection);

      $("tbody").append(newRow);
      $("tbody").append(tdCover);
      $("tbody").append(tdTitle);
      $("tbody").append(tdAuthor);
      $("tbody").append(tdPubDate);
      $("tbody").append(tdCollection);
    }
  });
})