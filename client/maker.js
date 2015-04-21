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
    
    $("#paymentsFormSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#errorPayments").animate({height:'hide'},200);
    
        if($("#payItem").val() == '' || $("#priceItem").val() == '') {
            handleError("*All fields required!");
            return false;
        }

        sendAjax($("#payForm").attr("action"), $("#payForm").serialize());
        
        return false;
    });
    
});