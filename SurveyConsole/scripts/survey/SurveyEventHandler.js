var gSurveyEventHandler = null;

function SurveyEventHandler() {
	var container = null;
	
	var currentValue = 100;
	
    this.init = function() {
		container = $("body");
	};
	
	
	this.reset= function() {
	};
	
	
	function validateForm() {
		return (getContent() != null);
	};
	
	
	this.handleSessionInformaiton = function() {
		container.find("#templateQuestion").html(gSession.getTemplateQuestion());
		container.find("#templateThankYouMessage").html(gSession.getTemplateThankYouMessage());
		
		container.find("[sentiment-template]").hide();
		container.find("[sentiment-template='" + gSession.getTemplateId() + "']").show();
		
    	$.mobile.changePage("#information-page");
	};
	
	this.handleSentimentOnButtonClicked = function(button) {
		currentValue = button.attr("sentiment-value");
		
		$("[sentiment-click='" + button.attr("sentiment-click") + "']").removeClass("selected");
		
		button.addClass("selected");
	};
	
	this.handleStarsOnButtonClicked = function(button) {
		currentValue = parseInt(button.attr("sentiment-value"));
		
		$("[sentiment-click='" + button.attr("sentiment-click") + "']").each(function() {
			$(this).removeClass("selected");
			if (parseInt($(this).attr("sentiment-value")) <= currentValue){
				$(this).addClass("selected");
			} else {
				$(this).removeClass("selected");
			}
		});
		
	};
	

	this.handleSendOnButtonClicked = function(button) {
		if (!validateForm()) {
			alert("Please complete the required fields!");
			
			$(button).attr('disabled', false);
			return ;
		}
		
		var surveyRequest = new Object();
		surveyRequest.tenantName = gSession.getTenant();
		surveyRequest.profileName = gSession.getProfile();
		surveyRequest.groupId = gSession.getGroupId();
		surveyRequest.fromMedia = gSession.getFromMedia();
		surveyRequest.itemId = gSession.getItemId();
		surveyRequest.templateId = gSession.getTemplateId();
		surveyRequest.templateQuestion = gSession.getTemplateQuestion();
		surveyRequest.score = getScore();
		surveyRequest.templateAnswer = getContent();

		gMessageSender.sendSurveyRequest(surveyRequest);
		
		window.scrollTo(0,1);
		
		if (gSession.getIsMobile()) {
			var documentElement = document.documentElement;
			if (documentElement.requestFullscreen) {
				documentElement.requestFullscreen();
			} else if (documentElement.msRequestFullscreen) {
				documentElement.msRequestFullscreen();
			} else if (documentElement.mozRequestFullScreen) {
				documentElement.mozRequestFullScreen();
			} else if (documentElement.webkitRequestFullscreen) {
				documentElement.webkitRequestFullscreen();
			}		
		}
	};
	
	
	function focusOnInput() {
		var temp = $("#content").val();
		$("#content").val('');
		$("#content").focus();
		$("#content").val(temp);
	};
	
	
	function getScore() {
		return currentValue; 
	};
	
	
	function getContent() {
		var content = container.find("#content").val();
		if (content != null && content.trim().length > 0) {
			return content.trim();
		}
		
		return null;
	};
	function setContent(content) {
		if (content == null) {
			return ;
		}
		container.find("#content").val(content);
	};
}