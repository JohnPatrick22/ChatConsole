function Flow(_source, _container, _moveTo, _dashboard, _dashboardHtml, _itemCount) {
    var source = _source;
    var container = _container;
    var moveTo = _moveTo;
    var dashboard = _dashboard;
    var dashboardHtml = _dashboardHtml;
    var itemCount = Utility.isValidObject(_itemCount, 28);

    var transition = null;
    var transform = null;
    var perspective = null;
    
    var flow = null;
    
    Console.log("itemCount", itemCount);
    
    function init() {
        transition = mg_getTransition();
        transform = mg_getTransform();
        perspective = mg_getPerspective();
        
        flow.init();
    };

    flow = new Mg({
        reference: container,
        click:{
            activated:[moveTo],
            cycle:true,
            interactive:true,
            multiLess: itemCount, 
            multiPlus: itemCount
        }
    });

    flow.click.onEvent = function(){
        var arr = this.multiActivated;
        
        if (typeof arr === "undefined") {
        	arr = this.initNum;
        }
        
        var alpha = Math.PI * 2 / (arr.length);
        var xradius = 200;
        var yradius = 60;
        
        for (var i=0; i<arr.length; i++){
            var path = $("#" + this.reference + "-item-" + arr[i]);
            var depth = 0;
            
            if (arr[i] == this.activated) {
                depth = 0;
            } else {
                depth = flow.mapDistanceReverse(this.multiPlus, i, arr.length, 0);
            }
            
            var theta = alpha * (this.activated - arr[i] - depth / 6) + 1.6; // -depth/6 will give additional distance based on depth: it gives space for activated
            var x = 20 + xradius + Math.cos(theta) * xradius;
            var y = yradius + Math.sin(theta) * yradius;
            
            // var w = h = y/4;
            var scale = 0.2 + y / 140;
            if (arr[i] == this.activated) { 
                scale = 1.5; 
                y-=30;
            }
            
            path.clearQueue().stop().css("z-index", Math.round(y/10));
            
            if (perspective && transition){
                path.css(transition.css, transform.css + " 1.3s cubic-bezier(" + bezcss + ")");
                path.css(transform.css, "translate3d(" + x + "px, " + y + "px,0) scale(" + scale + ")");
            } else {
                path.animate({transform:"translate(" + x + ", " + y + ") scale(" + scale + ")"},{queue:true, duration:1300, specialEasing: {transform:bez}});
            }
        }
        
        $("#" + this.reference + "-item-" + this.deactivated).removeClass("active");
        $("#" + this.reference + "-item-" + this.activated).addClass("active").css("z-index", 100);
        
        source.setCurrentItem(this.activated, dashboard, dashboardHtml);
        // Console.log("Flow - onEvent - activated == " + this.activated);
    };

    flow.click.scrollClick = function(){
        var path = $("#" + this.reference + "-click-scrollIn");
        path.addClass("active");
    };
    
    flow.click.scrollMove = function(){
        var path = $("#" + this.reference + "-click-scrollIn");
        if(perspective && transition){
            path.css(transition.css, transform.css + " 0s");
            path.css(transform.css, "translate3d(" + this.scrollPosition + "px, 0, 0)");
        }else{
            path.clearQueue().stop().animate({left:this.scrollPosition},{queue:true, duration:0, specialEasing: {left:bez}});
        }
    };
    
    flow.click.scrollRelease = function(){
        var path = $("#" + this.reference + "-click-scrollIn");
        path.removeClass("active");
        if(perspective && transition){
            path.css(transition.css, transform.css + " 1.2s cubic-bezier(" + bezcss + ") 0s");
            path.css(transform.css, "translate3d(" + this.scrollPosition + "px, 0, 0)");
        }else{
            path.clearQueue().stop().animate({left:this.scrollPosition},{queue:true, duration:300, specialEasing: {left:bez}});
        }
    };
    
//    flow.click.dragMove = function(){
//        var path = $("#"+this.reference+"-click-dragIn");
//        if(perspective && transition){
//            path.css(transition.css, transform.css+" 0s");
//            path.css(transform.css, "translate3d("+this.dragPosition+"px,0,0)");
//        }else{
//            path.clearQueue().stop().animate({left:this.dragPosition},{queue:true, duration:0, specialEasing: {left:bez}});
//        }
//    };
//    flow.click.dragRelease = function(){
//        var path = $("#"+this.reference+"-click-dragIn");
//        if(perspective && transition){
//            path.css(transition.css, transform.css+" 1.2s cubic-bezier("+bezcss+") 0s");
//            path.css(transform.css, "translate3d("+this.dragPosition+"px,0,0)");
//        }else{
//            path.clearQueue().stop().animate({left:this.dragPosition},{queue:true, duration:300, specialEasing: {left:bez}});
//        }
//    };
    
    function mg_getProperty(arr0, arr1, arr2){
        var tmp = document.createElement("div");
        for(var i=0, len=arr0.length; i<len; i++){
            tmp.style[arr0[i]] = 800;
            if(typeof tmp.style[arr0[i]] == 'string'){
                return {
                    js: arr0[i],
                    css: arr1[i],
                    jsEnd: arr2[i]
                };
            }
        }
        return null;
    }
    
    function mg_getTransition(){
        var arr0 = ["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition", "KhtmlTransition"];
        var arr1 = ["transition", "-ms-transition", "-moz-transition", "-webkit-transition", "-o-transition", "-khtml-transition"];
        var arr2 = ["transitionend", "MSTransitionEnd", "transitionend", "webkitTransitionEnd", "oTransitionEnd", "khtmlTransitionEnd"];
        return mg_getProperty(arr0, arr1, arr2);
    }
    
    function mg_getTransform(){
        var arr0 = ["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform", "KhtmlTransform"];
        var arr1 = ["transform", "-ms-transform", "-moz-transform", "-webkit-transform", "-o-transform", "-khtml-transform"];
        return mg_getProperty(arr0, arr1, []);
    }
    
    function mg_getPerspective(){
        var arr0 = ["perspective", "msPerspective", "MozPerspective", "WebkitPerspective", "OPerspective", "KhtmlPerspective"];
        var arr1 = ["perspective", "-ms-perspective", "-moz-perspective", "-webkit-perspective", "-o-perspective", "-khtml-perspective"];
        return mg_getProperty(arr0, arr1, []);
    }
    
    this.refreshItems = function() {
        flow.refreshItems();
    };
    
    init();
}
