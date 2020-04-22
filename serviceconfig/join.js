console.log("Inside Join JS");

//var restPath = "http://ma3arf.com/aphrodite/public/api/register";
$('document').ready(function() {
    /* validation */
    $("#joinForm").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 3
            },
            last_name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            password_confirmation: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            first_name: "Enter a First Name",
            last_name: "Enter a Last Name",
            email: "Enter a Valid Email",
            password: {
                required: "Provide a Password",
                minlength: "Password Needs To Be Minimum of 8 Characters"
            },
            password_confirmation: {
                required: "Retype Your Password",
                equalTo: "Password Mismatch! Retype"
            }
        },
     submitHandler: submitJoinForm
    });
    /* validation */




    //$(document).ready(function () {
  // Attach a submit handler to the form
  //$("form").submit(function (event) {
    // Stop form from submitting normally
        function submitJoinForm() {
    //event.preventDefault();

    // Get Form Data Values
    var self = this;
       var formDataaa = $("#joinForm")[0];
      formDataaadddd = new FormData(formDataaa);
      var url = "http://ma3arf.com/aphrodite/public/api/register";
       
    // Send the data using post

      if (!localStorage.hasOwnProperty('userToken')) {
            $.LoadingOverlay("show");
    $.ajax({
      type: "POST",
      url: url,
      data: formDataaadddd,
      contentType : false,
      processData: false,
      success: (response, textStatus, jQxhr) => {
        $(self)[0].reset();
        
         $.LoadingOverlay("hide");
                console.log("success");
                console.log(response);
                localStorage.setItem('userToken', JSON.stringify(response.data.token));
                localStorage.setItem('userimg', JSON.stringify(response.data.user.profile_pic));
                localStorage.setItem('fname', JSON.stringify(response.data.user.first_name));
                localStorage.setItem('lname', JSON.stringify(response.data.user.last_name));
                localStorage.setItem('userId', JSON.stringify(response.data.user.id));
                $.notify("Congrats, Now your are a member", "success");
                setTimeout(function() {
                    window.location = "./profile.html";
                }, 2000);
      },
      error: (jQxhr, textStatus, errorThrown) => {
          $.LoadingOverlay("hide");
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
      }
      
    });
}
  }
  //);
//});



});