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
  /* form submit */
  function fireReq(serviceUrl, type) {
    console.log("Inside Submit");
    serviceUrl.replace(/\s+/g, '');
    serviceUrl.split(' ').join('');
    var restPath = "http://ma3arf.com/aphrodite/public/api/" + serviceUrl.replace(/\s+/g, '');
    console.log("Inside Submfshfhjgfjhjit serviceUrl");
    console.log(serviceUrl);
    console.log(serviceUrl.split(' ').join(''));
    console.log(serviceUrl.replace(/\s+/g, ''));
    $.LoadingOverlay("show");
    $.ajax({
      type: 'GET',
      url: restPath,
      contentType: 'application/json',
       headers: {
               // 'Authorization': (localStorage.hasOwnProperty('userToken') ? 'Bearer ' + localStorage.getItem('userToken').slice(1,-1) : '')
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
                    
        var i;
        for (i = 0; i < dataLen; i++) {
          if (type == "img") {
            drawEleme(JSON.stringify(data.data.pictures[i].image).slice(1, -1), JSON.stringify(data.data.pictures[i].id));
            showImgOnPopup(JSON.stringify(data.data.pictures[i].image).slice(1, -1), JSON.stringify(data.data.pictures[i].id));
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
  function drawEleme(src, id) {
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
    imgBoxDiv.appendChild(plusDiv);
    if (localStorage.hasOwnProperty('userimg')) {
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
    basicImgEleme.setAttribute('id', id);
       basicImgEleme.onclick = function() {
      //alert($(this).attr("src"));
    };
    imgBoxDiv.appendChild(basicImgDiv);
    basicImgDiv.appendChild(basicImgEleme);
    document.getElementById("galleryImgs").appendChild(mainDiv);
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
      $("#carousel_id").html("");
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
      $("#carousel_id").html("");
    }
  }
}



function showImgOnPopup(src, id) {    
    var divImg = document.createElement("div");
    divImg.setAttribute('class', 'carousel-item');
    var divImgEleme = document.createElement("img");
    divImgEleme.setAttribute('class', "d-block w-100 popupimg");
    divImgEleme.setAttribute('src', src);
    divImgEleme.setAttribute('id', id);
    divImg.appendChild(divImgEleme);
    document.getElementById("carousel_id").appendChild(divImg);
    iniPopupImg();
} 

function iniPopupImg() {

    $('#carousel_id div').eq(0).addClass('active')
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