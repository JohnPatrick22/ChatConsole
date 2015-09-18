
var gRole = null;

function Role() {
	var ROLES = new Array("Network Administrator", "Listen Only", "Engage", "All Access", "Business Analyst", "Supervisor / Administrator");

	this.getDescription = function(_role) {
		if (_role >= 0 && _role <= 5) {
			return ROLES[_role];
		}
		
		return "unknown";
	};
}