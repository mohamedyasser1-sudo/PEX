//Note, 
/*
 As ajax is by nature asyc. The code doesn't wait for the response from your success callback, so the data isn't accessible outside of success unless passed.
 So if you need to add or fire any request, do this four steps,
    1- Add your ajax fun in myCommonServices class.
    2- Add fire fun and put the right params.
    3- Call fire fun at any event you need.
    4- Create handleXXXResponse fun Ex. for this fun see the [handleLoginResponse] below.
*/
"use strict";
var myCommonServices = {
	/* Properties */
	authCode: "", // if use put your base64 strign or may be {{token}}
	mainUrl: "main_url/", // Here add your base REST URL
	contentTypeApplicationJSON: 'application/json',
	contentTypeApplicationXWWw: 'application/x-www-form-urlencoded; charset=UTF-8',
	/* Getter methods */
	getAuthCode: function() {
		return this.authCode;
	},
	getContentTypeApplicationJSON: function() {
		return this.contentTypeApplicationJSON;
	},
	getContentTypeApplicationXWWw: function() {
		return this.contentTypeApplicationXWWw;
	},
	/* Setter methods */
	setAuthCode: function(newAuthCode) {
		this.authCode = newAuthCode;
	},
	/* methods */
	loginServices: function(serviceUrl, payload, contentType, asynchronized, headers) {
		var payloadStr = '';
		if (typeof payload === 'string' || payload instanceof String) {
			payloadStr = payload;
		} else {
			payloadStr = JSON.stringify(payload);
		}
		$.ajax({
			type: "POST",
			async: asynchronized,
			url: serviceUrl,
			headers: headers,
			contentType: contentType,
			data: payloadStr,
			success: function(data) {
				handleLoginResponse(data);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log("Error: " + errorThrown);
			}
		});
	},
    	registerServices: function(serviceUrl, payload, contentType, asynchronized, headers) {
		var payloadStr = '';
		if (typeof payload === 'string' || payload instanceof String) {
			payloadStr = payload;
		} else {
			payloadStr = JSON.stringify(payload);
		}
		$.ajax({
			type: "POST",
			async: asynchronized,
			url: serviceUrl,
			headers: headers,
			contentType: contentType,
			data: payloadStr,
			success: function(data) {
				handleRegisResponse(data);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log("Error: " + errorThrown);
			}
		});
	},
        	getLoginUserServices: function(serviceUrl, contentType, asynchronized, headers) {
		$.ajax({
			type: "GET",
			async: asynchronized,
			url: serviceUrl,
			headers: headers,
			contentType: contentType,
			success: function(data) {
				handleGetLoginUserResponse(data);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log("Error: " + errorThrown);
			}
		});
	},
        	updateAccInfoServices: function(serviceUrl, payload, contentType, asynchronized, headers) {
		var payloadStr = '';
		if (typeof payload === 'string' || payload instanceof String) {
			payloadStr = payload;
		} else {
			payloadStr = JSON.stringify(payload);
		}
		$.ajax({
			type: "POST",
			async: asynchronized,
			url: serviceUrl,
			headers: headers,
			contentType: contentType,
			data: payloadStr,
			success: function(data) {
				fireUpdateAccInfoService(data);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log("Error: " + errorThrown);
			}
		});
	}
};

// Strat Login Service
function fireLoginService() {
	var serviceURL = myCommonServices.mainUrl + "login";
    var payload = {};
	var headers = {};
	myCommonServices.loginServices(serviceURL, payload, myCommonServices.contentTypeApplicationJSON, true, headers);
}

function handleLoginResponse(data) {
	alert(JSON.stringify(data));
}
// End Login Service


// Strat Register Services
function fireRegisService() {
	var serviceURL = myCommonServices.mainUrl + "register";
    var payload = {};
	var headers = {};
	myCommonServices.loginServices(serviceURL, payload, myCommonServices.contentTypeApplicationJSON, true, headers);
}

function handleRegisResponse(data) {
	alert(JSON.stringify(data));
}
// End Register Services




// Strat Get Login User Services
function fireGetLoginUserService() {
	var serviceURL = myCommonServices.mainUrl + "me";
	var headers = {};
	myCommonServices.loginServices(serviceURL, myCommonServices.contentTypeApplicationJSON, true, headers);
}

function handleGetLoginUserResponse(data) {
	alert(JSON.stringify(data));
}
// End Get Login User Services




// Strat Update Account Info Services
function fireUpdateAccInfoService() {
	var serviceURL = myCommonServices.mainUrl + "update_account";
    var payload = {};
	var headers = {};
	myCommonServices.loginServices(serviceURL, payload, myCommonServices.contentTypeApplicationJSON, true, headers);
}

function handleUpdateAccInfoResponse(data) {
	alert(JSON.stringify(data));
}
// End Update Account Info Services