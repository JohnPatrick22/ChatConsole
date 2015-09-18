var gLoginEventHandler = null;

function LoginEventHandler() {
	var BUTTON_LOGIN 		= "buttonLogin";
	var BUTTON_PASSWORD 	= "forgotPassword";
	var BUTTON_REMEMBERME 	= "buttonRememberMe";
	
	this.init = function() {	
		$("#" + BUTTON_LOGIN).click(function() { handleLoginOnClickEvent(); } );
		$("#" + BUTTON_REMEMBERME).click(function() { handleRememberMeOnClickEvent(); } );
		$("#" + BUTTON_PASSWORD).click(function() { handleForgotPasswordOnClickEvent(); } );
		
		$("#username").on("focus", function() { gLoginEventHandler.clearErrorMessage(); });
		$("#password").on("focus", function() { gLoginEventHandler.clearErrorMessage(); });
		$("#password").on("keypress", function(event) { handleOnKeyPressEvent(event); });
	};

	
    this.removeClickEvent = function(_msg) {
        this.reset();

        $("#" + BUTTON_LOGIN).click( function() { alert(_msg); } );
        $("#" + BUTTON_REMEMBERME).click( function() { alert(_msg); } );
        $("#" + BUTTON_PASSWORD).click( function() { alert(_msg); } );
    };

    this.reset = function() {
		$("#" + BUTTON_LOGIN).unbind();
		$("#" + BUTTON_REMEMBERME).unbind();
		$("#" + BUTTON_PASSWORD).unbind();
		
		$("#username").off("focus");
		$("#password").off("focus");
		$("#password").off("keypress");
	};

    this.setCurrentItem = function(_currentUser) {
        var lvAgents = gSession.getAgents();
        if (lvAgents != null) {
            var lvAgent = lvAgents.getAgent(_currentUser[0]);
            if (lvAgent != null) {
                this.setUsername(lvAgent.getUsername());
                this.setPassword(gSession.getShortcutPassword());
                return ;
            }
        }

        this.setUsername("");
        this.setPassword("");
    };

    function handleLoginOnClickEvent() {
		gLoginEventHandler.setErrorMessage("");

		if (gLoginEventHandler.getUsername().length <= 0 || gLoginEventHandler.getPassword().length <= 0) {
			gLoginEventHandler.setErrorMessage("Please enter you username and password");

			return ;
		}

		if (gLoginEventHandler.getLoginRememberMe()) {
			Utility.setCookie(COOKIE_NAME, gLoginEventHandler.getUsername());
		} else {
			Utility.deleteCookie(COOKIE_NAME);
		}

		var lvUsername = gLoginEventHandler.getUsername();
		var lvPassword = gLoginEventHandler.getPassword();
		var lvTenant = "-1";
		var tmp = null;       

		if ((lvUsername.indexOf("\\") > 0) || (lvUsername.indexOf("/") > 0)) {
			if (lvUsername.indexOf("\\") > 0) {
				tmp = lvUsername.split("\\");
			} else if (lvUsername.indexOf("/") > 0) {
				tmp = lvUsername.split("/");
			}

			try {
				lvTenant = tmp[0];
				lvUsername = tmp[1];
			} catch (err) {
				gLoginEventHandler.setErrorMessage("Incorrect username format");
				return ;
			}
		} else {
			lvTenant = gSession.getTenant().getName();
			if (lvTenant.length > 0) {
				lvTenant = gSession.getTenant().getName();
			} else {
				lvTenant = "-1";
			}
		}

		gMessageSender.login(lvTenant, lvUsername, lvPassword, false, null, null);
	};


	function handleForgotPasswordOnClickEvent() {
		gLoginEventHandler.forgotPassword();
	};


	function handleRememberMeOnClickEvent() {
		gLoginEventHandler.setRememberMe(!gLoginEventHandler.getLoginRememberMe());
	};


	this.getLoginRememberMe = function() {
		return $("#" + BUTTON_REMEMBERME).hasClass("radioButtonSelected");
	};


	this.setRememberMe = function(_set) {
		if (_set) {
			$("#" + BUTTON_REMEMBERME).addClass("radioButtonSelected");
		} else {
			$("#" + BUTTON_REMEMBERME ).removeClass("radioButtonSelected");
		}
	};


	this.clearErrorMessage = function() {
		$("#errorMessage").val("");
	};

	
	this.setErrorMessage = function(_errorMessage) {
		$("#errorMessage").val(_errorMessage);
	};

	
	this.showLoginError = function() {
		$("#errorMessage").val("Invalid username / password");
	};

	
	this.setUsername = function(_username) {
		$("#username").val(_username);
	};

	
	this.getUsername = function() {
		return $("#username").val();
	};

	
	this.clearUsername = function() {
		gLoginEventHandler.setUsername("");
	};


	this.setPassword = function(_password) {
		$("#password").val(_password);
	};

	
	this.getPassword = function() {
		return $("#password").val();
	};

	
	this.clearPassword = function() {
		gLoginEventHandler.setPassword("");
	};

	
	this.forgotPassword = function() {
		// alert("LoginEventHandler ==> Forgot Password Clicked");
	};
	
	function handleOnKeyPressEvent(event) {
		if (event.keyCode === 13 || event.keyCode === 10) { // 10 is for mac
            event.preventDefault();
			handleLoginOnClickEvent();
        }
	};
}