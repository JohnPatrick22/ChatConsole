var ROLES = new Array("Network Administrator", "Listen Only", "Engage", "All Access", "Business Analyst", "Supervisor / Administrator", "Portal");

var NETADMIN                    = 0;
var LISTENONLY                  = 1;
var ENGAGE                      = 2;
var ALL_ACCESS                  = 3;
var BUSINESS_ANALYST            = 4;
var SUPERVISOR_ADMINISTRATOR    = 5;
var PORTAL    					= 6;

function User(_tenantId, _id, _email, _password, _firstname, _lastname, _role, _creationTime, _icon, _localFileName) {
    var tenantId = parseInt(_tenantId);
    var id = parseInt(_id);
    var email = _email;
    var password = _password;
    var firstname = _firstname;
    var lastname = _lastname; 
    var role = parseInt(_role);
    var creationTime = parseInt(_creationTime);
   
    
    var icon = _icon;
    var localFileName = _localFileName;
    
    
   
    this.setIcon = function(_icon) {
        icon = _icon;  
    };
    
    this.getIcon = function() {
        return icon;
    };
    
    this.setLocalFileName = function(_localFileName) {
    	localFileName = _localFileName;  
    };
      
    
    this.getLocalFileName = function() {
        return localFileName;
    };
        
    this.setTenantId = function(_tenantId) {
        tenantId = _tenantId;  
    };
      
    
    this.getTenantId = function() {
        return tenantId;
    };

    
    this.setId = function(_id) {
        id = _id;  
    };
      
    
    this.getId = function() {
        return id;
    };
    
    
    this.setEmail = function(_email) {
        email = _email;  
    };
      
    
    this.getEmail = function() {
        return email;
    };
    
    
    this.setPassword = function(_password) {
        password = _password;  
    };
      
    
    this.getPassword = function() {
        return password;
    };
      
    
    this.setFirstname = function(_firstname) {
        firstname = _firstname;
    };

    
    this.getFirstname = function() {
        return firstname;
    };
    
    
    this.setLastname = function(_lastname) {
      lastname = _lastname;  
    };
    
    
    this.getLastname = function() {
        return lastname;
    };

    
    this.setRole = function(_role) {
        if (typeof _role == "string") {
            _role = parseInt(_role);
        }

        role = _role;  
    };
      
    
    this.getRole = function() {
        return role;
    };
    
    
    this.setCreationTime = function(_creationTime) {
        creationTime = _creationTime;
    };

    
    this.getCreationTime = function() {
        return Utility.getFormattedDateFromSec(creationTime);
    };
    
    
    this.isNetAdmin = function() {
        return (role == NETADMIN);  
    };

    
    this.getName = function() {
        return firstname + " " + lastname;
    };
    
    
    this.getRoleAsString = function() {
        return ROLES[role];
    };
    
    
    this.getAddArray = function() {
        var lvParams = new Array();
        
        lvParams.push(new Array("tenantId", tenantId));
        lvParams.push(new Array("email", email));
        lvParams.push(new Array("fname", firstname));
        lvParams.push(new Array("lname", lastname));
        lvParams.push(new Array("role", role));
        lvParams.push(new Array("tenantId", tenantId));
        lvParams.push(new Array("password", password));
        
        lvParams.push(new Array("icon", icon));
        lvParams.push(new Array("localFileName", localFileName));
        
        return lvParams;
    };

    
    
    this.getUpdateArray = function() {
        var lvParams = new Array();

        lvParams.push(new Array("id", id));
        lvParams.push(new Array("fname", firstname));
        lvParams.push(new Array("lname", lastname));
        lvParams.push(new Array("email", email));
        lvParams.push(new Array("role", role));
        
        return lvParams;
    };


    this.getImageUrl = function() {
        return gSession.getUrl() + "/tenants/" + this.getTenantId() + "/useravatar/" + this.getId();
    };
}