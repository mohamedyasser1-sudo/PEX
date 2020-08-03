/*if(!localStorage.hasOwnProperty('userToken')){
     window.location = "./index.html";
}*/

var path = window.location.pathname;
var page = path.split("/").pop();
console.log( page );

var anonymousPages = ["forgot-password.html", "join.html", "login.html"];

var authorizedPages = ["change-password.html", "edit-profile.html", "profile.html", "show-image.html", "upload.html", "uploadenhanceImage.html"]; // For future use





(function processAnonymousPages() {
      var i;
for (i = 0; i < anonymousPages.length; i++) {
  if(page == anonymousPages[i]) {
	if(localStorage.hasOwnProperty('userToken')){
	     window.location = "./index.html";
	}
  }
}
   })(this);



   (function processAuthorizedPages() {
      var i;
for (i = 0; i < authorizedPages.length; i++) {
  if(page == authorizedPages[i]) {
	if(!localStorage.hasOwnProperty('userToken')){
	     window.location = "./index.html";
	}
  }
}
   })(this);

