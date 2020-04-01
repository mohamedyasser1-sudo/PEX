console.log("Inside Get All Cats User JS");



$('document').ready(function() {




    /* form submit */
    (function submitGetAllCats() {
        console.log("Inside Submit");
var restPath = "http://ma3arf.com/aphrodite/public/api/categories";
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
                console.log(JSON.stringify(data.data.categories.length));


                    var catsLen = JSON.stringify(data.data.categories.length);
                    var catsData = JSON.stringify(data.data.categories);
                    var i;
                    for (i = 0; i < catsLen; i++) {
                        //console.log(JSON.stringify(data.data.categories[i].name).slice(1,-1));
                      drawCatEleme(JSON.stringify(data.data.categories[i].name).slice(1,-1), JSON.stringify(data.data.categories[i].id));
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



function drawCatEleme(val, id) {
var catEleme = document.createElement("a");
catEleme.setAttribute('class', "btn btn-primary catWord");
catEleme.setAttribute('id', id);
catEleme.innerHTML = val;
document.getElementById("cats").appendChild(catEleme);
   }


