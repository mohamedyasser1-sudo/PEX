console.log("Inside Join JS");

var restPath = "http://ma3arf.com/aphrodite/public/api/register";
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
    /* form submit */
    function submitJoinForm() {
        console.log("Inside Submit");
        var data = $("#joinForm").serialize();
        /*
        var mailVa = $('#email-address').val();
        var passVal = $('#password').val();
        var filePath = $('#profile_pic').val();
        console.log("Data");
        console.log(data);
        console.log(filePath);
        //console.log(data + '&profile_pic=' + filePath);
        */
        if (!localStorage.hasOwnProperty('userToken')) {
            $.LoadingOverlay("show");
        $.ajax({
            type: 'POST',
            url: restPath,
            data: data,
            beforeSend: function() {
                $("#error").fadeOut();
                $("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span>   sending ...');
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("success");
                console.log(data);
                localStorage.setItem('userToken', JSON.stringify(data.data.token));
                localStorage.setItem('userimg', JSON.stringify(data.data.user.profile_pic));
                localStorage.setItem('fname', JSON.stringify(data.data.user.first_name));
                localStorage.setItem('lname', JSON.stringify(data.data.user.last_name));
                localStorage.setItem('userId', JSON.stringify(data.data.user.id));
                $.notify("Congrats, Now your are a member", "success");
                setTimeout(function() {
                    window.location = "./profile.html";
                }, 2000);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
            }
        });
    }
        return false;
    }
    /* form submit */
});