console.log("Inside Upload Image JS");


$('document').ready(function() {
    /* validation */
    $("#uploadImgForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            image: {
                required: true,
                minlength: 3
            },
            category_id: {
                required: true
            }
        },
        messages: {
            name: "Enter a Name",
            image: "Enter an Name",
            category_id: "Select Category"
        },
        submitHandler: submitUploadImgForm
    });
    /* validation */





    //$(document).ready(function () {
  // Attach a submit handler to the form
  //$("form").submit(function (event) {
    // Stop form from submitting normally
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


       
    // Send the data using post

     if (localStorage.hasOwnProperty('userToken')) {
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
                    window.location.reload();
                }, 2000);
        
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
  //);
//});




        /* form submit */
    (function submitGetAllCats() {
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
    })(this);
    /* form submit */


});