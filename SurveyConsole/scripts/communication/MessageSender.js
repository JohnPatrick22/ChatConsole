var gMessageSender = null;

function MessageSender() {
	this.sendSurveyRequest = function(surveyRequest) {
        Console.debug("MessageSender - sendSurveyRequest ", surveyRequest);
        
        var lvPathname  = "/tenants/" + surveyRequest.tenantName + "/surveyresults";

        gHTTPCommunication.POSTEx(lvPathname, surveyRequest, gSession.getSurveyUrl(), gSurveyMessageHandler.handleMessageFailed);
	};
	

    this.getSessionInformation = function(sessionId) {
        Console.debug("MessageSender - getSessionInformation", sessionId);
        
        var lvPathname  = "/text/session/" + sessionId;

        gHTTPCommunication.GETEx(lvPathname, null, gSession.getSurveyUrl(), gSurveyMessageHandler.handleMessageFailed);
    };


	this.log = function(severity, msg) {
		if (gSession.getTenant() == null || gSession.getAgent() == null) {
			return ;
		}
		
        var lvPathname  = "/tenants/" + gSession.getTenant().getId() + "/logs/" + gSession.getAgent().getId();  

        var object = new Object();
        object.date = (new Date()).toString(); 
        object.severity = severity; 
        object.msg = msg; 
        
        console.log(object);
        
        gHTTPCommunication.POSTEx(lvPathname, object, gSession.getAdminUrl(), null);
	};
}