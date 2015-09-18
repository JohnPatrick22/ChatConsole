WindowControl.prototype.adjustLoginPage = function(){ 
    var loginSize = ["40%", null, "15%", "5%", "5%", "15%", "25%"];
    if (gSession.showUserPicture()) {
        loginSize = ["20%", "35%", "10%", "5%", "5%", "5%", "20%"];
    } 

    var elements = $("#index-page-login > .table > .row > .cell");
    
    for (var i=0; i<elements.length; i++) {
        if (loginSize[i] != null) {
            $(elements[i]).css("height", loginSize[i]);
        } else {
            $(elements[i]).hide();
        }
    }
}; 

Number.prototype.toOrdinal = function() {
	var n = this % 100;
	var suffix = ["th", "st", "nd", "rd", "th"];
	var ord = n < 21 ? (n < 4 ? suffix[n] : suffix[0]) : (n % 10 > 4 ? suffix[0] : suffix[n % 10]);
	return this + ord;
};
