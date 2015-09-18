var gSession = null;

function Session(_application) {
    var TOTAL_NUMBER_OF_RECORD_MAX = 200; 

    var tenant = null;
    var user = null;
    var agent = null;
    var accessToken = null;
    
    var tenantId = null;
    var password = null;
    var username = null;
    var numberOfItems = -1;
    
    var timezone = null;
    var timezoneOffset = null;
    
    var authenticationHeader = null;
    
    var agents = null;
    
    var application = _application;
    
    var useVCCBridge = false;
    var testVCCBridge = false;
    var forceLogin = false;
    var acdLogin = 0;
    var sessionType = null;
    
    var provider = null;
    
//    this.init = function() {
//    };
    
    this.getProvider = function() {
    	if (provider == null) {
    		provider = new Provider();
    	}
    	
    	return provider;
    };
    
    this.setForceLogin = function(_forceLogin) {
    	forceLogin = _forceLogin;
    };
    
    this.getForceLogin = function() {
    	return forceLogin;
    };
    
    
    this.setSessionType = function(_sessionType) {
    	sessionType = _sessionType;
    };
    this.getSessionType = function() {
    	return sessionType;
    };
    
    

    this.setAccessToken = function(_accessToken) {
    	accessToken = _accessToken;
    };
    

    this.getAccessToken = function() {
    	return accessToken;
    };
    
    
    this.setACDLogin = function(_acdLogin) {
    	acdLogin = _acdLogin;
    };
    
    this.getACDLogin = function() {
    	return acdLogin;
    };
    
    
    this.isACDLogin = function() {
    	return (acdLogin == 1);
    };
    
    
    this.setUseVCCBridge = function(_useVCCBridge) {
    	useVCCBridge = _useVCCBridge;
    };
    this.getUseVCCBridge = function() {
    	return useVCCBridge;
    };

    
    this.setUseTestVCCBridge = function(_testVCCBridge) {
    	testVCCBridge = _testVCCBridge;
    };
    this.getUseTestVCCBridge = function() {
    	return testVCCBridge;
    };

    
    this.isLoggeedIn = function() {
        return ((user != null) || (agent != null));
    };
    
    
    this.setApplication = function(_application) {
    	application = _application;
    };

    
    this.reset = function() {
        tenantId = null;
        tenant = null;
        
        user.reset();
        
        user = null;
        password = null;
    };
    
    
    this.getTimezone = function() {
    	if (timezone == null) {
        	timezone = jstz.determine();
    	}
    	
		return timezone.name();
    };
    
    
    this.getTimezoneOffset = function() {
    	if (timezoneOffset == null) {
    		
    		timezoneOffset = ((new Date()).getTimezoneOffset()) * 60;
    	}
    	
    	return timezoneOffset;
    };

    
    this.setTenant = function(_tenant) {
    	tenant = Utility.isValidObject(_tenant, null);
    	if (tenant.length == 0) {
    		tenant = null;
    	}
    };

    
    this.getTenant = function() {
        return tenant;
    };


    this.resetTenant = function() {
        tenant = null;
    };
    
    
    this.setUser = function(_user) {
    	user = _user;
    };
    
    
    this.getUser = function() {
        return user;
    };
    
    
    this.resetUser = function() {
        user = null;
    };

    
    this.isLoggedIn = function() {
        return ((user != null) || (agent != null));
    };

    
    this.resetAgents = function() {
        agents = null;
    };
    this.setAgents = function(_agents) {
        agents = _agents;
    };
    this.getAgents = function() {
        return agents;
    };

    
    this.reset = function() {
    	username = null;
    	password = null;
    };
    
    
    this.setTenantId = function(_tenantId) {
        tenantId = _tenantId;
        
        tenant.setId(tenantId);
    };
    
    
    this.getTenantId = function() {
        return tenantId;
    };

    
    this.setAgent = function(_agent) {
        agent = _agent;
    };
    
    
    this.getAgent = function() {
        return agent;
    };
    
    
    this.setUsername = function(_username) {
    	username = _username;
    };
    
    
    this.getUsername = function() {
    	if (agent == null) {
    		return username;
    	} else {
    		return agent.getUsername();
    	}
    };

    
    this.getShortcutPassword = function() {
        if (_shortcutPassword == undefined || _shortcutPassword == null) {
            return "";
        }
        
        return _shortcutPassword;
    };

    
    this.setPassword = function(_password) {
        password = _password;
        _shortcutPassword = _password;
    };
    
    
    this.getPassword = function() {
        return password;
    };
    
    
    this.setNumberOfItems = function(_numberOfItems) {
    	numberOfItems = _numberOfItems;
    };
    
    
    this.getNumberOfItems = function() {
        if (numberOfItems > -1) {
            return numberOfItems;
        }
        
        return TOTAL_NUMBER_OF_RECORD_MAX;
    };
    
    
    this.resetAuthenticationHeader = function() {
    	authenticationHeader = null;	
    };
    
    this.getAuthenticationHeader = function() {
    	if (application == AGENT_APPLICATION) {
    		authenticationHeader = null;
    	}
    	
    	if (authenticationHeader == null) {
    		if (accessToken == null) {
    			authenticationHeader = tenant.getName() + (useVCCBridge ? ";-;-" : ";;") + username + ":" + password;
    		} else {
    			authenticationHeader = tenant.getName() + (useVCCBridge ? ";-;-" : ";;") + username + ":" + (accessToken.length > 0 ?  accessToken : password);
    		}
		}
    	
    	return authenticationHeader;
    };
    
    
    this.getStandAloneAdminUrl = function() {
		return ACCESS.STAND_ALONE_ADMIN_URL;
    };
    
    this.getAdminUrl = function() {
		return ACCESS.ADMIN_URL;
    };

    
    this.getReportUrl = function() {
		return ACCESS.ADMIN_REPORT_URL;
    };
    
    
    this.getAgentReportUrl = function() {
        return ACCESS.AGENT_REPORT_URL;
    };

    
    this.getSocketUrl = function() {
        return ACCESS.SOCKET_URL;
    };
    

    this.getTokenUrl = function() {
        return ACCESS.TOKEN_URL;
    };

    
    this.showUserPicture = function() {
    	return (application == AGENT_APPLICATION && tenant != null);
    };

    
    this.getHasReceiveUsers = function() {
        return (agents != null);
    };
    
    
    this.hasAccessToTenantView = function() {
      return user.isNetAdmin();
    };
    

    this.getMaxNumberOfRecords = function() {
        if (overideNumberOfItems > -1) {
            return overideNumberOfItems;
        }
        
        return TOTAL_NUMBER_OF_RECORD_MAX;
   };
}