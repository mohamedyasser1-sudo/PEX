console.log("Inside Profile JS");

$('document').ready(function() {



  (function getMyPhoto() {
    $('#myPhoto').click(function() {
      $(this).addClass('active');
    });
    var navItemEleme = document.getElementById('myPhoto');
    navItemEleme.click();
    //fireReq("top_liked", "img");
  })();

    (function getMyPhoto() {
    $('#followers').click(function() {
      $(this).addClass('active');
    });
    var navItemEleme = document.getElementById('followers');
    navItemEleme.click();
    fireReq("followers", "followers");
  })();


  // Start Change Images 
  $('.nav .nav-item .nav-link').click(function() {
    console.log("Clicled Imageeeed TTTTESSST");
    var elmId = $(this).attr("id");
    clearActive();
    $('#' + elmId).addClass('active');
    if (elmId == "myPhoto") {
      //fireReq("top_liked", "img");
    }
    if (elmId == "followers") {
      fireReq("followers", "followers");
    }
    if (elmId == "Following") {
      fireReq("followerings", "followerings");
    }
  });



  /* form submit */
  function fireReq(serviceUrl, type) {
    console.log("Inside Submit");
    serviceUrl.replace(/\s+/g, '');
    serviceUrl.split(' ').join('');
    var restPath = "http://ma3arf.com/aphrodite/public/api/" + serviceUrl.replace(/\s+/g, '');
    console.log("Inside Submfshfhjgfjhjit serviceUrl");
    $.LoadingOverlay("show");
    $.ajax({
      type: 'GET',
      url: restPath,
      contentType: 'application/json',
       headers: {
                'Authorization': (localStorage.hasOwnProperty('userToken') ? 'Bearer ' + localStorage.getItem('userToken').slice(1,-1) : '')
            },
      beforeSend: function() {},
      success: function(data) {
        $.LoadingOverlay("hide");
        console.log("Inside success Fun");
        console.log("Length");
        var dataLen;
        switch (type) {
          case "img":
            dataLen = JSON.stringify(data.data.pictures.length);
            break;
          case "followers":
            dataLen = JSON.stringify(data.data.followers.length);
            break;
          case "followerings":
            dataLen = JSON.stringify(data.data.followings.length);
            break;
        }
                    
        var i;
        for (i = 0; i < dataLen; i++) {
          if (type == "img") {
            drawImgEleme(JSON.stringify(data.data.pictures[i].image).slice(1, -1), JSON.stringify(data.data.pictures[i].id));
      
          } else if (type == "followers") {
            //console.log("Inside Follwers");
            //console.log(JSON.stringify(data.data.followers[i]));
            drawEleme(JSON.stringify(data.data.followers[i].profile_pic).slice(1, -1), JSON.stringify(data.data.followers[i].id), JSON.stringify(data.data.followers[i].first_name).slice(1, -1), JSON.stringify(data.data.followers[i].last_name).slice(1, -1) );
          } else if (type == "followerings") {
            drawEleme(JSON.stringify(data.data.followings[i].profile_pic).slice(1, -1), JSON.stringify(data.data.followings[i].id), JSON.stringify(data.data.followings[i].first_name).slice(1, -1), JSON.stringify(data.data.followings[i].last_name).slice(1, -1) );
          }
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $.LoadingOverlay("hide");
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
        console.log(JSON.stringify(XMLHttpRequest.responseJSON));
        checkAuthenticat(JSON.stringify(XMLHttpRequest.responseJSON));
      }
    });
    return false;
  }
  /* form submit */
  /**/

   function drawImgEleme(src, id) {
    // Div Creation      
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12');
    //mainDiv.setAttribute('id', id);
    // Trigger the modal with a img
    mainDiv.setAttribute('data-toggle', 'modal');
    mainDiv.setAttribute('data-target', '#myModal');

    

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
    //imgBoxDiv.appendChild(plusDiv);
    if (localStorage.hasOwnProperty('userimg')) {
      var userImgDiv = document.createElement("div");
      userImgDiv.setAttribute('class', 'user-image');
      var userImgEleme = document.createElement("img");
      userImgEleme.setAttribute('src', localStorage.getItem('userimg').slice(1, -1));
      imgBoxDiv.appendChild(userImgDiv);
      userImgDiv.appendChild(userImgEleme);
    }
    var basicImgDiv = document.createElement("div");
    basicImgDiv.setAttribute('class', 'basicImg');
    var basicImgEleme = document.createElement("img");
    basicImgEleme.setAttribute('class', "img-fluid");
    basicImgEleme.setAttribute('src', src);
    basicImgEleme.setAttribute('id', id);
       basicImgEleme.onclick = function() {
      //alert($(this).attr("src"));
    };
    imgBoxDiv.appendChild(basicImgDiv);
    basicImgDiv.appendChild(basicImgEleme);
    document.getElementById("galleryImgs").appendChild(mainDiv);
  }



  function drawEleme(src, id, fname, lname) {
    // Div Creation      
    // Style One
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute('class', 'col-lg-3 col-md-4 col-sm-6');
    var imgBoxDiv = document.createElement("div");
    imgBoxDiv.setAttribute('class', 'user-box');
    mainDiv.appendChild(imgBoxDiv);

    var basicImgEleme = document.createElement("img");
    basicImgEleme.setAttribute('class', "img-fluid");
    basicImgEleme.setAttribute('src', "images/avatar.jpg");
    basicImgEleme.setAttribute('id', id);

    var nameEleme = document.createElement("span");
    nameEleme.setAttribute('class', "name");
    nameEleme.innerHTML = fname + " " +  lname;


    imgBoxDiv.appendChild(basicImgEleme);
    imgBoxDiv.appendChild(nameEleme);
    document.getElementById("myBox").appendChild(mainDiv);

  }

});
/////




function isEmptyStr(property) {
  return (property === null || property === "" || typeof property === "undefined");
}


function clearActive() {
  for (i = 0; i < 3; i++) {
    if ($('.nav li a').eq(i).hasClass('active')) {
      $('.nav li a').eq(i).removeClass('active');
      $("#myBox").html("");
    }
  }
}







function checkAuthenticat(data) {
console.log('Inside checkAuthenticat');
console.log(data);
console.log();
 if(data.toString() == '{"errors":["Your Are Not Authenticated"]}')  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userimg');
    $.notify("BOOM!, Your Are Not Authenticated.", "error");
    setTimeout(function() {
                    window.location = "./index.html";
                }, 1000);
 } 
}


(function getUserImg() {

    $('.userimg').attr('src', localStorage.getItem('userimg').slice(1, -1));
     $('#userName').html(localStorage.getItem('fname').slice(1, -1) + " " + localStorage.getItem('lname').slice(1, -1));
})();

