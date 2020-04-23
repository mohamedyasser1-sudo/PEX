console.log("Inside Profile JS");

$('document').ready(function() {



  (function getMyPhoto() {
    $('#myPhoto').click(function() {
      $(this).addClass('active');
    });
    var navItemEleme = document.getElementById('myPhoto');
    navItemEleme.click();
    console.log('Inside First blocccccckkkkkkkkk');
    console.log(localStorage.getItem('userId').slice(1,-1));
    fireReq("images?user_id=" + localStorage.getItem('userId'), "img");
  })();

    /*(function getMyPhoto() {
    $('#followers').click(function() {
      $(this).addClass('active');
    });
    var navItemEleme = document.getElementById('followers');
    navItemEleme.click();
    fireReq("followers", "followers");
  })();*/


  // Start Change Images 
  $('.nav .nav-item .nav-link').click(function() {
    console.log("Clicled Imageeeed TTTTESSST");
    var elmId = $(this).attr("id");
    clearActive();
    $('#' + elmId).addClass('active');
    if (elmId == "myPhoto") {
      fireReq("images?user_id=" + localStorage.getItem('userId'), "img");
    }
    if (elmId == "followers") {
      fireReq("followers", "followers");
    }
    if (elmId == "Following") {
      fireReq("followerings", "followerings");
    }
  });


$("#navLinkLike").click(function(){
  
  var isImgLicked = $(this).attr("isLiked")
  var imgId = $(this).attr("currentImgId")
  
  if(isImgLicked == 'true') {
    console.log('Inside True');
$("#navLinkLike i").css("color", "#000");
$("#navLinkLike").attr('isLiked', 'false');
$('#' + imgId).attr('imgIsLike', 'false');
$('#heart' + imgId).css({"background-color": "#fff", "color": "#ac9999"});


fireReq("like?image_id=" + imgId , "delLike"); 

}

  if(isImgLicked == 'false') {
    console.log('Inside False');
$("#navLinkLike i").css("color", "#FF6565");
$("#navLinkLike").attr('isLiked', 'true');
$('#' + imgId).attr('imgIsLike', 'true');
$('#heart' + imgId).css({"background-color": "#FF6565", "color": "#fff"});
fireReq("like?image_id=" + imgId , "like"); 

}
});


$("#authotFollowId").click(function(){
  var isUserFollowed = $(this).attr("isFollow");
  var userId = $(this).attr("currentAuthorId");
   var curreImgId = $(this).attr("curreImgId");
     console.log("isUserFollowed");
  console.log(isUserFollowed);
  if(isUserFollowed == 'true') {
    console.log('Inside True');
$('#authotFollowId').attr('isFollow', 'false');
$('#authotFollowId').css({"background-color": "#F8F2F2", "color": "#000"});
$('#authotFollowId').text("Follow");
$('#' + curreImgId).attr('imgAuthorIsFollow', 'false');

fireReq("follow?user_id=" + userId , "delFollow"); 

}

  if(isUserFollowed == 'false') {
    console.log('Inside True');
$('#authotFollowId').attr('isFollow', 'true');

$('#authotFollowId').css({"background-color": "#FF6565", "color": "#fff"});
$('#authotFollowId').text("Unfollow");
$('#' + curreImgId).attr('imgAuthorIsFollow', 'true');

fireReq("follow?user_id=" + userId , "follow"); 

}
});




  /* form submit */
  function fireReq(serviceUrl, type) {
    
     console.log("Inside Submit");
    serviceUrl.replace(/\s+/g, '');
    serviceUrl.split(' ').join('');
    var restPath = "http://ma3arf.com/aphrodite/public/api/" + serviceUrl.replace(/\s+/g, '');
    console.log("Inside Submfshfhjgfjhjit serviceUrl");
    console.log(serviceUrl);
    console.log("TTTTTTTYYYYPE");
    console.log(type);
    console.log(serviceUrl.split(' ').join(''));
    console.log(serviceUrl.replace(/\s+/g, ''));
    var methodType = '';

  if(type == "like" || type == "follow") {
         methodType = 'POST';
    } 
else if (type == "delLike" || type == "delFollow") {
         methodType = 'DELETE';
    }
    else {
      $.LoadingOverlay("show");
         methodType = 'GET';
    }


    $.ajax({
      type: methodType,
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
           
               console.log('Inside Like IFFFFFFFFFF 111111111111111');
        console.log(type);
        if(type == "like") {
          console.log('Inside Like IFFFFFFFFFF');
          console.log(data);
          console.log(data.message);
          if(data.message == 'Success Liked') {
            $.notify("You successfully Liked this Image", "info");
          }
           
          

        }

           if(type == "delLike") {
          console.log('Inside delLike IFFFFFFFFFF');
          console.log(data);
          console.log(data.message);
          if(data.message == 'Success Cancel Like') {
            $.notify("You successfully Cancel Like on this Image", "info");
          }

        }


        if(type == "follow") {
          console.log('Inside Like IFFFFFFFFFF');
          console.log(data);
          console.log(data.message);
          if(data.message == 'Success Followed') {
            $.notify("You successfully Follow this user", "info");
          }
           
          

        }

           if(type == "delFollow") {
          console.log('Inside delLike IFFFFFFFFFF');
          console.log(data);
          console.log(data.message);
          if(data.message == 'Success Cancel follow') {
            $.notify("You successfully Cancel following this user", "info");
          }

        }

        var i;
        for (i = 0; i < dataLen; i++) {
          if (type == "img") {
            drawImgEleme(JSON.stringify(data.data.pictures[i].image).slice(1, -1), JSON.stringify(data.data.pictures[i].id), (JSON.stringify(data.data.pictures[i].hasOwnProperty('isLiked')) ? JSON.stringify(data.data.pictures[i].isLiked) : null), JSON.stringify(data.data.pictures[i].user.id), JSON.stringify(data.data.pictures[i].user.first_name).slice(1, -1), JSON.stringify(data.data.pictures[i].user.last_name).slice(1, -1), JSON.stringify(data.data.pictures[i].user.profile_pic).slice(1, -1), ((JSON.stringify(data.data.pictures[i].user.hasOwnProperty('isFollowed'))) ? JSON.stringify(data.data.pictures[i].user.isFollowed) : null));
           
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

  function drawImgEleme(src, id, isLike, imgAuthorId, imgAuthorFname, imgAuthorLname, imgAuthor, imgAuthorIsFollow) {
    // Div Creation      
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12');
    //mainDiv.setAttribute('id', id);
    // Trigger the modal with a img
    

    

    var imgBoxDiv = document.createElement("div");
    imgBoxDiv.setAttribute('class', 'imgBox');
    mainDiv.appendChild(imgBoxDiv);
if (localStorage.hasOwnProperty('userimg')) {
    var heartDiv = document.createElement("div");
       heartDiv.setAttribute('id', 'heart' + id);
    heartDiv.setAttribute('imgData', id);
    heartDiv.setAttribute('isLike', isLike);
    heartDiv.setAttribute('class', 'heart');
    var heartEleme = document.createElement("i");
    heartEleme.setAttribute('class', 'fas fa-heart');

    imgBoxDiv.appendChild(heartDiv);
    heartDiv.appendChild(heartEleme);
/*
        if(manageLike(id)) {
          console.log('Inside IFFFFFFF WHRN CREATE');
      heartDiv.setAttribute("style", "background-color:#fff; color:#ac9999;");
      }
        else {
           console.log('Inside ELSE IFFFFFFF WHRN CREATE');
                          heartDiv.setAttribute("style", "background-color:green; color:#fff;");
        }*/
console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
console.log(isLike);
if(!isEmptyStr(isLike)) {

console.log('!isEmptyStr(isLike)');
if(isLike == 'true')
{
  console.log('Inside IFFFFFFF true');
heartDiv.setAttribute("style", "background-color:#FF6565; color:#fff;");
}

if(isLike == 'false')
{
  console.log('Inside IFFFFFFF false');
heartDiv.setAttribute("style", "background-color:#fff; color:#ac9999;");
}

}

        heartDiv.onclick = function() {
       //alert($(this).attr("imgData"));
       //alert($(this).attr("isLike"));


       manageLike($(this).attr("id"), $(this).attr("imgData"),  $(this).attr("isLike"))
     

      console.log('ddddddddetfrrrrrrrrrrrrrDDDDDDDDDDDDDD');
      /*
      if(manageLike($(this).attr("imgData"))) {
        $(this).css("background-color", "#FF6565");
      $(this).css("color", "#fff");
      }
        else {
       $(this).css("background-color", "#fff");
       $(this).css("color", "#ac9999");
        }*/
    };
     }
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
    
    basicImgEleme.setAttribute('imgAuthorId', imgAuthorId);
    basicImgEleme.setAttribute('imgAuthorFname', imgAuthorFname);
    basicImgEleme.setAttribute('imgAuthorLname', imgAuthorLname);
    basicImgEleme.setAttribute('imgAuthor', imgAuthor);

  if(!isEmptyStr(isLike)) {
     basicImgEleme.setAttribute('imgIsLike', isLike);
    }

    if(!isEmptyStr(imgAuthorIsFollow)) {
     basicImgEleme.setAttribute('imgAuthorIsFollow', imgAuthorIsFollow);
    }
    

    basicImgEleme.setAttribute('data-toggle', 'modal');
    basicImgEleme.setAttribute('data-target', '#myModal');
       basicImgEleme.onclick = function() {
      //alert($(this).attr("id"));
      iniPopupImg($(this).attr("id"));
      dataOnPopup($(this).attr("imgAuthorId"), $(this).attr("imgAuthorFname"), $(this).attr("imgAuthorLname"), $(this).attr("imgAuthor"), $(this).attr("imgAuthorIsFollow"), $(this).attr("imgIsLike"), $(this).attr("id"), $(this).attr("src"));
      //showImgOnPopup($(this).attr("src"), $(this).attr("id"), $(this).attr("imgIsLike"));
    };
    imgBoxDiv.appendChild(basicImgDiv);
    basicImgDiv.appendChild(basicImgEleme);

    document.getElementById("myBox").appendChild(mainDiv);
  }



function manageLike(blockid, imgId, isLikeFlg) {


if(isLikeFlg == 'true') {
//$('#' + blockid).setAttribute("style", "background-color:#fff; color:#ac9999;");
$('#' + blockid).css({"background-color": "#fff", "color": "#ac9999"});
$('#' + blockid).attr('isLike', 'false');
$('#' + imgId).attr('imgIsLike', 'false');
fireReq("like?image_id=" + imgId , "delLike"); 


}


if(isLikeFlg == 'false') {
  //$('#' + blockid).setAttribute("style", "background-color:#FF6565; color:#fff;");
  $('#' + blockid).css({"background-color": "#FF6565", "color": "#fff"});
  $('#' + blockid).attr('isLike', 'true');
  $('#' + imgId).attr('imgIsLike', 'true');
  fireReq("like?image_id=" + imgId , "like");
}

//fireReq("like?image_id=" + imgId , "like");
//return fireReq("like?image_id=" + imgId , "like");
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
    basicImgEleme.setAttribute('src', src);
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


function showImgOnPopup(src, id, isLike) {   

console.log('User Daaaaatttttttttttttta on popup'); 


    var divImg = document.createElement("div");
    divImg.setAttribute('class', 'carousel-item');
    divImg.setAttribute('id', id);
    var divImgEleme = document.createElement("img");
    divImgEleme.setAttribute('class', "d-block w-100 popupimg");
    divImgEleme.setAttribute('src', src);
    divImg.appendChild(divImgEleme);
    document.getElementById("carousel_id").appendChild(divImg);
    
} 

function iniPopupImg(id) {
  console.log('Inside Ini POPUP IMAGE')
  console.log(id)
 // clearActiveImg();
    $('#carousel_id #' + id).eq(0).addClass('active')
}



function dataOnPopup(imgAuthorId, imgAuthorFname, imgAuthorLname, imgAuthor, imgAuthorIsFollow, isLike, imgId, imgSrc) {

 // userData = JSON.stringify(userData);

  console.log('Inside Ini POPUP IMAGE')
  console.log(imgAuthorId);
  console.log(imgAuthorFname);
  console.log(imgAuthorLname);
    console.log(imgAuthor);
      console.log(imgAuthorIsFollow);
      console.log('QWERTY SSSSRR')
 console.log(imgSrc);

    $('#imgAuthor').attr('src', imgAuthor);
    $('#imgAuthorName').text(imgAuthorFname + ' ' + imgAuthorLname);

    $('.divImg').addClass('active');
    $('.divImg').attr('id', imgId);

     $('#imgPopUP').attr('src', imgSrc);

    if(!isEmptyStr(imgAuthorIsFollow)) {

       $('#authotFollowId').attr('isFollow', imgAuthorIsFollow);
      $('#authotFollowId').attr('currentAuthorId', imgAuthorId);
      $('#authotFollowId').attr('curreImgId', imgId);

     if(imgAuthorIsFollow == 'true') {
      $('#authotFollowId').text('Unfollow');
      $('#authotFollowId').css({"background-color": "rgb(255, 101, 101)", "color": "#fff"});
     }

       if(imgAuthorIsFollow == 'false') {
         $('#authotFollowId').css({"background-color": "rgb(248, 242, 242)", "color": "#000"});
      $('#authotFollowId').text('Follow');
     }

    }


    if(!isEmptyStr(isLike)) {

      $('#navLinkLike').attr('isLiked', isLike);
       $('#navLinkLike').attr('currentImgId', imgId);

     if(isLike == 'true') {
      //$('#navLinkLike i').css("background-color": "#FF6565");  
      $("#navLinkLike i").css("color", "#FF6565");

     }

       if(isLike == 'false') {
      $("#navLinkLike i").css("color", "#000");
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
$('.userLoggedName').text(localStorage.getItem('fname').slice(1, -1) + ' ' + localStorage.getItem('lname').slice(1, -1));

})();



