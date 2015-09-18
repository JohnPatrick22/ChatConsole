var gSession = null;

function Session() {
	var session = new Object();
	session.tenant = null;
	session.tenantId = null;
	session.sessionId = null;
	session.profile = null;
	session.itemId = null;
	session.fromMedia = -1;
	session.templateId = null;
	session.templateQuestion = null;
	session.templateThankYouMessage = null;
	session.callbackURL = null;
	session.groupId = null;
	
	this.getSurveyUrl = function() {
		return ACCESS.ADMIN_URL;
	};
    this.getAdminUrl = function() {
		return ACCESS.ADMIN_URL;
    };
	
	
    this.setSessionId = function(sessionId) {
    	if (sessionId.length > 0) {
        	session.sessionId = sessionId;	
    	}
    };
    this.getSessionId = function() {
    	return session.sessionId;	
    };
    this.hasSessionId = function() {
    	return (session.sessionId != null);	
    };
    
	
    this.setProfile = function(profile) {
		session.profiles = profile;
	};
	this.getProfile = function() {
		return session.profiles;
	};
	
	
	this.setTenant = function(tenant) {
    	if (tenant.length > 0) {
    		session.tenant = tenant;
    	}
	};
	this.getTenant = function() {
		return session.tenant;
	};
	
	
	this.getTenantId = function() {
		return session.tenantId;
	};
	this.setTenantId = function(tenantId) {
		return session.tenantId = tenantId;
	};

	
	this.setItemId = function(itemId) {
		session.itemId = itemId;
	};
	this.getItemId = function() {
		return session.itemId;
	};
	
	
	this.setGroupId = function(groupId) {
		session.groupId = groupId;
	};
	this.getGroupId = function() {
		return session.groupId;
	};
	
	
	this.setFromMedia = function(fromMedia) {
		session.fromMedia = fromMedia;
	};
	this.getFromMedia = function() {
		return session.fromMedia;
	};
	
	
	this.setTemplateId = function(templateId) {
		session.templateId = templateId;
	};
	this.getTemplateId = function() {
		return session.templateId;
	};
	
	
	this.setCallbackURL = function(callbackURL) {
		// session.callbackURL = callbackURL;
		session.callbackURL = Utility.isValidObject(callbackURL, "");
		if (session.callbackURL == "") {
			session.callbackURL = null;
		}
	};
	this.getCallbackURL = function() {
		return session.callbackURL;
	};
    this.hasCallbackURL = function() {
    	return (session.callbackURL != null);	
    };
	
	
	this.setTemplateQuestion = function(templateQuestion) {
		session.templateQuestion = templateQuestion;
	};
	this.getTemplateQuestion = function() {
		return session.templateQuestion;
	};
	
	
	this.setTemplateThankYouMessage = function(templateThankYouMessage) {
		session.templateThankYouMessage = templateThankYouMessage;
	};
	this.getTemplateThankYouMessage = function() {
		return session.templateThankYouMessage;
	};
	
	
	this.getIsMobile = function() {
		return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)));
	};
	
	this.hasError = function() {
		return (session.tenant == null);
	};
	

	this.getUseVCCBridge = function() {
		return false;
	};
	
	
	this.trace = function() {
		Console.log(session);
	};
}