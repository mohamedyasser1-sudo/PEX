console.log("Inside Change Password JS");

var restPath = "http://ma3arf.com/aphrodite/public/api/password";




$('document').ready(function() {
      /* validation */
    $("#changePasswordForm").validate({
        rules: {
            oldPassword: {
                required: true,
                minlength: 6
            },
            newPassword: {
                required: true,
                minlength: 6
                
            },
            confirmationPassword: {
                required: true,
                equalTo: '#newPassword'
            }
        },
        messages: {
            oldPassword: {
                required: "Provide a Password",
                minlength: "The Old password must be at least 6 characters."
            },
            newPassword: {
                required: "Provide a Password",
                minlength: "The password must be at least 6 characters."
            },
            confirmationPassword: {
                required: "Retype Your Password",
                equalTo: "Password Mismatch! Retype"
            }
        },
        submitHandler: submitChangePassForm
    });
    /* validation */
    /* form submit */
    function submitChangePassForm() {
        console.log("Inside Submit");
        //var data = $("#changePasswordForm").serialize();
        var oldPassVa = $('#oldPassword').val();
        var newPassVal = $('#newPassword').val();
        var confNewPassVal = $('#confirmationPassword').val();
        var data = {
            "old_password": oldPassVa,
            "password": newPassVal,
            "password_confirmation": confNewPassVal
        };

        console.log("Data");
        console.log(data);
        if(localStorage.hasOwnProperty('userToken')){
            console.log("Inside Submit to send");
            var userTokenVal = localStorage.getItem('userToken');
            $.LoadingOverlay("show");
        $.ajax({
            type: 'POST',
            url: restPath,
            headers: {
                'Authorization': 'Bearer ' + userTokenVal.slice(1,-1)
            },
            data: data,
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("success");
                console.log("Inside Edit Profile success Fun");
                console.log(data);
                $.notify(JSON.stringify(data.message), "success");
                resetFields();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
                $.notify(JSON.stringify(XMLHttpRequest.responseJSON.errors) + " So password didn't change", "info");
            }
        });
    }
        return false;
    }
    /* form submit */




function resetFields() {
       $('#oldPassword').val('');
       $('#newPassword').val('');
       $('#confirmationPassword').val('');
   }


});