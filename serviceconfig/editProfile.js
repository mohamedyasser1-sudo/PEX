console.log("Inside Edit Profile JS");

var restPathUpdate = "http://ma3arf.com/aphrodite/public/api/update_account";




$('document').ready(function() {
    /* validation */
    $("#editForm").validate({
        rules: {
             first_name: {
                required: true,
                minlength: 3,
                maxlength: 15
            },
            website: {
                 required: true,
                 url: true
            }
        },
        messages: {
            first_name: "The first name must be at least 3 characters, and not be greater than 15 characters.",
            website: "The website format is invalid."
        },
        submitHandler: submitEditProfileForm
    });
    /* validation */
    /* form submit */
    function submitEditProfileForm() {
        console.log("Inside Submit");
        var data = $("#editForm").serialize();
        console.log("Data");
        console.log(data);
        if(localStorage.hasOwnProperty('userToken')){
            console.log("Inside Submit to send");
            var userTokenVal = localStorage.getItem('userToken');
        $.ajax({
            type: 'POST',
            url: restPathUpdate,
            //contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + userTokenVal.slice(1,-1)
            },
            data: data,
            beforeSend: function() {
               
            },
            success: function(data) {
                console.log("success");
                console.log("Inside Edit Profile success Fun");
                console.log(data);
                $.notify("Info updated success", "success");
                //location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
                $.notify(JSON.stringify(XMLHttpRequest.responseJSON.errors), "warn");
            }
        });
    }
        return false;
    }
    /* form submit */
});