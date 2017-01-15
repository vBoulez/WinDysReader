var ua = navigator.userAgent.toLowerCase();
var touchDownEvent;
var touchUpEvent;
var isMobile;
var orientationDevice = getOrientation(PubCoder.isAndroidReader);
var aigX = 0, aigY = 0;

/*
 * 
 * Init Action Lists
 *
 * 
 */
var obj6402_onSwipeLeft_activeActionGroupIndex = -1;
var obj6402_onSwipeLeft_runningActionsCount = 0;
var obj6402_onSwipeLeft_loopCount = 0;
var obj13369_onLoad_activeActionGroupIndex = -1;
var obj13369_onLoad_runningActionsCount = 0;
var obj13369_onLoad_loopCount = 0;
/*
 * 
 * Init SCCounter
 *
 * 
 */
 
$(window).load(function(){
	window.eventObj = {};
	/*
	 * 
	 * Init SCAnimation
	 * 
	 * 
	 */
	
	/*
	 *
	 *   Init Shake
	 *
	 */
	window.addEventListener('shake', function () {
		
	}, false);
	
	/*
	 *
	 *   Init Masked Images
	 *
	 */
	 
 	/*
	 * 
	 * Init SCPhotogallery
	 * 
	 * 
	 */
	
 	/*
	 * 
	 * Init SCQuizMulti
	 * 
	 * 
	 */
	
 	/*
	 * 
	 * Init SCDrawer
	 * 
	 * 
	 */
	
    
 	/*
	 * 
	 * Init SCWPanZoom
	 * 
	 * 
	 */
	
    
 	/*
	 * 
	 * Init SCWMemoryGame
	 * 
	 * 
	 */
	
    
    
	if(! navigator.userAgent.match(/PubCoderHelper/i)) {
		/*
		 *
	 	 *   Action Groups
	 	 *
	 	 */
		
obj6402_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj6402_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj6402").trigger("obj6402_onSwipeLeft_ended");
		
		return;
	}
	window.obj6402_onSwipeLeft_activeActionGroupIndex = 0;
	
//	action: goToPage
//	target: page2 
goToPage_13567();
function goToPage_13567() {
	window.obj6402_onSwipeLeft_runningActionsCount = obj6402_onSwipeLeft_runningActionsCount + 1;
	$(location).attr('href', '../2/page.xhtml');
	window.obj6402_onSwipeLeft_runningActionsCount = window.obj6402_onSwipeLeft_runningActionsCount - 1;
if (window.obj6402_onSwipeLeft_runningActionsCount == 0) {
	obj6402_onSwipeLeft_actionGroup1();
}
}




















};
obj6402_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj6402_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj6402").trigger("obj6402_onSwipeLeft_ended");
		
		return;
	}
	window.obj6402_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13369_onLoad_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13369_onLoad_activeActionGroupIndex = -1;
		$("#obj13369").trigger("obj13369_onLoad_ended");
		
		return;
	}
	window.obj13369_onLoad_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13372();
function runjs_13372() {
	window.obj13369_onLoad_runningActionsCount = obj13369_onLoad_runningActionsCount + 1;

	var fromPageSommaire = $('title').text();
window[nameFromPageSommaire] = fromPageSommaire;
localStorage[nameFromPageSommaire] = window[nameFromPageSommaire]
	setTimeout(function() {
		window.obj13369_onLoad_runningActionsCount = window.obj13369_onLoad_runningActionsCount - 1;
if (window.obj13369_onLoad_runningActionsCount == 0) {
	obj13369_onLoad_actionGroup1();
}
	}, 1);
}






};
obj13369_onLoad_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13369_onLoad_activeActionGroupIndex = -1;
		$("#obj13369").trigger("obj13369_onLoad_ended");
		
		return;
	}
	window.obj13369_onLoad_activeActionGroupIndex = 1;
	




















};
		
		/*
		 *
	 	 *  Events
	 	 *
	 	 */
		

/*
 *
 *   obj6402: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj6402");

$("#obj6402").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj6402").bind("SCswipeleft", function(event) {
	if (window.obj6402_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj6402_onSwipeLeft_runningActionsCount = 0;
var obj6402_onSwipeLeft_loopCount = 0;
obj6402_onSwipeLeft_actionGroup0();
});










/*
 *
 *   obj13369: Event Load
 *
 */
setTimeout(function () {
if (window.obj13369_onLoad_activeActionGroupIndex != -1) return;
var obj13369_onLoad_runningActionsCount = 0;
var obj13369_onLoad_loopCount = 0;
obj13369_onLoad_actionGroup0();
}, 200);


		
		/*
		 *
	 	 *   Trigger onShow events for objects already shown on stage
	 	 *
	 	 */
	 	setTimeout(function() {
		
$("#obj6402").trigger('SCEventShow');
		$(window).trigger('SCEventPageReady');
		}, 200);
	 }
})