var MessageTypes = new Object();

MessageTypes.RESULT_SUCCESS                     	=  1;
MessageTypes.RESULT_ERROR                       	= -1;

MessageTypes.MSG_SEND_SURVEY_MESSAGE				= 900;
MessageTypes.MSG_GET_SESSION_INFORMATION			= 19000;


MessageTypes.getDescription = function(msgType) {
	switch(msgType) {
		case MessageTypes.MSG_SEND_SURVEY_MESSAGE: return "Send Survey Message";
		case MessageTypes.MSG_GET_SESSION_INFORMATION: return "Get Session Information";
		default: return "Unknow Type [" + msgType+ "]";
	}
};
