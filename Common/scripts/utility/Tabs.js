var gTabs = null;

function Tabs(_tabs) {
    var tabs = _tabs;


    this.init = function() {
    	for (var i=0; i<tabs.length; i++) {
    		$(document).on("click", "[relGroup='" + tabs[i] + "']", function() {
        		gTabs.switchTabs($(this));
            });
//    		$("[relGroup=" + tabs[i] + "]").click(function() {
//        		gTabs.switchTabs($(this));
//            });
    	}
    };
    

    this.add = function(_tab) {
		/* $("[relGroup=" + _tab + "]").click(function() { */
    	
		$(document).on("click", "[relGroup='" + _tab + "']", function() {
    		gTabs.switchTabs($(this));
        });
    };

    
    this.switchTabs = function (obj) {
        var lvId = obj.attr("relDiv");
        var lvTabGroup = obj.attr("relGroup");
        var lvTabClass = obj.attr("relClass");
        var lvTabOther = obj.attr("relOther");
        
        Console.debug("Tab Clicked id [" + lvId + "] Group [" + lvTabGroup + "] Class [" + lvTabClass + "]");
        
        $(lvTabClass).hide();
        $("." + lvTabGroup + " span").removeClass("tabSelected");
        
        if (lvTabOther != null) {
        	$("#" + lvTabOther).removeClass("menuOtherSelected");
        }
        
       	setTimeout(function () { gListener.generateEvent(lvId, lvTabGroup, obj, null); }, 1);
        
       	$("#" + lvId).show(); 
        obj.addClass("tabSelected");
        
        if (gWindowControl != null) {
        	gWindowControl.setCurrentView(obj[0].id);
        }
    };
}
