console.log("Inside Login JS");

var restPath = "http://ma3arf.com/aphrodite/public/api/login";

$('document').ready(function() {
    /* validation */
    $("#loginForm").validate({
        rules: {
            mail: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 2,
                maxlength: 10
            }
        },
        messages: {
            mail: "Enter a Valid Email",
            password: {
                required: "Provide a Password",
                minlength: "Password Needs To Be Minimum of 8 Characters"
            }
        },
        submitHandler: submitLoginForm
    });
    /* validation */
    /* form submit */
    function submitLoginForm() {
        console.log("Inside Submit");
        var isUserLoggedIn = false;
        //var data = $("#loginForm").serialize();
        var mailVa = $('#email-address').val();
        var passVal = $('#password').val();
        var data = {
            "email": mailVa,
            "password": passVal
        };
        console.log("Data");
        console.log(data);
        if(!localStorage.hasOwnProperty('userToken')){
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
                console.log("success");
                console.log(data);
                //var resData = JSON.stringify(data.data.user.name);
                //var accName = data.user.name;
                //console.log(resData.name);
                $.LoadingOverlay("hide");
                localStorage.setItem('userToken', JSON.stringify(data.data.token));
                $('#alert-msg .msgConrent').html('');
                $("#alert-msg").removeClass("display-none");
                $("#alert-msg").addClass("display-block");
                $(".alert").addClass("alert-success");
                $(".alert").removeClass("alert-danger");
                //alert(JSON.stringify(data.data.user.first_name));
                $('#alert-msg .msgConrent').append("<strong>Hello!</strong> " + JSON.stringify(data.data.user.first_name));
                $.notify("Access granted, Hello" + JSON.stringify(data.data.user.first_name), "success");
                setTimeout(function() {
                    window.location = "./index.html";
                }, 1000);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
                $('#alert-msg .msgConrent').html('');
                $("#alert-msg").removeClass("display-none");
                $("#alert-msg").addClass("display-block");
                $(".alert").removeClass("alert-success");
                $(".alert").addClass("alert-danger");
                $('#alert-msg .msgConrent').append("<strong>This is a danger!</strong> " + JSON.stringify(XMLHttpRequest.responseJSON.errors));
                $.notify("BOOM!, " + JSON.stringify(XMLHttpRequest.responseJSON.errors), "error");
                setTimeout(function() {
                    $("#alert-msg").removeClass("display-block");
                    $("#alert-msg").addClass("display-none");
                }, 3000);
            }
        });
}
        return false;
    }
    /* form submit */
});