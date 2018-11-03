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