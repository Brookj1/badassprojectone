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

//If/else statement that watches for a change in the "checked" property of the two checkboxes, that have the "filled in" class
// $(".filled-in").change(function () {
//   //var state = $(this).attr('data-state');  //this probably needs to change, it's the data state from giphy homework
//   if ($(this).prop('checked')) {
//     console.log("Checked Box Selected");
//   } else {
//     console.log("Checked Box Deselect");
//   }
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
  var locQueryURL = "https://www.loc.gov/books/?q=" + searchTerm + "&fo=json&c=10";

  var openQueryURL = "http://openlibrary.org/search.json?q=" + searchTerm + "&limit=10";
  
  //function to run Open Library API call and populate
  function openLibAjax () {
    $.ajax({
      url: openQueryURL,
      method: "GET"
    }).then(function (response) {
      // var openResults = response.data;
      console.log(JSON.parse(response));
      var parseResponse = JSON.parse(response);
      console.log(parseResponse.docs);

      var results = parseResponse.docs;
      for (var i = 0; i < results.length; i++) {
        var newRow = $("<tr>")

        var cover = "https://covers.openlibrary.org/b/olid/" + results[i].cover_edition_key + ".jpg";
        var tdCover = $("<img>").attr("src", cover).css({ "width": "150px", "height": "200px" });
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

        $("tbody").append(newRow);
        $("tbody").append(tdCover);
        $("tbody").append(tdTitle);
        $("tbody").append(tdAuthor);
        $("tbody").append(tdPubDate);
      }
    });
  }

  //Function to run Library of congress API call 
  function libConAjax () {
    $.ajax({
      url: locQueryURL,
      method: "GET"
    }).then(function (response) {
      var locResults = response.featured_items;
      console.log(response);
      console.log(locResults);
    });
  }

  //If/else statements that run appropriate functions depending on the status of the checkboxes
  if ($("#openLib").prop("checked") && $("#libCon").prop("checked")) {
    openLibAjax();
    libConAjax();
  } else if ($("#openLib").prop("checked")){
    openLibAjax();
  } else if ($("#libCon").prop("checked")) {
   libConAjax();
  } 
})