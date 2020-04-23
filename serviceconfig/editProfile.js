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
            $.LoadingOverlay("show");
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
                $.LoadingOverlay("hide");
                console.log("success");
                console.log("Inside Edit Profile success Fun");
                console.log(data);



                localStorage.removeItem('userimg');
                localStorage.removeItem('fname');
                localStorage.removeItem('lname');            

                localStorage.setItem('userimg', JSON.stringify(data.data.user.profile_pic));
                localStorage.setItem('fname', JSON.stringify(data.data.user.first_name));
                localStorage.setItem('lname', JSON.stringify(data.data.user.last_name));
                 $('.userLoggedName').text('');
 $('.userLoggedName').text(localStorage.getItem('fname').slice(1, -1) + ' ' + localStorage.getItem('lname').slice(1, -1));
                 /*
                $.notify("Info updated success", "success");

                setTimeout(function() {
                     location.reload();
                }, 2000);
*/
               


                //location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
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



(function getUserImg() {

  if(localStorage.hasOwnProperty('userimg')){
       $('#userimg').attr('src', localStorage.getItem('userimg').slice(1, -1));
       $('.userLoggedName').text(localStorage.getItem('fname').slice(1, -1) + ' ' + localStorage.getItem('lname').slice(1, -1));
  }


    

})();