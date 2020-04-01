console.log("Inside Get All Tags User JS");



$('document').ready(function() {




    /* form submit */
    (function submitAllTages() {
        console.log("Inside Submit");
var restPath = "http://ma3arf.com/aphrodite/public/api/tags";
$.LoadingOverlay("show");
        $.ajax({
            type: 'GET',
            url: restPath,
            contentType: 'application/json',
            beforeSend: function() {
               
            },
            success: function(data) {
                $.LoadingOverlay("hide");
                console.log("Inside success Fun");
                console.log("Length");
                console.log(JSON.stringify(data.data.tags.length));


                    var tagsLen = JSON.stringify(data.data.tags.length);
                    var i;
                    for (i = 0; i < tagsLen; i++) {
                        //console.log(JSON.stringify(data.data.tags[i].name).slice(1,-1));
                        //console.log(JSON.stringify(data.data.tags[i].id));
                      drawTagEleme(JSON.stringify(data.data.tags[i].name).slice(1,-1), JSON.stringify(data.data.tags[i].id));
                    }



            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(JSON.stringify(XMLHttpRequest));
            }
        });
    
        return false;
    })(this);
    /* form submit */

    /**/
});



function drawTagEleme(val, id) {
var tagEleme = document.createElement("a");
tagEleme.setAttribute('class', "btn btn-primary tagWord");
tagEleme.setAttribute('id', id);
tagEleme.innerHTML = val;
tagEleme.onclick = function () {
    //alert($(this).attr("id"));
};
document.getElementById("tags").appendChild(tagEleme);
   }


