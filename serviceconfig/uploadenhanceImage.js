   
//$('#oldPhoto img').attr('src', "https://ma3arf.com/aphrodite/storage/app/public/1596404692_qq.png");
          //$('#newPhoto img').attr('src', "https://ma3arf.com/aphrodite/storage/app/public/1596404698_output.jpg");

    function submitUploadImgFormEn() {
    //event.preventDefault();

    // Get Form Data Values
    /*
    var self = this,
        $form = $(this)[0],
      $formData = new FormData($form),
      $url = "https://ma3arf.com/aphrodite/public/api/upload_image";
*/

      // Get Form Data Values
    var self = this;
       var formDataaa = $("#uploadImgFormEn")[0];
      formDataaadddd = new FormData(formDataaa);
      var url = "https://ma3arf.com/aphrodite/public/api/enhanceImage";


       
    // Send the data using post

     
           
            $.LoadingOverlay("show");
    $.ajax({
      type: "POST",
      url: url,
      data: formDataaadddd,
      contentType : false,
      processData: false,
      success: (response, textStatus, jQxhr) => {
         $.LoadingOverlay("hide");
         //$(self)[0].reset();
         console.log(response);
          $("#oldPhoto").css("display", "block");
          $("#newPhoto").css("display", "block");
           console.log(response.data.imageBeforeEnhance);
           console.log(response.data.imageAfterEnhance);
          $('#oldPhoto img').attr('src', response.data.imageBeforeEnhance);
          $('#newPhoto img').attr('src', response.data.imageAfterEnhance);
           submitGetAllCats();


         
        
       
      },
      error: (jQxhr, textStatus, errorThrown) => {
        $.LoadingOverlay("hide");
        var $response = JSON.parse(jQxhr.responseText);
        //alert($response.errors[0]);
        $.notify($response.errors[0], "error");
       setTimeout(function() {
                    window.location.reload();
                }, 2000);
      }
      
    });

  }



  $('.photoBtn').click(function() {
      $('#myModalEn').modal()
    });



          /* form submit */
    function submitGetAllCats() {
        console.log("Inside Submit");
var restPath = "http://ma3arf.com/aphrodite/public/api/categories";
//$.LoadingOverlay("show");
        $.ajax({
            type: 'GET',
            url: restPath,
            contentType: 'application/json',
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
               // console.log("Inside success Fun CATS");
               // console.log("Length");
               // console.log(JSON.stringify(data.data.categories.length));
                //console.log(data);

/*
                    var catsLen = JSON.stringify(data.data.categories.length);
                    var catsData = JSON.stringify(data.data.categories);
                    var i;
                    for (i = 0; i < catsLen; i++) {
                        //console.log(JSON.stringify(data.data.categories[i].name).slice(1,-1));
                      drawCatEleme(JSON.stringify(data.data.categories[i].name).slice(1,-1), JSON.stringify(data.data.categories[i].id));
                    }*/


    var dynamicSelect = document.getElementById("imgCats");
var catsLen = JSON.stringify(data.data.categories.length);
 var i;
 for (i = 0; i < catsLen; i++) {
   var newOption = document.createElement("option");
   newOption.setAttribute('value', JSON.stringify(data.data.categories[i].id));
                newOption.text = JSON.stringify(data.data.categories[i].name).slice(1,-1);//item.whateverProperty

                dynamicSelect.add(newOption);
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
    }
    /* form submit */



    /* validation */
    $("#uploadImgForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            category_id: {
                required: true
            }
        },
        messages: {
            name: "Enter a Name",
            category_id: "Select Category"
        },
        submitHandler: submitUploadImgForm
    });
    /* validation */

    function submitUploadImgForm() {
    //event.preventDefault();

    // Get Form Data Values
    /*
    var self = this,
        $form = $(this)[0],
      $formData = new FormData($form),
      $url = "https://ma3arf.com/aphrodite/public/api/upload_image";
*/

      // Get Form Data Values
    var self = this;
       var formDataaa = $("#uploadImgForm")[0];
      formDataaadddd = new FormData(formDataaa);
      var url = "https://ma3arf.com/aphrodite/public/api/upload_image";
      console.log("fffffffwww");
console.log(formDataaadddd);

       
    // Send the data using post

     if (!localStorage.hasOwnProperty('userToken')) {
            var userTokenVal = localStorage.getItem('userToken');
            $.LoadingOverlay("show");
    $.ajax({
      type: "POST",
      url: url,
      data: formDataaadddd,
      contentType : false,
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + userTokenVal.slice(1,-1)
           },
      success: (response, textStatus, jQxhr) => {
         $.LoadingOverlay("hide");
         $(self)[0].reset();
         $.notify("Congrats, your Image uploaded", "success");

         setTimeout(function() {
                   window.location = "./profile.html";
                }, 1000);
        
        //$(self).after('<img class="img-reponsive" src="'+ response.data.picture.image +'">');
      },
      error: (jQxhr, textStatus, errorThrown) => {
        $.LoadingOverlay("hide");
        var $response = JSON.parse(jQxhr.responseText);
        //alert($response.errors[0]);
        $.notify($response.errors[0], "error");
       setTimeout(function() {
                    window.location.reload();
                }, 2000);
      }
      
    });
}
  }



function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
    
  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


 var blob;
 var contentType = 'image/png';
var request = new XMLHttpRequest();
request.open('GET', "https://ma3arf.com/aphrodite/storage/app/public/1596404698_output.jpg", true);
request.responseType = 'blob';
request.onload = function() {
    var reader = new FileReader();
    reader.readAsDataURL(request.response);
    reader.onload =  function(e){
       blob = b64toBlob(e.target.result.split(',')[1], contentType);
       console.log("qwer");
       console.log(blob);
       $('#imgEn').val(blob);
        console.log('DataURL:', e.target.result);
    };
};
request.send();