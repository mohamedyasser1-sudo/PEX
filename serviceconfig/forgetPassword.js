console.log("Inside Forget Password JS");

var restPathForgetPass = "http://ma3arf.com/aphrodite/public/api/password/email";




$('document').ready(function() {
      /* validation */
    $("#forgetPasswordForm").validate({
        rules: {
            email: {
                  required: true,
                email: true
            }
        },
        messages: {
            email: "Enter a Valid Email"
        },
        submitHandler: submitChangePassForm
    });
    /* validation */
    /* form submit */
    function submitChangePassForm() {
        console.log("Inside Submit");
        var data = $("#forgetPasswordForm").serialize();
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
            url: restPathForgetPass,
            data: data,
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("success");
                console.log("Inside Edit Profile success Fun");
                console.log(data);
                $.notify("Please check your mail", "success");
                resetFields();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                /*console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
                $.notify(JSON.stringify(XMLHttpRequest.responseJSON.errors) + " So password didn't change", "info");*/
            }
        });
    
        return false;
    }
    /* form submit */




function resetFields() {
       $('#email').val('');
   }


});