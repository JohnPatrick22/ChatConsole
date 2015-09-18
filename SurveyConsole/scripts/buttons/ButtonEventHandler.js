var gButtonEventHandler = null;

function ButtonEventHandler() {

	this.init = function() {
		$("body").on("click", "[data-role=button]", function(e) { handleOnButtonClicked(this, e); });
		$("body").on("click", "[sentiment-click]", function(e) { handleOnButtonClicked(this, e); });
	};	
	
	
	this.reset = function() {
		$("body").off("click", "[data-role=button]");
		$("body").off("click", "[sentiment-click]");
	};	

	
	function handleOnButtonClicked(button, event) {
		var id = $(button).attr("sentiment-click"); 
		if (id == null) {
			id = Utility.isValidObject($(button).attr("id"), null);
		}
		
		Console.log("Button Clicked", id, button);
		
		if (id != null) {
			switch (id) {
				case "buttonSendSurvey":
		        	$(button).attr('disabled', true);
		        	
		        	gSurveyEventHandler.handleSendOnButtonClicked($(button));
					
		        	setTimeout(function() { $(button).attr('disabled', false); }, 5000);
		            return ;
		            
				case "dot":
				case "face":
		        	gSurveyEventHandler.handleSentimentOnButtonClicked($(button));
		            return ;
		            
				case "star":
		        	gSurveyEventHandler.handleStarsOnButtonClicked($(button));
		            return ;
			}
		}
		
        Console.error("Unknown button", button);
	};
}