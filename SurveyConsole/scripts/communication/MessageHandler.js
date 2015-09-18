var gMessageHandler = null;

function MessageHandler() {
    this.handleMessage = function(lvMsg) {
    	lvMsg.desc = MessageTypes.getDescription(lvMsg.msgType); 
        
        switch (lvMsg.msgType) {
	    	case MessageTypes.MSG_SEND_SURVEY_MESSAGE:
	    	case MessageTypes.MSG_GET_SESSION_INFORMATION:
        		gSurveyMessageHandler.handleMessage(lvMsg);
        		return;

        	/**
             * Problem...
             */
            default:
                Console.error("Unknown message type " + lvMsg.msgType);
                return;
        }
    };
}