"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#errorPayments").animate({height:'toggle'},200);
		$("#errorMessage2").text(message);
        $("#errorLogin").animate({height:'toggle'},200);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#errorPayments").animate({height:'hide'},200);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#signupSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#errorLogin").animate({height:'hide'},200);
    
        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("*All fields required!");
            return false;
        }
        
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("*Passwords don't match!");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

    $("#loginSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#errorLogin").animate({height:'hide'},200);
    
        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("*Username or password is empty!");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
});