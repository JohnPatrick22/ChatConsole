function Media(_id, _type, _icon, _url, _showInAuthor, _isActive, _maxPostChar, _outbound, _messageDisplay, _replyDisplay) {
    var id = _id;
    var type = _type.toLowerCase();
    var name = _type;
    var icon = _icon;
    var url = _url;
    var show = _showInAuthor;
    var isActive = (parseInt(Utility.isValidObject(_isActive, "0")) == 1);
    var maxPostChar = parseInt(Utility.isValidObject(_maxPostChar, "140"));
    var outbound = (parseInt(Utility.isValidObject(_outbound, "0")) == 1);
    var messageDisplay = (Utility.isValidObject(_messageDisplay, null));
    var replyDisplay = (Utility.isValidObject(_replyDisplay, null));

    this.getId = function() {
        return id;
    };

    
    this.getType = function() {
        return type;
    };

    
    this.getIcon = function() {
    	return "./images/media/" + icon;
    };
    
    this.getSourceIcon = function() {
    	return "./images/sources/" + icon;
    };
    
    
    this.getURL = function() {
        return url;
    };
    
	
    this.show = function() {
    	return show;
    };

    
    this.getStyle = function() {
    	if (type.indexOf(" ") > -1) {
    		return type.replace(" ","-");
    	}
    	
		return type;
	};


    this.getIsActive = function() {
		return isActive;
	};

	
    this.setIsActive = function(_isActive) {
		isActive = _isActive;
	};
	
	
	this.getName = function() {
		return name;
	};


    this.getAddObject = function() {
    	var object = new Object();
    	
    	object.id = id;
    	object.type = type;
    	object.icon = icon;
    	object.url = url;
    	object.isActive = (isActive ? 1 : 0);
    	
    	return object;
    };
    
    
    this.getUpdateObject = function() {
    	return this.getAddObject();
    };

    
    this.getMaxPostChar = function() {
    	return maxPostChar;
    };

    
    this.isFacebook = function() {
    	return (type.indexOf("facebook") == 0);
    };
    
    
    this.isTwitter = function() {
    	return (type.indexOf("twitter") == 0);
    };
    
    
    this.isTelligent = function() {
    	return (type.indexOf("telligent") == 0);
    };

    
    this.isNote = function() {
    	return ("note" == type);
    };
    

    this.canGetRelation = function() {
        return (this.isFacebook() || this.isTwitter());
    };

    
    this.canUpdateAccount = function(_s) {
        return (this.isFacebook() || this.isTwitter());
    };
    

    this.canSubmit = function() {
        return (this.isFacebook() || this.isTwitter() || this.isTelligent());
    };
    
    this.getIsOutbound = function() {
    	return outbound;
    };


    this.getMessageDisplay = function() {
    	return messageDisplay;
    };
    this.getEnableMessageButton = function() {
    	return (messageDisplay != null);
    };
    
    
    this.getReplyDisplay = function() {
    	return replyDisplay;
    };
    this.getEnableReplyButton = function() {
    	return (replyDisplay != null);
    };
}
