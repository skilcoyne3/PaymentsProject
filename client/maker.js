"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({height:'toggle'},200);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#domoMessage").animate({height:'hide'},200);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeDomoSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == '') {
            handleError("*All fields required!");
            return false;
        }

        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
        
        return false;
    });
    
});