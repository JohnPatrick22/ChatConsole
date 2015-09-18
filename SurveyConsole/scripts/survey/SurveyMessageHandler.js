var gSurveyMessageHandler = null;

function SurveyMessageHandler() {
	
	this.handleMessage = function(jsonMessage) {
		switch (jsonMessage.msgType) {
			case MessageTypes.MSG_SEND_SURVEY_MESSAGE:
		    	handleSendSurveyMessage(jsonMessage);
		    	return ;
				
		    case MessageTypes.MSG_GET_SESSION_INFORMATION:
		    	handleGetSessionInformation(jsonMessage);
		    	return ;
		}		
	};
	
	
	function handleSendSurveyMessage(jsonMessage) {
		Console.log( "handleConfirmationMessageFromServer", jsonMessage);
		if (jsonMessage.status == MessageTypes.RESULT_SUCCESS) {
			if (gSession.hasCallbackURL()) {
				window.location.href = gSession.getCallbackURL();
			} else {
				$.mobile.changePage("#sent-page");
			}
		} else {
			$.mobile.changePage("#error-page");
		}
	};
	
	
	function handleGetSessionInformation(jsonMessage) {
		Console.log( "handleGetSessionInformation", jsonMessage);

		gSession.setTenant(jsonMessage.tenant);
		gSession.setProfile(jsonMessage.profileName);
		gSession.setGroupId(jsonMessage.groupId);
		
		gSession.setTemplateId(jsonMessage.templateId); 
		gSession.setTemplateQuestion(jsonMessage.templateQuestion); 
		gSession.setTemplateThankYouMessage(jsonMessage.templateThankyouMessage); 
		
		var parameters = JSON.parse(jsonMessage.parameters);
		for (var i=0; i<parameters.length; i++) {
			switch (parameters[i].key) {
			case "fromMedia":
				gSession.setFromMedia(parameters[i].value); 
				break;

			case "itemId":
				gSession.setItemId(parameters[i].value); 
				break;

			case "callbackURL":
				gSession.setCallbackURL(parameters[i].value); 
				break;
			}
		}
		
		gSurveyEventHandler.handleSessionInformaiton();
	};
	
	
	function handleMessageError(jsonMessage) {
		Console.log( "handleMessageError", jsonMessage);
		
		$.mobile.changePage("#error-page");
	};
	
	
	function handleMessageFailed(jsonMessage) {
		Console.log("handleMessageFailed", jsonMessage);
		
		$.mobile.changePage("#error-page");
	};
	
	
	this.handleMessageFailed = function(jsonMessage) {
		handleMessageFailed(jsonMessage);
    };
}