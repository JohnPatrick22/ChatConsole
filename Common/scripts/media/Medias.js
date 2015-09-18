var gMedias = null;

function Medias() {
    var DEFAULT         = "other";
    
    var medias = new Array();

    this.BEDO           = "debo";
    this.BLOGGER        = "blogger";
    this.DELICIOUS      = "delicious";
    this.DEVIANART      = "devianart";
    this.DIGG           = "digg";
    this.FACEBOOK       = "facebook";
    this.FLICKR         = "flickr";
    this.FRIENDFEED     = "friendfee";
    this.GOOGLEPLUS     = "googleplus";
    this.GOOGLE         = "google";
    this.LASTFM         = "last.fm";
    this.LINKEDIN       = "linkedin";
    this.MYSPACE        = "myspace";
    this.NEWSVINE       = "newsvine";
    this.NING           = "ning";
    this.ORKUT          = "orkut";
    this.PINTEREST      = "pinterest";
    this.REDDIT         = "reddit";
    this.RSS            = "rss";
    this.STUMBLEUPON    = "stumbleupon";
    this.TECHNORATI     = "technoratir";
    this.TUMBLR         = "tumblr";
    this.TWITTER        = "twitter";
    this.VIMEO          = "vimeo";
    this.WORDPRESS      = "wordpress";
    this.YAHOO          = "yahoo";
    this.YOUTUBE        = "youtube";
    this.ARTICLE        = "article";
    this.NOTE           = "note";
    this.TWDM           = "twitter direct";
    this.BITLY			= "bitly";
    this.NEWSCRED 		= "newscred";
    this.BLOGS			= "blogs";
    this.MESSAGEBOARDS 	= "messageboards";
    this.AMAZON			= "amazon";
    this.WIKIPEDIA		= "wikipedia";
    this.DAILYMOTION	= "dailymotion";
    this.TOPIX			= "topix";
    this.IMDB			= "imdb";
    this.CHANNEL		= "channel";
    this.VIDEOS			= "videos";
    this.TELLIGENT_STATUS = "telligent status";
    this.TELLIGENT_BLOG   = "telligent blog";
    this.TELLIGENT_FORUM  = "telligent forum";
    this.TELLIGENT_WIKI   = "telligent wiki";
    
    this.EMAIL          = "email";
    this.CHAT          	= "chat";
    this.AGENT_CHAT		= "agentchat";

    var showInAccount = [ this.TWITTER, this.FACEBOOK, this.LINKEDIN, this.YOUTUBE, this.YAHOO, this.GOOGLEPLUS, this.FLICKR, this.BLOGGER, this.MYSPACE, this.TUMBLR,  this.TELLIGENT_STATUS, this.TELLIGENT_BLOG, this.TELLIGENT_FORUM, this.TELLIGENT_WIKI ];
    // var showInAccount = [ this.TWITTER, this.FACEBOOK, this.LINKEDIN, this.YOUTUBE, this.YAHOO, this.GOOGLEPLUS, this.FLICKR, this.BLOGGER, this.MYSPACE, this.TUMBLR, this.TELLIGENT_STATUS ];
    
    var defaultSource = new Media(-1, DEFAULT, "unknown.png", null, false, false, 140, 0, null, null);
    
    this.getDefaultSource = function() {
    	return defaultSource;
    };
    
    
    this.showInAuthor = function(_type) {
    	for (var i=0; i<showInAccount.length; i++) {
    		if (showInAccount[i].toLowerCase() == _type.toLowerCase()) {
    			return true;
    		}
    	}
    	
    	return false;
    };

    
    this.add = function(_media) {
    	medias.push(_media);
    };

    this.get = function(_type) {
    	if (_type != null) {
    		var lvType = _type.toLowerCase();
    		if (lvType == "blog") {
    			lvType = "blogs";
    		}
    		
	        for (var i=0; i<medias.length; i++) {
	            if (medias[i].getType().toLowerCase() == lvType) {
	                return medias[i];
	            }
	        }
        }
        
        return null;
    };


    this.getFromId = function(_id) {
        for (var i=0; i<medias.length; i++) {
            if (medias[i].getId() == _id) {
                return medias[i];
            }
        }
        
        return null;
    };


    this.search = function(_type) {
    	if (_type != null) {
    		var lvType = _type.toLowerCase();
	        for (var i=0; i<medias.length; i++) {
	            if (medias[i].getType().toLowerCase() == lvType) {
	                return medias[i];
	            }
	        }

	        for (var i=0; i<medias.length; i++) {
	            if (lvType.indexOf(medias[i].getType().toLowerCase()) == 0) {
	                return medias[i];
	            }
	        }
        }
        
        return defaultSource;
    };
    
    
    this.getList = function() {
    	return medias;
    };

    
    this.getAddObject = function() {
        var mediaTypes = new Array();
        
        for (var i=0; i<medias.length; i++) {
        	mediaTypes.push(medias[i].getAddObject());
        }
        
        return mediaTypes;
    };
    
    
    this.getUpdateObject = function() {
    	return this.getAddObject();
    };
}
