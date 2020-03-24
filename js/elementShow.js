$('document').ready(function() {


if(localStorage.hasOwnProperty('userToken')){
    $(".anonymousHiddenElement").hide();
}
else {

	$(".showenElement").hide();
}

});