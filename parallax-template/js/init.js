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

//event listener for when someone hits the submit button that run ajax calls and pushes information to database
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  $("tbody").empty();

  if ($("#autocomplete-input").val() === "") {
    $(".input-field").addClass("teal pulse")
  } else {
    //pulls input from the search field and stores in a variable
    $(".input-field").removeClass("teal pulse");
    var searchTerm = $("#autocomplete-input").val().trim();
    $("#autocomplete-input").val("");

    //pushes to database
    database.ref().push({
      searchTerm: searchTerm
    })

    //URLs to use in ajax calls
    var dplaQueryURL = "https://api.dp.la/v2/items?sourceResource.type=text&sourceResource.format=%22Electronic+resource%22&hasView&sourceResource.title=" + searchTerm + " &api_key=464064d20cce9184e65cf353572713b5";

    var openQueryURL = "http://openlibrary.org/search.json?title=" + searchTerm + "&limit=10";

    //function to run Open Library API call and populate
    function openLibAjax() {
      $.ajax({
        url: openQueryURL,
        method: "GET"
      }).then(function (response) {
        // var openResults = response.data;
        // console.log(JSON.parse(response));

        var parseResponse = JSON.parse(response);
        // console.log(parseResponse.docs);  

        var results = parseResponse.docs;
        for (var i = 0; i < results.length; i++) {
          var newRow = $("<tr>");
          var cover;

          var title = results[i].title;
          var tdTitle = $("<td>").text(title);
          // console.log("title", title);
          newRow.append(tdTitle);

          var author = results[i].author_name;
          var tdAuthor = $("<td>").text(author);
          // console.log = ("author", author);
          newRow.append(tdAuthor);

          var collection = "Open Library";
          var tdCollection = $("<td>").text(collection);
          newRow.append(tdCollection);

          if (results[i].cover_edition_key) {
            cover = "https://covers.openlibrary.org/b/olid/" + results[i].cover_edition_key + ".jpg";
          } else {
            cover = "https://vignette.wikia.nocookie.net/darkseries/images/9/96/No_book_cover_lg.jpg/revision/latest?cb=20170826200421";
          }
          // var cover = "https://covers.openlibrary.org/b/olid/" + results[i].cover_edition_key + ".jpg";
          var tdCover = $("<img>").attr("src", cover).css({ "width": "150px", "height": "200px" });
          newRow.append(tdCover);

          $("tbody").append(newRow);
        }
      });
    };

    //Function to run Dig Pub API call 
    function digPubAjax() {
      $.ajax({
        url: dplaQueryURL,
        method: "GET"
      }).then(function (response) {
        // console.log("This function worked");
        var dplaResults = response;
        // console.log(response);
        // console.log(dplaResults);

        if (response.count === 0) {
          $(".noResults").html("<p>No results found in Digital Public Library of America</p>").css({ "font-size": "18px" });
        } else {
          var results = dplaResults.docs;
          for (var i = 0; i < results.length; i++) {
            var newRow = $("<tr>");
            // console.log(results[i]);

            var dplaCover;

            var dplaTitle = results[i].sourceResource.title;
            var tdTitle = $("<td>").text(dplaTitle);
            newRow.append(tdTitle);

            if (results[i].object) {
              dplaCover = results[i].object;
            } else {
              dplaCover = "https://vignette.wikia.nocookie.net/darkseries/images/9/96/No_book_cover_lg.jpg/revision/latest?cb=20170826200421";
            }

            var dplaAuthor = results[i].sourceResource.creator;
            var tdAuthor = $("<td>").text(dplaAuthor);
            newRow.append(tdAuthor);

            var dplaCollection = "Digital Public Library of America";
            var tdCollection = $("<td>").text(dplaCollection);
            newRow.append(tdCollection);

            var tdCover = $("<img>").attr("src", dplaCover).css({ "width": "150px", "height": "200px" });
            newRow.append(tdCover);

            $("tbody").append(newRow);
          };
        }
      });
    };

    //If/else statements that run appropriate functions depending on the status of the checkboxes
    if ($("#openLib").prop("checked") && $("#digPub").prop("checked")) {
      openLibAjax();
      digPubAjax();
    } else if ($("#openLib").prop("checked")) {
      openLibAjax();
    } else if ($("#digPub").prop("checked")) {
      digPubAjax();
    }
  }
});