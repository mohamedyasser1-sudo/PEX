console.log("Inside Rest Password JS");

var restPathRestPass = "http://ma3arf.com/aphrodite/public/api/password/reset";




$('document').ready(function() {
      /* validation */
    $("#restPasswordForm").validate({
        rules: {
            email: {
                  required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
                
            },
            password_confirmation: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            email: "Enter a Valid Email",
                  password: {
                required: "Provide a Password",
                minlength: "The password must be at least 6 characters."
            },
            password_confirmation: {
                required: "Retype Your Password",
                equalTo: "Password Mismatch! Retype"
            }
        },
        submitHandler: submitRestPassForm
    });
    /* validation */
    /* form submit */
    function submitRestPassForm() {
        console.log("Inside Submit");
        var data = $("#restPasswordForm").serialize();
        /*var oldPassVa = $('#oldPassword').val();
        var newPassVal = $('#newPassword').val();
        var confNewPassVal = $('#confirmationPassword').val();
        var data = {
            "old_password": oldPassVa,
            "password": newPassVal,
            "password_confirmation": confNewPassVal
        };
*/
        console.log("Data");
        console.log(data);
    
            console.log("Inside Submit to send");
            
            $.LoadingOverlay("show");
        $.ajax({
            type: 'POST',
            url: restPathRestPass,
            data: data,
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("success");
                console.log("Inside Edit Profile success Fun");
                console.log(data);
                $.notify("Your Password is Rest Successfully", "success");
                resetFields();
                    setTimeout(function() {
                    window.location = "./index.html";
                }, 1000);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                
            }
        });
    
        return false;
    }
    /* form submit */




function resetFields() {
       $('#email').val('');
       $('#token').val('');
        $('#password').val('');
         $('#password_confirmation').val('');
   }


});


(function getToken() {

     var url = new URL(window.location.href);
                var token;
                
                
                console.log("TOKEN");
                

                if (url.searchParams.get("token")) {
                    token = url.searchParams.get("token");
                    console.log(url);
                console.log(token);
                $('#token').val(token);

                }

                    
})(this);