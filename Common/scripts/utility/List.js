
gList = null;

function List() {
    var title = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#", "-");
    
    this.initList = function(_divContent, _divIndex, _list, _getPresentation, _eventHandler, _clickEventClass) {
    	$("#" + _divIndex + " a").off("click");
    	$("#" + _divContent + " .li-ListItem").off("click");
    	
        $("#" + _divIndex).empty();
        $("#" + _divContent).empty();

        setList($("#" + _divContent), _list, _getPresentation);
    
      /** 
       * Define the list.
       */
      var listObject = $("#" + _divContent + " div.list-content > ul");
      
      /** 
       * Generate the list of index links for the scrollto links.
       */
      $("#" + _divIndex).empty();
      
      listObject.find('li a.title').each(function(i) {
          /** 
           * Create the new link element for this header.
           */
          $("#" + _divIndex).append("<div><a href=\"#\" data-header=\"" + i + "\">" + $(this).text() + "</a></div>");
      });
      
      /** 
       * Add an event handler
       */ 
      $("#" + _divIndex + " a").on("click", function(e) {
          e.preventDefault();
          
          /** 
           * Scroll to the selected element.
           */
          listObject.list("scrollTo", $(this).attr("data-header"), "fast");
      });
      
      var lvClickEventObject = Utility.isValidObject(_clickEventClass, null);
      if (lvClickEventObject == null) {
    	  $("#" + _divContent + " .li-ListItem").on("click", function(event) {
    		  _eventHandler.handleOnClickEvent(this.id);

    		  event.stopPropagation();
    	  });
      } else {
    	  $("#" + _divContent + " .li-ListItem ." + lvClickEventObject).on("click", function(event) {
    		  _eventHandler.handleOnClickEvent(this.id);

    		  event.stopPropagation();
    	  });
      }

	  /** 
       * Add the list plug-in.
       */
      listObject.list({ headerSelector : "a.title"});
    };

    function setList(_container, _list, _getPresentation) {
    	var lvList = null;
    	
		var node = "";
		for (var i=0; i<title.length; i++) {
			node += "<li><a class='title' style='left: 0;'>" + title[i] + "</a><ul id='group" + (title[i] == "#" ? "1" : title[i]) + "'></ul></li>";
		}

		lvList = $("<div class='list-content'><ul>" + node + "</ul></div>");
		
		var isString = new RegExp("[A-Z]");
		var isNumber = new RegExp("[0-9]");
		
		for (var i=0; i<_list.length; i++) {
			var item = _list[i];
			
			var char = "-";
			if (item.getName().length > 0) {
				char = item.getName().charAt(0).toUpperCase();
				
				if (!isString.test(char)) {
    				if (isNumber.test(char)) {
    					char = "1";
    				} else {
    					char = "-";
    				}
				}
			}

			lvList.find("#group" + char).append(_getPresentation(item));
		}
    	
        _container.html(lvList);
    };
}