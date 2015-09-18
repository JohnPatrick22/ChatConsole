var Dialogs = new Dialogs();

function Dialogs() {
    var forceClosePopupTimer = null;
    // var defaultDialogTimeOut = 30000;
	
    this.message = function(_title, _message) {
        var lvButtons = { 
        		Close: function() {
        			$(this).dialog("close"); 
        		} 
        };  

        showModalDialog(_title, _message, lvButtons);
    };

    
    this.confirmDialog = function(title, msg, callbackYes, callbackNo, parameters) {
        var buttons = { 
        		Yes: function() {
        			if (callbackYes) {
        				callbackYes(parameters);
        			}
        			$(this).dialog("close"); 
        		}, 
        		No: function() { 
        			if (callbackNo != null) {
        				callbackNo(parameters);
        			}
        			$(this).dialog("close"); 
        		} 
        };  

        showQuestionDialog(title, msg, buttons);
    };
    
    
    this.waitingDialog = function(title, callbackOK, parameters, timeoutBeforeError) {
        var lvButtons = { 
        		OK: function() {
        			if (callbackOK) {
        				callbackOK(parameters);
        			}
        			$(this).dialog("close"); 
        		} 
        };  

    	var dialogContainer = showModalDialog(title, "Please wait...", lvButtons);
    	
    	dialogContainer.find(".dialogMessageContainer").addClass("waiting");
    	
    	$(".ui-dialog-buttonpane button").button("disable");
    	$(".ui-dialog-titlebar-close").button("disable");
	
    	if (timeoutBeforeError!= null && timeoutBeforeError > 0) {
    		forceClosePopupTimer = setTimeout(function() { errorTimeout(); }, (timeoutBeforeError * 1000));
    	}
    };
    
    
    this.showErrorMessageInDialog = function(msg, timeoutBeforeClose) {
    	showMessageInDialog($("#dialog-modal"), "error", msg, timeoutBeforeClose);
    };
    this.showSuccessMessageInDialog = function(msg, timeoutBeforeClose) {
    	showMessageInDialog($("#dialog-modal"), "success", msg, timeoutBeforeClose);
    };
    this.showWarningMessageInDialog = function(msg, timeoutBeforeClose) {
    	showMessageInDialog($("#dialog-modal"), "warning", msg, timeoutBeforeClose);
    };
    this.showQuestionMessageInDialog = function(msg, timeoutBeforeClose) {
    	showMessageInDialog($("#dialog-modal"), "question", msg, timeoutBeforeClose);
    };
    this.showInformationMessageInDialog = function(msg, timeoutBeforeClose) {
    	showMessageInDialog($("#dialog-modal"), "information", msg, timeoutBeforeClose);
    };
    
    
    
    function showQuestionDialog(title, msg, buttons) {
    	var dialogContainer = showModalDialog(title, msg, buttons);

    	dialogContainer.find(".dialogMessageContainer").addClass("question");
    };

    
    function showModalDialog(lvTitle, lvMsg, lvButtons) {
    	var dialogContainer = $("#dialog-modal");
    	
    	dialogContainer.dialog({ 
    		height: 200, width: 450, modal: true, resizable: false, closeText: 'hide', dialogClass: "textSize12px", title: lvTitle, draggable: true, buttons: lvButtons
        });
        
    	resetDialog(dialogContainer);
    	
    	dialogContainer.find(".dialogMessage").html(lvMsg);
    	
    	return dialogContainer;
    };
    
    
    function resetDialog(dialogContainer) {
    	$(".ui-dialog-buttonpane button").button("enable");
    	$(".ui-dialog-titlebar-close").button("enable");
    	
    	dialogContainer.find(".dialogMessageContainer").removeClass("waiting error success warning information question");
    	dialogContainer.find(".dialogMessage").html("");
    };
    
    
    function errorTimeout() {
    	Dialogs.showErrorMessageInDialog("Error, no answer from server in the time allowed!");
    };
    
    
    function closeTimeout(dialogContainer) {
    	dialogContainer.dialog("close");
    	forceClosePopupTimer = null;
    };

    
    function showMessageInDialog(dialogContainer, className, msg, timeoutBeforeClose) {
    	if (forceClosePopupTimer != null) {
	    	clearTimeout(forceClosePopupTimer);
	    	forceClosePopupTimer = null;
    	}
    	
    	if (timeoutBeforeClose!= null && timeoutBeforeClose > 0) {
    		forceClosePopupTimer = setTimeout(function() { closeTimeout(dialogContainer); }, (timeoutBeforeClose * 1000));
    	}
    	
    	dialogContainer.find(".dialogMessageContainer").removeClass("waiting");
    	dialogContainer.find(".dialogMessageContainer").addClass(className);
    	dialogContainer.find(".dialogMessage").html(msg);
    	
        $(".ui-dialog-buttonpane button").button("enable");
        $(".ui-dialog-titlebar-close").button("enable");
    };
}