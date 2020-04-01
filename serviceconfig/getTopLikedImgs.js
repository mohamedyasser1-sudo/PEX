console.log("Inside Get Top Liked Image User JS");

var restPath = "http://ma3arf.com/aphrodite/public/api/top_liked";

$('document').ready(function() {




    /* form submit */
    (function submitGetLoggedUser() {
        console.log("Inside Submit");
$.LoadingOverlay("show");
        $.ajax({
            type: 'GET',
            url: restPath,
            contentType: 'application/json',
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("Inside success Fun");
                //console.log(JSON.stringify(data.data.pictures));
                console.log("Length");
                console.log(JSON.stringify(data.data.pictures.length));


                    var picLen = JSON.stringify(data.data.pictures.length);
                    var picData = JSON.stringify(data.data.pictures);
                    var i;
                    for (i = 0; i < picLen; i++) {
                       // console.log(JSON.stringify(data.data.pictures[i].image).slice(1,-1));
                      drawEleme(JSON.stringify(data.data.pictures[i].image).slice(1,-1));
                    }



            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
            }
        });
    
        return false;
    })(this);
    /* form submit */

    /**/
});



function drawEleme(src) {

// Div Creation      
var mainDiv = document.createElement("div");
mainDiv.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12');


var imgBoxDiv = document.createElement("div"); 
imgBoxDiv.setAttribute('class', 'imgBox');
mainDiv.appendChild(imgBoxDiv);

var heartDiv = document.createElement("div");
heartDiv.setAttribute('class', 'heart');
var heartEleme = document.createElement("i");
heartEleme.setAttribute('class', 'fas fa-heart');
imgBoxDiv.appendChild(heartDiv);
heartDiv.appendChild(heartEleme);


var plusDiv = document.createElement("div");
plusDiv.setAttribute('class', 'plus');
plusDiv.innerHTML = "+";
imgBoxDiv.appendChild(plusDiv);


if(localStorage.hasOwnProperty('userimg')){
var userImgDiv = document.createElement("div");
userImgDiv.setAttribute('class', 'user-image');
var userImgEleme = document.createElement("img");
userImgEleme.setAttribute('src', localStorage.getItem('userimg'));
imgBoxDiv.appendChild(userImgDiv);
userImgDiv.appendChild(userImgEleme); 
}



var basicImgDiv = document.createElement("div");
basicImgDiv.setAttribute('class', 'basicImg');
var basicImgEleme = document.createElement("img");
basicImgEleme.setAttribute('class', "img-fluid");
basicImgEleme.setAttribute('src', src);
imgBoxDiv.appendChild(basicImgDiv);
basicImgDiv.appendChild(basicImgEleme);

document.getElementById("galleryImgs").appendChild(mainDiv);
   }




   (function getTopImage() {
    $('#topImgs').click(function () {
           $(this).addClass('new');
        });
    var navItemEleme = document.getElementById('topImgs');
     navItemEleme.click();
     
   })();

