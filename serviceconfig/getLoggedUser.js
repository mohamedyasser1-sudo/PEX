console.log("Inside Get Logged User JS");

var restPath = "http://ma3arf.com/aphrodite/public/api/me";

$('document').ready(function() {

    /* form submit */
    (function submitGetLoggedUser() {
        console.log("Inside Submit");
        //var data = $("#editForm").serialize();
        //console.log("Data");
        //console.log(data);
        if(localStorage.hasOwnProperty('userToken')){
            var userTokenVal = localStorage.getItem('userToken');
        $.ajax({
            type: 'GET',
            url: restPath,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + userTokenVal.slice(1,-1)
            },
           // data: data,
            beforeSend: function() {
               
            },
            success: function(data) {
                console.log("Inside success Fun");
                dataFill(data);

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
                if(JSON.stringify(XMLHttpRequest.status) == 401 ) {
                  window.location = "./index.html";
                  localStorage.removeItem('userToken');
                }

            }
        });
    }
        return false;
    })(this);
    /* form submit */

    /**/
});




function dataFill(data) {
 console.log("Indide dataFill Fun");

               
               $('#first-name').attr('placeholder', data.data.hasOwnProperty('first_name') ? ( !isEmptyStr(data.data.first_name) ? data.data.first_name : 'No Value entered') : 'No Value');
               $('#first-name').val(data.data.hasOwnProperty('first_name') ? ( !isEmptyStr(data.data.first_name) ? data.data.first_name : 'No Value entered') : 'No Value');
               $('#last-name').attr('placeholder', data.data.hasOwnProperty('last_name') ? ( !isEmptyStr(data.data.last_name) ? data.data.last_name : 'No Value entered') : 'No Value');
               $('#email-address').attr('placeholder', data.data.hasOwnProperty('email') ? ( !isEmptyStr(data.data.email) ? data.data.email : 'No Value entered') : 'No Value');
               $('#phone').attr('placeholder', data.data.hasOwnProperty('phone') ? ( !isEmptyStr(data.data.phone) ? data.data.phone : 'No Value entered') : 'No Value');
               $('#website').attr('placeholder', data.data.hasOwnProperty('website') ? ( !isEmptyStr(data.data.website) ? data.data.website : 'No Value entered') : 'No Value');
               $('#website').val(data.data.hasOwnProperty('website') ? ( !isEmptyStr(data.data.website) ? data.data.website : 'No Value entered') : 'No Value');
               $('#linkedin').attr('placeholder', data.data.hasOwnProperty('linkedin') ? ( !isEmptyStr(data.data.linkedin) ? data.data.linkedin : 'No Value entered') : 'No Value');
               $('#instagram').attr('placeholder', data.data.hasOwnProperty('instagram') ? ( !isEmptyStr(data.data.instagram) ? data.data.instagram : 'No Value entered') : 'No Value');
               $('#bio').attr('placeholder', data.data.hasOwnProperty('bio') ? ( !isEmptyStr(data.data.bio) ? data.data.bio : 'No Value entered') : 'No Value');
               $('#profile_pic').attr('src', data.data.hasOwnProperty('profile_pic') ? ( !isEmptyStr(data.data.profile_pic) ? data.data.profile_pic : './images/avatar.png') : 'No Value');


            }

function isEmptyStr(property) {
      return (property === null || property === "" || typeof property === "undefined");
   }