console.log("Inside GET Image JS");
$('document').ready(function() {
  (function getAllTags() {
    fireReq("tags", "tag");
  })();
  (function getAllCat() {
    fireReq("categories", "cat");
  })();
  (function getTopImage() {
    $('#topImgs').click(function() {
      $(this).addClass('new');
    });
    var navItemEleme = document.getElementById('topImgs');
    navItemEleme.click();
    fireReq("top_liked", "img");
  })();
  // Start Change Images 
  $('.nav .nav-item .nav-link').click(function() {
    console.log("Clicled Imageeeed TTTTESSST");
    var elmId = $(this).attr("id");
    clearRedPoint();
    $('#' + elmId).addClass('new');
    if (elmId == "topImgs") {
      fireReq("top_liked", "img");
      clearFilter();
    }
    if (elmId == "newImgs") {
      fireReq("images", "img");
      //clearFilterUI();
    }
    if (elmId == "follwImgs") {
      fireReq("following_images", "img");
      clearFilter();
    }
  });
  var quParams = "images?";

  function checkFilter(elemid) {
    clearRedPoint();
    $("#newImgs").addClass('new');
    var parentId = $("#" + elemid).parent().attr('id');
    var elemSelectorToCheck = "#" + parentId + " a";
    var elemSelector = "#" + parentId + " a#" + elemid;
    for (i = 0; i < $("#" + parentId + " *").length + 1; i++) {
      if ($(elemSelectorToCheck).eq(i).hasClass('wasClicked')) {
        $(elemSelectorToCheck).eq(i).removeClass('wasClicked');
      }
    }
    $(elemSelector).addClass('wasClicked');
    if ($("#" + elemid).parent().attr('id') == "tags") {
      localStorage.setItem('tag_id', elemid.slice(1, -1));
    }
    if ($("#" + elemid).parent().attr('id') == "cats") {
      localStorage.setItem('category_id', elemid.slice(1, -1));
    }
    console.log("filter Services");
    console.log(quParams);
    var tagValFilr = "";
    var tagcatFilr = "";
    if (localStorage.hasOwnProperty('tag_id')) {
      tagValFilr = localStorage.getItem('tag_id');
    }
    if (localStorage.hasOwnProperty('category_id')) {
      tagcatFilr = localStorage.getItem('category_id');
    }
    console.log("images?tag_id=" + tagValFilr + "&category_id=" + tagcatFilr);
    fireReq("images?tag_id=" + tagValFilr + "&category_id=" + tagcatFilr, "img");
  };




$("#navLinkLike").click(function(){
  
  var isImgLicked = $(this).attr("isLiked");
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

   

    //$.LoadingOverlay("show");
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
          case "tag":
            dataLen = JSON.stringify(data.data.tags.length);
            break;
          case "cat":
            dataLen = JSON.stringify(data.data.categories.length);
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
            console.log('WEWEWEWEWEWEWEWEWEWE');

            drawEleme(JSON.stringify(data.data.pictures[i].image).slice(1, -1), JSON.stringify(data.data.pictures[i].id), (JSON.stringify(data.data.pictures[i].hasOwnProperty('isLiked')) ? JSON.stringify(data.data.pictures[i].isLiked) : null), JSON.stringify(data.data.pictures[i].user.id), JSON.stringify(data.data.pictures[i].user.first_name).slice(1, -1), JSON.stringify(data.data.pictures[i].user.last_name).slice(1, -1), JSON.stringify(data.data.pictures[i].user.profile_pic).slice(1, -1), ((JSON.stringify(data.data.pictures[i].user.hasOwnProperty('isFollowed'))) ? JSON.stringify(data.data.pictures[i].user.isFollowed) : null));
            //showImgOnPopup(JSON.stringify(data.data.pictures[i].image).slice(1, -1), JSON.stringify(data.data.pictures[i].id), (JSON.stringify(data.data.pictures[i].hasOwnProperty('isLiked')) ? JSON.stringify(data.data.pictures[i].isLiked) : null));
          } else if (type == "tag") {
            drawTagEleme(JSON.stringify(data.data.tags[i].name).slice(1, -1), JSON.stringify(data.data.tags[i].id));
          } else if (type == "cat") {
            drawCatEleme(JSON.stringify(data.data.categories[i].name).slice(1, -1), JSON.stringify(data.data.categories[i].id));
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
  function drawEleme(src, id, isLike, imgAuthorId, imgAuthorFname, imgAuthorLname, imgAuthor, imgAuthorIsFollow) {
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
      userImgEleme.setAttribute('src', imgAuthor);
      imgBoxDiv.appendChild(userImgDiv);
      userImgDiv.appendChild(userImgEleme);
    }

    var basicImgDiv = document.createElement("div");
    basicImgDiv.setAttribute('class', 'basicImg');
    var basicImgEleme = document.createElement("img");
    basicImgEleme.setAttribute('class', "img-fluid");
     basicImgEleme.setAttribute('width', "100%");
 
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

    document.getElementById("galleryImgs").appendChild(mainDiv);
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

  function drawTagEleme(val, id) {
    var tagEleme = document.createElement("a");
    tagEleme.setAttribute('class', "btn btn-primary tagWord");
    tagEleme.setAttribute('id', "t" + id + "t");
    tagEleme.innerHTML = val;
    tagEleme.onclick = function() {
      //alert($(this).attr("id"));
      checkFilter($(this).attr("id"));
      //$(this).addClass('wasClicked');
    };
    document.getElementById("tags").appendChild(tagEleme);
  }

  function drawCatEleme(val, id) {
    var catEleme = document.createElement("a");
    catEleme.setAttribute('class', "btn btn-primary catWord");
    catEleme.setAttribute('id', "c" + id + "c");
    catEleme.innerHTML = val;
    catEleme.onclick = function() {
      checkFilter($(this).attr("id"));
    };
    document.getElementById("cats").appendChild(catEleme);
  }
  $("#searchFrom").submit(function(e) {
    e.preventDefault();
  });
  $('#searchBtn').click(function() {
    if (isEmptyStr($('#searchWordBtn').val())) {
      $.notify("Please enter a value", "warn");
    } else {
      clearRedPoint();
      $("#newImgs").addClass('new');
      $("#galleryImgs").html("");
      //$("#carousel_id").html("");
      var urlWithWord = "images?word=" + $('#searchWordBtn').val();
      console.log(urlWithWord);
    }
    fireReq(urlWithWord, "img");
  });
});
/////
function clearFilter() {
  if (localStorage.hasOwnProperty("tag_id")) {
    for (i = 0; i < $("#tags *").length + 1; i++) {
      if ($("#tags a").eq(i).hasClass('wasClicked')) {
        $("#tags a").eq(i).removeClass('wasClicked');
      }
    }
    localStorage.removeItem('tag_id');
  }
  if (localStorage.hasOwnProperty("category_id")) {
    for (i = 0; i < $("#cats *").length + 1; i++) {
      if ($("#cats a").eq(i).hasClass('wasClicked')) {
        $("#cats a").eq(i).removeClass('wasClicked');
      }
    }
    localStorage.removeItem('category_id');
  }
};

function clearFilterUI() {
  if (localStorage.hasOwnProperty("tag_id")) {
    for (i = 0; i < $("#tags *").length + 1; i++) {
      if ($("#tags a").eq(i).hasClass('wasClicked')) {
        $("#tags a").eq(i).removeClass('wasClicked');
      }
    }
  }
  if (localStorage.hasOwnProperty("category_id")) {
    for (i = 0; i < $("#cats *").length + 1; i++) {
      if ($("#cats a").eq(i).hasClass('wasClicked')) {
        $("#cats a").eq(i).removeClass('wasClicked');
      }
    }
  }
};

function isEmptyStr(property) {
  return (property === null || property === "" || typeof property === "undefined");
}

function clearRedPoint() {
  for (i = 1; i < 4; i++) {
    if ($('.nav-item div').eq(i).hasClass('new')) {
      $('.nav-item div').eq(i).removeClass('new');
      $("#galleryImgs").html("");
      //$("#carousel_id").html("");
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
  clearActiveImg();
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

     $('#download').attr('href', imgSrc);

     $('#downloadBtnId').attr('imgSrc', imgSrc);
     $('#downloadBtnId').attr('idImgToDownload', imgId);

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
if(!isEmptyStr(data)) {
console.log((data.hasOwnProperty('errors')));
 if(data.toString() == '{"errors":["Your Are Not Authenticated"]}')  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userimg');
    $.notify("BOOM!, Your Are Not Authenticated.", "error");
    setTimeout(function() {
                    window.location = "./index.html";
                }, 1000);
 } 
}}


(function getUserImg() {

  if(localStorage.hasOwnProperty('userimg')){
       $('#userimg').attr('src', localStorage.getItem('userimg').slice(1, -1));
       $('.userLoggedName').text(localStorage.getItem('fname').slice(1, -1) + ' ' + localStorage.getItem('lname').slice(1, -1));
  }


    

})();




function clearActiveImg() {
    for (i = 0; i < $("#carousel_id *").length + 1; i++) {
      if ($("#carousel_id div").eq(i).hasClass('active')) {
        $("#carousel_id div").eq(i).removeClass('active');
      }
    }  
};



$("#downloadBtnId").click(function(){

  var imgSource = "http://ma3arf.com/aphrodite/public/api/image/save/" + $(this).attr("idImgToDownload");
  var link = document.createElement('a');
link.href = imgSource;
link.target = '_blank';
//link.download = 'Download.jpg';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
});



/*
(function changeBg() {
var imgSrc = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg', 'bg9.jpg', 'bg10.jpg', 'bg11.jpg', 'bg12.jpg', 'bg13.jpg']


setInterval(function(){

  //console.log("BBBBBBGGGGGGGGGGGGYYYYYASSSSSER");
//console.log(imgSrc[Math.floor(Math.random() * imgSrc.length) ]);
//var imgIndexToShow = 
var imageUrl =  "./images/indexbgs/" + imgSrc[Math.floor(Math.random() * imgSrc.length) ]; 
$(".banner").css("background-image", "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + imageUrl + ")"); 
}, 5000);
})();
*/
