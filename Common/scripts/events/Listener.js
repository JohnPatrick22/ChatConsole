var gListener = null;

function InternalListener(_obj, _id, _types) {
    var obj = _obj;
    var id = _id;
    var types = _types;

    this.getObj = function() {
        return obj;
    };

    this.getId = function() {
        return id;
    };

    this.getTypes = function() {
        return types;
    };
    
    this.isListeningFor = function(_type) {
    	for (var i=0; i<types.length; i++) {
    		if (_type == types[i]) {
    			return true;
    		}
    	}
    	
    	return false;
    };
};

function Listener() {
    var listeners = new Array();

    
    this.addListener = function(_object, _id, _types) {
        listeners.push(new InternalListener(_object, _id, _types));
    };
    
    
    this.removeListener = function(_id) {
        for (var lvIndex = listeners.length-1; lvIndex>=0; lvIndex--) {
            if (listeners[lvIndex].getId() == _id) {
                return listeners.splice(lvIndex, 1);
            }
        }
    };

    
    this.reset = function() {
        listeners = new Array();
    };

    
    this.generateEvent = function(_id, _type, _source, json) {
        if (!gSession.isLoggeedIn()) {
            return ;
        }
        
        var event = new Event(_id, _type, _source, json);
        
        for (var index=0; index<listeners.length; index++) {
            try {
            	if (listeners[index].isListeningFor(_type)) {
            		listeners[index].getObj().pageChange(event);
            	}
            } catch (err) {
                Console.error("Object not supporting pageChange function == " + err.message);
            }
        }
    };
}

