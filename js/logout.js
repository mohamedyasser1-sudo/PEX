console.log("Inside Logout JS");

var restPathLogout = "http://ma3arf.com/aphrodite/public/api/logout";

$('document').ready(function() {

    /* form submit */
    function submitLogout() {
        console.log("Inside Submit");
        //var data = $("#editForm").serialize();
        //console.log("Data");
        //console.log(data);
        if(localStorage.hasOwnProperty('userToken')){
            var userTokenVal = localStorage.getItem('userToken');
            $.LoadingOverlay("show");
        $.ajax({
            type: 'POST',
            url: restPathLogout,
            headers: {
                'Authorization': 'Bearer ' + userTokenVal.slice(1,-1)
            },
           // data: data,
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("Inside success Fun");
                $.notify("You logout, Looking forward to your return", "success");
                localStorage.removeItem('userToken');
                window.location = "./index.html";
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
            }
        });
    }
        return false;
    }
    /* form submit */

    /**/



  $("#logoutBtn").click(function(event){
    event.preventDefault();
    $.LoadingOverlay("show");
    $.notify("You logout, Looking forward to your return", "success");
    localStorage.removeItem('userToken');
    window.location = "./index.html";
    //submitLogout();
  });

});
