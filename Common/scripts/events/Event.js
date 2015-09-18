var Event = function(id, type, source, data) {
	var event = new Object();
    event.id = id;
    event.type = type;
    event.source = source;
    event.data = data;

    
    this.getId = function() {
        return event.id;  
    };

    
    this.getType = function() {
        return event.type;  
    };

    
    this.getSource = function() {
        return event.source;  
    };
    
    
    this.getData = function() {
    	return event.data;
    };
    
    
    this.getEvent = function() {
    	return event;
    };
};
