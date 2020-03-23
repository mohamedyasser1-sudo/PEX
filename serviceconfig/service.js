
var token_ = ""; // variable will store the token

$('document').ready(function() {

	// Start Login

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
		//var data = $("#loginForm").serialize();
		var mailVa = $('#email-address').val();
		var passVal = $('#password').val();
		var data = {
			"email": mailVa,
			"password": passVal
		};
		console.log("Data");
		console.log(data);
		$.ajax({
			type: 'POST',
			url: 'https://pixels-sha.000webhostapp.com/pixels/public/api/login',
			data: data,
			beforeSend: function() {
				$("#error").fadeOut();
				$("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span>   sending ...');
			},
			success: function(data) {
				console.log("success");
				//console.log(data);
				var resData = JSON.stringify(data.data.user.name);
				//var accName = data.user.name;
				console.log(resData.name);
				$('#alert-msg .msgConrent').html('');
				$("#alert-msg").removeClass("display-none");
				$("#alert-msg").addClass("display-block");
				$('#alert-msg .msgConrent').append("<strong>Hello!</strong> " + JSON.stringify(data.data.user.name));
				setTimeout(function() {
					window.location = "./index.html";
				}, 3000);
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
				setTimeout(function() {
					$("#alert-msg").removeClass("display-block");
					$("#alert-msg").addClass("display-none");
				}, 3000);
			}
		});
		return false;
	}
	/* form submit */

	// End Login


   // Start Join

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
	var mailVa = $('#email-address').val();
	var passVal = $('#password').val();
	console.log("Data");
	console.log(data);
	$.ajax({
		type: 'POST',
		url: 'https://aphrodite6.000webhostapp.com/public/api/register',
		data: data,
		beforeSend: function() {
			$("#error").fadeOut();
			$("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span>   sending ...');
		},
		success: function(data) {
			console.log("success");
			console.log(data);
			setTimeout(function() {
				window.location = "./profile.html";
			}, 2000);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
			console.log(JSON.stringify(XMLHttpRequest));
		}
	});
	return false;
}
/* form submit */

   // End Join

});
