var scriptArr = ["popper.min", "fontawesome", "bootstrap.min", "notify.min", "jquery.validate.min", "elementShow", "authorization", "loadingoverlay.min", "logout"];

var serviceconfigScripts = {
"login": "login",
"join": "join",
"getLoggedUser": "getLoggedUser",
"editProfile": "editProfile",
"changePassword": "changePassword"
};

var pathUrl = window.location.pathname;
var pageName = pathUrl.split("/").pop();


  window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
        (function processLoadScript() {
  var i;
  for (i = 0; i < scriptArr.length; i++) {

    loadScript(scriptArr[i], "lib", function(){console.log("Complete load script");});


   if( i == scriptArr.length - 1) {
   	console.log("Inside Last Load");
     LoadConfigScript();
    
   }
  }
})(this);
    } else {
        // jQuery is not loaded
         alert("jQuery is not loaded, Please reload this page");
         //location.reload();
    }
}




function loadScript(url, type, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

  if(type == "lib") {
   script.src = 'js/' + url + '.js'; 
     }
     else if (type == "config") {
     	script.src = './serviceconfig/' + url + '.js'; 
     }

    //script.src = url;
    //document.getElementsByTagName("body")[0].appendChild(script);
    document.body.appendChild(script);
}



function LoadConfigScript() {

	switch (pageName) {
	case "login.html":
    loadScript(serviceconfigScripts.login, "config", function(){console.log("Complete load script");});
    break;
     case "join.html":
    loadScript(serviceconfigScripts.join, "config", function(){console.log("Complete load script");});
    break;
    case "edit-profile.html":
     loadScript(serviceconfigScripts.getLoggedUser, "config", function(){console.log("Complete load script");});
     loadScript(serviceconfigScripts.editProfile, "config", function(){console.log("Complete load script");});
    break;
    case "change-password.html":
    loadScript(serviceconfigScripts.changePassword, "config", function(){console.log("Complete load script");});
    break;
}
 
}