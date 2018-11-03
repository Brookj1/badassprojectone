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
};
