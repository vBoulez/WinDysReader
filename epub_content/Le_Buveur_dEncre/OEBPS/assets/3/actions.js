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
var obj14140_onShow_activeActionGroupIndex = -1;
var obj14140_onShow_runningActionsCount = 0;
var obj14140_onShow_loopCount = 0;
var obj13689_onTouchUp_activeActionGroupIndex = -1;
var obj13689_onTouchUp_runningActionsCount = 0;
var obj13689_onTouchUp_loopCount = 0;
var obj13695_onTouchUp_activeActionGroupIndex = -1;
var obj13695_onTouchUp_runningActionsCount = 0;
var obj13695_onTouchUp_loopCount = 0;
var obj13704_onTouchUp_activeActionGroupIndex = -1;
var obj13704_onTouchUp_runningActionsCount = 0;
var obj13704_onTouchUp_loopCount = 0;
var obj13704_onPinchOpen_activeActionGroupIndex = -1;
var obj13704_onPinchOpen_runningActionsCount = 0;
var obj13704_onPinchOpen_loopCount = 0;
var obj13710_onSwipeLeft_activeActionGroupIndex = -1;
var obj13710_onSwipeLeft_runningActionsCount = 0;
var obj13710_onSwipeLeft_loopCount = 0;
var obj13710_onSwipeRight_activeActionGroupIndex = -1;
var obj13710_onSwipeRight_runningActionsCount = 0;
var obj13710_onSwipeRight_loopCount = 0;
var obj13721_onTouchUp_activeActionGroupIndex = -1;
var obj13721_onTouchUp_runningActionsCount = 0;
var obj13721_onTouchUp_loopCount = 0;
var obj13729_onSwipeLeft_activeActionGroupIndex = -1;
var obj13729_onSwipeLeft_runningActionsCount = 0;
var obj13729_onSwipeLeft_loopCount = 0;
var obj13729_onSwipeRight_activeActionGroupIndex = -1;
var obj13729_onSwipeRight_runningActionsCount = 0;
var obj13729_onSwipeRight_loopCount = 0;
var obj13737_onSwipeLeft_activeActionGroupIndex = -1;
var obj13737_onSwipeLeft_runningActionsCount = 0;
var obj13737_onSwipeLeft_loopCount = 0;
var obj13737_onSwipeRight_activeActionGroupIndex = -1;
var obj13737_onSwipeRight_runningActionsCount = 0;
var obj13737_onSwipeRight_loopCount = 0;
var obj13745_onSwipeLeft_activeActionGroupIndex = -1;
var obj13745_onSwipeLeft_runningActionsCount = 0;
var obj13745_onSwipeLeft_loopCount = 0;
var obj13745_onSwipeRight_activeActionGroupIndex = -1;
var obj13745_onSwipeRight_runningActionsCount = 0;
var obj13745_onSwipeRight_loopCount = 0;
var obj13753_onSwipeLeft_activeActionGroupIndex = -1;
var obj13753_onSwipeLeft_runningActionsCount = 0;
var obj13753_onSwipeLeft_loopCount = 0;
var obj13753_onSwipeRight_activeActionGroupIndex = -1;
var obj13753_onSwipeRight_runningActionsCount = 0;
var obj13753_onSwipeRight_loopCount = 0;
var obj13761_onSwipeLeft_activeActionGroupIndex = -1;
var obj13761_onSwipeLeft_runningActionsCount = 0;
var obj13761_onSwipeLeft_loopCount = 0;
var obj13761_onSwipeRight_activeActionGroupIndex = -1;
var obj13761_onSwipeRight_runningActionsCount = 0;
var obj13761_onSwipeRight_loopCount = 0;
var obj13769_onSwipeLeft_activeActionGroupIndex = -1;
var obj13769_onSwipeLeft_runningActionsCount = 0;
var obj13769_onSwipeLeft_loopCount = 0;
var obj13769_onSwipeRight_activeActionGroupIndex = -1;
var obj13769_onSwipeRight_runningActionsCount = 0;
var obj13769_onSwipeRight_loopCount = 0;
var obj13777_onSwipeLeft_activeActionGroupIndex = -1;
var obj13777_onSwipeLeft_runningActionsCount = 0;
var obj13777_onSwipeLeft_loopCount = 0;
var obj13777_onSwipeRight_activeActionGroupIndex = -1;
var obj13777_onSwipeRight_runningActionsCount = 0;
var obj13777_onSwipeRight_loopCount = 0;
var obj13785_onSwipeLeft_activeActionGroupIndex = -1;
var obj13785_onSwipeLeft_runningActionsCount = 0;
var obj13785_onSwipeLeft_loopCount = 0;
var obj13785_onSwipeRight_activeActionGroupIndex = -1;
var obj13785_onSwipeRight_runningActionsCount = 0;
var obj13785_onSwipeRight_loopCount = 0;
var obj13793_onSwipeLeft_activeActionGroupIndex = -1;
var obj13793_onSwipeLeft_runningActionsCount = 0;
var obj13793_onSwipeLeft_loopCount = 0;
var obj13793_onSwipeRight_activeActionGroupIndex = -1;
var obj13793_onSwipeRight_runningActionsCount = 0;
var obj13793_onSwipeRight_loopCount = 0;
var obj13801_onSwipeLeft_activeActionGroupIndex = -1;
var obj13801_onSwipeLeft_runningActionsCount = 0;
var obj13801_onSwipeLeft_loopCount = 0;
var obj13801_onSwipeRight_activeActionGroupIndex = -1;
var obj13801_onSwipeRight_runningActionsCount = 0;
var obj13801_onSwipeRight_loopCount = 0;
var obj13809_onSwipeLeft_activeActionGroupIndex = -1;
var obj13809_onSwipeLeft_runningActionsCount = 0;
var obj13809_onSwipeLeft_loopCount = 0;
var obj13809_onSwipeRight_activeActionGroupIndex = -1;
var obj13809_onSwipeRight_runningActionsCount = 0;
var obj13809_onSwipeRight_loopCount = 0;
var obj13817_onSwipeLeft_activeActionGroupIndex = -1;
var obj13817_onSwipeLeft_runningActionsCount = 0;
var obj13817_onSwipeLeft_loopCount = 0;
var obj13817_onSwipeRight_activeActionGroupIndex = -1;
var obj13817_onSwipeRight_runningActionsCount = 0;
var obj13817_onSwipeRight_loopCount = 0;
var obj13825_onSwipeLeft_activeActionGroupIndex = -1;
var obj13825_onSwipeLeft_runningActionsCount = 0;
var obj13825_onSwipeLeft_loopCount = 0;
var obj13825_onSwipeRight_activeActionGroupIndex = -1;
var obj13825_onSwipeRight_runningActionsCount = 0;
var obj13825_onSwipeRight_loopCount = 0;
var obj13834_onSwipeLeft_activeActionGroupIndex = -1;
var obj13834_onSwipeLeft_runningActionsCount = 0;
var obj13834_onSwipeLeft_loopCount = 0;
var obj13834_onSwipeRight_activeActionGroupIndex = -1;
var obj13834_onSwipeRight_runningActionsCount = 0;
var obj13834_onSwipeRight_loopCount = 0;
var obj13842_onSwipeLeft_activeActionGroupIndex = -1;
var obj13842_onSwipeLeft_runningActionsCount = 0;
var obj13842_onSwipeLeft_loopCount = 0;
var obj13842_onSwipeRight_activeActionGroupIndex = -1;
var obj13842_onSwipeRight_runningActionsCount = 0;
var obj13842_onSwipeRight_loopCount = 0;
var obj13850_onSwipeLeft_activeActionGroupIndex = -1;
var obj13850_onSwipeLeft_runningActionsCount = 0;
var obj13850_onSwipeLeft_loopCount = 0;
var obj13850_onSwipeRight_activeActionGroupIndex = -1;
var obj13850_onSwipeRight_runningActionsCount = 0;
var obj13850_onSwipeRight_loopCount = 0;
var obj13858_onSwipeLeft_activeActionGroupIndex = -1;
var obj13858_onSwipeLeft_runningActionsCount = 0;
var obj13858_onSwipeLeft_loopCount = 0;
var obj13858_onSwipeRight_activeActionGroupIndex = -1;
var obj13858_onSwipeRight_runningActionsCount = 0;
var obj13858_onSwipeRight_loopCount = 0;
var obj13864_onSwipeLeft_activeActionGroupIndex = -1;
var obj13864_onSwipeLeft_runningActionsCount = 0;
var obj13864_onSwipeLeft_loopCount = 0;
var obj13864_onSwipeRight_activeActionGroupIndex = -1;
var obj13864_onSwipeRight_runningActionsCount = 0;
var obj13864_onSwipeRight_loopCount = 0;
var obj13870_onSwipeLeft_activeActionGroupIndex = -1;
var obj13870_onSwipeLeft_runningActionsCount = 0;
var obj13870_onSwipeLeft_loopCount = 0;
var obj13870_onSwipeRight_activeActionGroupIndex = -1;
var obj13870_onSwipeRight_runningActionsCount = 0;
var obj13870_onSwipeRight_loopCount = 0;
var obj13876_onSwipeLeft_activeActionGroupIndex = -1;
var obj13876_onSwipeLeft_runningActionsCount = 0;
var obj13876_onSwipeLeft_loopCount = 0;
var obj13876_onSwipeRight_activeActionGroupIndex = -1;
var obj13876_onSwipeRight_runningActionsCount = 0;
var obj13876_onSwipeRight_loopCount = 0;
var obj13882_onTouchUp_activeActionGroupIndex = -1;
var obj13882_onTouchUp_runningActionsCount = 0;
var obj13882_onTouchUp_loopCount = 0;
var obj14152_onLoad_activeActionGroupIndex = -1;
var obj14152_onLoad_runningActionsCount = 0;
var obj14152_onLoad_loopCount = 0;
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
		
obj14140_onShow_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj14140_onShow_activeActionGroupIndex = -1;
		$("#obj14140").trigger("obj14140_onShow_ended");
		
		return;
	}
	window.obj14140_onShow_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_14147();
function runjs_14147() {
	window.obj14140_onShow_runningActionsCount = obj14140_onShow_runningActionsCount + 1;

	$("#obj14140").addClass("halo");
	setTimeout(function() {
		window.obj14140_onShow_runningActionsCount = window.obj14140_onShow_runningActionsCount - 1;
if (window.obj14140_onShow_runningActionsCount == 0) {
	obj14140_onShow_actionGroup1();
}
	}, 1);
}






};
obj14140_onShow_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj14140_onShow_activeActionGroupIndex = -1;
		$("#obj14140").trigger("obj14140_onShow_ended");
		
		return;
	}
	window.obj14140_onShow_activeActionGroupIndex = 1;
	




















};
obj13689_onTouchUp_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13689_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13689").trigger("obj13689_onTouchUp_ended");
		
		return;
	}
	window.obj13689_onTouchUp_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13692();
function runjs_13692() {
	window.obj13689_onTouchUp_runningActionsCount = obj13689_onTouchUp_runningActionsCount + 1;

	$('body').off(".moveTextArea");
$('#chapHeader').off(".moveTextAreaTap");
if(!$('.panneau-menu, .icone-menu').hasClass('out')) {
    $('.panneau-menu, .icone-menu').toggleClass('out');
    $('.panneau-menu, .icone-menu').animate ({
        top: "-=168"
    }, 300);
}
$('.hide-menu').show();
	setTimeout(function() {
		window.obj13689_onTouchUp_runningActionsCount = window.obj13689_onTouchUp_runningActionsCount - 1;
if (window.obj13689_onTouchUp_runningActionsCount == 0) {
	obj13689_onTouchUp_actionGroup1();
}
	}, 1);
}






};
obj13689_onTouchUp_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13689_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13689").trigger("obj13689_onTouchUp_ended");
		
		return;
	}
	window.obj13689_onTouchUp_activeActionGroupIndex = 1;
	




















};
obj13695_onTouchUp_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13695_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13695").trigger("obj13695_onTouchUp_ended");
		
		return;
	}
	window.obj13695_onTouchUp_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13698();
function runjs_13698() {
	window.obj13695_onTouchUp_runningActionsCount = obj13695_onTouchUp_runningActionsCount + 1;

	$('body').off(".moveTextArea");
$('#chapHeader').off(".moveTextAreaTap");
var fromPageSommaire = $('title').text();
window[nameFromPageSommaire] = fromPageSommaire;
localStorage[nameFromPageSommaire] = window[nameFromPageSommaire];
	setTimeout(function() {
		window.obj13695_onTouchUp_runningActionsCount = window.obj13695_onTouchUp_runningActionsCount - 1;
if (window.obj13695_onTouchUp_runningActionsCount == 0) {
	obj13695_onTouchUp_actionGroup1();
}
	}, 1);
}






};
obj13695_onTouchUp_actionGroup1 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13695_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13695").trigger("obj13695_onTouchUp_ended");
		
		return;
	}
	window.obj13695_onTouchUp_activeActionGroupIndex = 1;
	




















};
obj13695_onTouchUp_actionGroup2 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13695_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13695").trigger("obj13695_onTouchUp_ended");
		
		return;
	}
	window.obj13695_onTouchUp_activeActionGroupIndex = 2;
	




















};
obj13704_onTouchUp_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13704_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13704").trigger("obj13704_onTouchUp_ended");
		
		return;
	}
	window.obj13704_onTouchUp_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13707();
function runjs_13707() {
	window.obj13704_onTouchUp_runningActionsCount = obj13704_onTouchUp_runningActionsCount + 1;

	$('#chapHeader').on(".moveTextAreaTap");
$('body').on(".moveTextArea");
if($('.panneau-menu, .icone-menu').hasClass('out out-all')) {
    $('.panneau-menu, .icone-menu').animate ({
        top: "+=480"
    }, 300);
} else {
    $('.panneau-menu, .icone-menu').animate ({
        top: "+=168"
    }, 300);
}
$('.panneau-menu, .icone-menu').removeClass('out out-all');
$('.hide-menu').hide();
	setTimeout(function() {
		window.obj13704_onTouchUp_runningActionsCount = window.obj13704_onTouchUp_runningActionsCount - 1;
if (window.obj13704_onTouchUp_runningActionsCount == 0) {
	obj13704_onTouchUp_actionGroup1();
}
	}, 1);
}






};
obj13704_onTouchUp_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13704_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13704").trigger("obj13704_onTouchUp_ended");
		
		return;
	}
	window.obj13704_onTouchUp_activeActionGroupIndex = 1;
	




















};
obj13704_onPinchOpen_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13704_onPinchOpen_activeActionGroupIndex = -1;
		$("#obj13704").trigger("obj13704_onPinchOpen_ended");
		
		return;
	}
	window.obj13704_onPinchOpen_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13709();
function runjs_13709() {
	window.obj13704_onPinchOpen_runningActionsCount = obj13704_onPinchOpen_runningActionsCount + 1;

	$('.hide-menu').trigger(PubCoder.Events.TouchUp);
	setTimeout(function() {
		window.obj13704_onPinchOpen_runningActionsCount = window.obj13704_onPinchOpen_runningActionsCount - 1;
if (window.obj13704_onPinchOpen_runningActionsCount == 0) {
	obj13704_onPinchOpen_actionGroup1();
}
	}, 1);
}






};
obj13704_onPinchOpen_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13704_onPinchOpen_activeActionGroupIndex = -1;
		$("#obj13704").trigger("obj13704_onPinchOpen_ended");
		
		return;
	}
	window.obj13704_onPinchOpen_activeActionGroupIndex = 1;
	




















};
obj13710_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13710_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13710").trigger("obj13710_onSwipeLeft_ended");
		
		return;
	}
	window.obj13710_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13715();
function runjs_13715() {
	window.obj13710_onSwipeLeft_runningActionsCount = obj13710_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13710_onSwipeLeft_runningActionsCount = window.obj13710_onSwipeLeft_runningActionsCount - 1;
if (window.obj13710_onSwipeLeft_runningActionsCount == 0) {
	obj13710_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13710_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13710_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13710").trigger("obj13710_onSwipeLeft_ended");
		
		return;
	}
	window.obj13710_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13710_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13710_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13710").trigger("obj13710_onSwipeRight_ended");
		
		return;
	}
	window.obj13710_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13717();
function runjs_13717() {
	window.obj13710_onSwipeRight_runningActionsCount = obj13710_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13710_onSwipeRight_runningActionsCount = window.obj13710_onSwipeRight_runningActionsCount - 1;
if (window.obj13710_onSwipeRight_runningActionsCount == 0) {
	obj13710_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13710_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13710_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13710").trigger("obj13710_onSwipeRight_ended");
		
		return;
	}
	window.obj13710_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13721_onTouchUp_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13721_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13721").trigger("obj13721_onTouchUp_ended");
		
		return;
	}
	window.obj13721_onTouchUp_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13724();
function runjs_13724() {
	window.obj13721_onTouchUp_runningActionsCount = obj13721_onTouchUp_runningActionsCount + 1;

	if (!$('.panneau-menu, .icone-menu').hasClass('out-all')) {
    $('.panneau-menu, .icone-menu').toggleClass('out-all');
    $('.panneau-menu, .icone-menu').animate ({
        top: "-=312"
    }, 300);
} else {
    $('.panneau-menu, .icone-menu').removeClass('out out-all');
    $('.panneau-menu, .icone-menu').animate ({
        top: "+=480"
    }, 300);
    $('.hide-menu').hide();
}
	setTimeout(function() {
		window.obj13721_onTouchUp_runningActionsCount = window.obj13721_onTouchUp_runningActionsCount - 1;
if (window.obj13721_onTouchUp_runningActionsCount == 0) {
	obj13721_onTouchUp_actionGroup1();
}
	}, 1);
}






};
obj13721_onTouchUp_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13721_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13721").trigger("obj13721_onTouchUp_ended");
		
		return;
	}
	window.obj13721_onTouchUp_activeActionGroupIndex = 1;
	




















};
obj13729_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13729_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13729").trigger("obj13729_onSwipeLeft_ended");
		
		return;
	}
	window.obj13729_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13734();
function runjs_13734() {
	window.obj13729_onSwipeLeft_runningActionsCount = obj13729_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13729_onSwipeLeft_runningActionsCount = window.obj13729_onSwipeLeft_runningActionsCount - 1;
if (window.obj13729_onSwipeLeft_runningActionsCount == 0) {
	obj13729_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13729_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13729_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13729").trigger("obj13729_onSwipeLeft_ended");
		
		return;
	}
	window.obj13729_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13729_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13729_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13729").trigger("obj13729_onSwipeRight_ended");
		
		return;
	}
	window.obj13729_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13736();
function runjs_13736() {
	window.obj13729_onSwipeRight_runningActionsCount = obj13729_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13729_onSwipeRight_runningActionsCount = window.obj13729_onSwipeRight_runningActionsCount - 1;
if (window.obj13729_onSwipeRight_runningActionsCount == 0) {
	obj13729_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13729_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13729_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13729").trigger("obj13729_onSwipeRight_ended");
		
		return;
	}
	window.obj13729_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13737_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13737_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13737").trigger("obj13737_onSwipeLeft_ended");
		
		return;
	}
	window.obj13737_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13742();
function runjs_13742() {
	window.obj13737_onSwipeLeft_runningActionsCount = obj13737_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13737_onSwipeLeft_runningActionsCount = window.obj13737_onSwipeLeft_runningActionsCount - 1;
if (window.obj13737_onSwipeLeft_runningActionsCount == 0) {
	obj13737_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13737_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13737_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13737").trigger("obj13737_onSwipeLeft_ended");
		
		return;
	}
	window.obj13737_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13737_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13737_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13737").trigger("obj13737_onSwipeRight_ended");
		
		return;
	}
	window.obj13737_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13744();
function runjs_13744() {
	window.obj13737_onSwipeRight_runningActionsCount = obj13737_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13737_onSwipeRight_runningActionsCount = window.obj13737_onSwipeRight_runningActionsCount - 1;
if (window.obj13737_onSwipeRight_runningActionsCount == 0) {
	obj13737_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13737_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13737_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13737").trigger("obj13737_onSwipeRight_ended");
		
		return;
	}
	window.obj13737_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13745_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13745_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13745").trigger("obj13745_onSwipeLeft_ended");
		
		return;
	}
	window.obj13745_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13750();
function runjs_13750() {
	window.obj13745_onSwipeLeft_runningActionsCount = obj13745_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13745_onSwipeLeft_runningActionsCount = window.obj13745_onSwipeLeft_runningActionsCount - 1;
if (window.obj13745_onSwipeLeft_runningActionsCount == 0) {
	obj13745_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13745_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13745_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13745").trigger("obj13745_onSwipeLeft_ended");
		
		return;
	}
	window.obj13745_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13745_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13745_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13745").trigger("obj13745_onSwipeRight_ended");
		
		return;
	}
	window.obj13745_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13752();
function runjs_13752() {
	window.obj13745_onSwipeRight_runningActionsCount = obj13745_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13745_onSwipeRight_runningActionsCount = window.obj13745_onSwipeRight_runningActionsCount - 1;
if (window.obj13745_onSwipeRight_runningActionsCount == 0) {
	obj13745_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13745_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13745_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13745").trigger("obj13745_onSwipeRight_ended");
		
		return;
	}
	window.obj13745_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13753_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13753_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13753").trigger("obj13753_onSwipeLeft_ended");
		
		return;
	}
	window.obj13753_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13758();
function runjs_13758() {
	window.obj13753_onSwipeLeft_runningActionsCount = obj13753_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13753_onSwipeLeft_runningActionsCount = window.obj13753_onSwipeLeft_runningActionsCount - 1;
if (window.obj13753_onSwipeLeft_runningActionsCount == 0) {
	obj13753_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13753_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13753_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13753").trigger("obj13753_onSwipeLeft_ended");
		
		return;
	}
	window.obj13753_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13753_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13753_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13753").trigger("obj13753_onSwipeRight_ended");
		
		return;
	}
	window.obj13753_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13760();
function runjs_13760() {
	window.obj13753_onSwipeRight_runningActionsCount = obj13753_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13753_onSwipeRight_runningActionsCount = window.obj13753_onSwipeRight_runningActionsCount - 1;
if (window.obj13753_onSwipeRight_runningActionsCount == 0) {
	obj13753_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13753_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13753_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13753").trigger("obj13753_onSwipeRight_ended");
		
		return;
	}
	window.obj13753_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13761_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13761_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13761").trigger("obj13761_onSwipeLeft_ended");
		
		return;
	}
	window.obj13761_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13766();
function runjs_13766() {
	window.obj13761_onSwipeLeft_runningActionsCount = obj13761_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13761_onSwipeLeft_runningActionsCount = window.obj13761_onSwipeLeft_runningActionsCount - 1;
if (window.obj13761_onSwipeLeft_runningActionsCount == 0) {
	obj13761_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13761_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13761_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13761").trigger("obj13761_onSwipeLeft_ended");
		
		return;
	}
	window.obj13761_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13761_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13761_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13761").trigger("obj13761_onSwipeRight_ended");
		
		return;
	}
	window.obj13761_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13768();
function runjs_13768() {
	window.obj13761_onSwipeRight_runningActionsCount = obj13761_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13761_onSwipeRight_runningActionsCount = window.obj13761_onSwipeRight_runningActionsCount - 1;
if (window.obj13761_onSwipeRight_runningActionsCount == 0) {
	obj13761_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13761_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13761_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13761").trigger("obj13761_onSwipeRight_ended");
		
		return;
	}
	window.obj13761_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13769_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13769_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13769").trigger("obj13769_onSwipeLeft_ended");
		
		return;
	}
	window.obj13769_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13774();
function runjs_13774() {
	window.obj13769_onSwipeLeft_runningActionsCount = obj13769_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13769_onSwipeLeft_runningActionsCount = window.obj13769_onSwipeLeft_runningActionsCount - 1;
if (window.obj13769_onSwipeLeft_runningActionsCount == 0) {
	obj13769_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13769_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13769_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13769").trigger("obj13769_onSwipeLeft_ended");
		
		return;
	}
	window.obj13769_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13769_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13769_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13769").trigger("obj13769_onSwipeRight_ended");
		
		return;
	}
	window.obj13769_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13776();
function runjs_13776() {
	window.obj13769_onSwipeRight_runningActionsCount = obj13769_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13769_onSwipeRight_runningActionsCount = window.obj13769_onSwipeRight_runningActionsCount - 1;
if (window.obj13769_onSwipeRight_runningActionsCount == 0) {
	obj13769_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13769_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13769_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13769").trigger("obj13769_onSwipeRight_ended");
		
		return;
	}
	window.obj13769_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13777_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13777_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13777").trigger("obj13777_onSwipeLeft_ended");
		
		return;
	}
	window.obj13777_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13782();
function runjs_13782() {
	window.obj13777_onSwipeLeft_runningActionsCount = obj13777_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13777_onSwipeLeft_runningActionsCount = window.obj13777_onSwipeLeft_runningActionsCount - 1;
if (window.obj13777_onSwipeLeft_runningActionsCount == 0) {
	obj13777_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13777_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13777_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13777").trigger("obj13777_onSwipeLeft_ended");
		
		return;
	}
	window.obj13777_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13777_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13777_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13777").trigger("obj13777_onSwipeRight_ended");
		
		return;
	}
	window.obj13777_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13784();
function runjs_13784() {
	window.obj13777_onSwipeRight_runningActionsCount = obj13777_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13777_onSwipeRight_runningActionsCount = window.obj13777_onSwipeRight_runningActionsCount - 1;
if (window.obj13777_onSwipeRight_runningActionsCount == 0) {
	obj13777_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13777_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13777_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13777").trigger("obj13777_onSwipeRight_ended");
		
		return;
	}
	window.obj13777_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13785_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13785_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13785").trigger("obj13785_onSwipeLeft_ended");
		
		return;
	}
	window.obj13785_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13790();
function runjs_13790() {
	window.obj13785_onSwipeLeft_runningActionsCount = obj13785_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13785_onSwipeLeft_runningActionsCount = window.obj13785_onSwipeLeft_runningActionsCount - 1;
if (window.obj13785_onSwipeLeft_runningActionsCount == 0) {
	obj13785_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13785_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13785_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13785").trigger("obj13785_onSwipeLeft_ended");
		
		return;
	}
	window.obj13785_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13785_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13785_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13785").trigger("obj13785_onSwipeRight_ended");
		
		return;
	}
	window.obj13785_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13792();
function runjs_13792() {
	window.obj13785_onSwipeRight_runningActionsCount = obj13785_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13785_onSwipeRight_runningActionsCount = window.obj13785_onSwipeRight_runningActionsCount - 1;
if (window.obj13785_onSwipeRight_runningActionsCount == 0) {
	obj13785_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13785_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13785_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13785").trigger("obj13785_onSwipeRight_ended");
		
		return;
	}
	window.obj13785_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13793_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13793_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13793").trigger("obj13793_onSwipeLeft_ended");
		
		return;
	}
	window.obj13793_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13798();
function runjs_13798() {
	window.obj13793_onSwipeLeft_runningActionsCount = obj13793_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13793_onSwipeLeft_runningActionsCount = window.obj13793_onSwipeLeft_runningActionsCount - 1;
if (window.obj13793_onSwipeLeft_runningActionsCount == 0) {
	obj13793_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13793_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13793_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13793").trigger("obj13793_onSwipeLeft_ended");
		
		return;
	}
	window.obj13793_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13793_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13793_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13793").trigger("obj13793_onSwipeRight_ended");
		
		return;
	}
	window.obj13793_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13800();
function runjs_13800() {
	window.obj13793_onSwipeRight_runningActionsCount = obj13793_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13793_onSwipeRight_runningActionsCount = window.obj13793_onSwipeRight_runningActionsCount - 1;
if (window.obj13793_onSwipeRight_runningActionsCount == 0) {
	obj13793_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13793_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13793_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13793").trigger("obj13793_onSwipeRight_ended");
		
		return;
	}
	window.obj13793_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13801_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13801_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13801").trigger("obj13801_onSwipeLeft_ended");
		
		return;
	}
	window.obj13801_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13806();
function runjs_13806() {
	window.obj13801_onSwipeLeft_runningActionsCount = obj13801_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13801_onSwipeLeft_runningActionsCount = window.obj13801_onSwipeLeft_runningActionsCount - 1;
if (window.obj13801_onSwipeLeft_runningActionsCount == 0) {
	obj13801_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13801_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13801_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13801").trigger("obj13801_onSwipeLeft_ended");
		
		return;
	}
	window.obj13801_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13801_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13801_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13801").trigger("obj13801_onSwipeRight_ended");
		
		return;
	}
	window.obj13801_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13808();
function runjs_13808() {
	window.obj13801_onSwipeRight_runningActionsCount = obj13801_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13801_onSwipeRight_runningActionsCount = window.obj13801_onSwipeRight_runningActionsCount - 1;
if (window.obj13801_onSwipeRight_runningActionsCount == 0) {
	obj13801_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13801_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13801_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13801").trigger("obj13801_onSwipeRight_ended");
		
		return;
	}
	window.obj13801_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13809_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13809_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13809").trigger("obj13809_onSwipeLeft_ended");
		
		return;
	}
	window.obj13809_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13814();
function runjs_13814() {
	window.obj13809_onSwipeLeft_runningActionsCount = obj13809_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13809_onSwipeLeft_runningActionsCount = window.obj13809_onSwipeLeft_runningActionsCount - 1;
if (window.obj13809_onSwipeLeft_runningActionsCount == 0) {
	obj13809_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13809_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13809_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13809").trigger("obj13809_onSwipeLeft_ended");
		
		return;
	}
	window.obj13809_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13809_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13809_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13809").trigger("obj13809_onSwipeRight_ended");
		
		return;
	}
	window.obj13809_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13816();
function runjs_13816() {
	window.obj13809_onSwipeRight_runningActionsCount = obj13809_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13809_onSwipeRight_runningActionsCount = window.obj13809_onSwipeRight_runningActionsCount - 1;
if (window.obj13809_onSwipeRight_runningActionsCount == 0) {
	obj13809_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13809_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13809_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13809").trigger("obj13809_onSwipeRight_ended");
		
		return;
	}
	window.obj13809_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13817_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13817_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13817").trigger("obj13817_onSwipeLeft_ended");
		
		return;
	}
	window.obj13817_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13822();
function runjs_13822() {
	window.obj13817_onSwipeLeft_runningActionsCount = obj13817_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13817_onSwipeLeft_runningActionsCount = window.obj13817_onSwipeLeft_runningActionsCount - 1;
if (window.obj13817_onSwipeLeft_runningActionsCount == 0) {
	obj13817_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13817_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13817_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13817").trigger("obj13817_onSwipeLeft_ended");
		
		return;
	}
	window.obj13817_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13817_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13817_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13817").trigger("obj13817_onSwipeRight_ended");
		
		return;
	}
	window.obj13817_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13824();
function runjs_13824() {
	window.obj13817_onSwipeRight_runningActionsCount = obj13817_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13817_onSwipeRight_runningActionsCount = window.obj13817_onSwipeRight_runningActionsCount - 1;
if (window.obj13817_onSwipeRight_runningActionsCount == 0) {
	obj13817_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13817_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13817_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13817").trigger("obj13817_onSwipeRight_ended");
		
		return;
	}
	window.obj13817_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13825_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13825_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13825").trigger("obj13825_onSwipeLeft_ended");
		
		return;
	}
	window.obj13825_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13831();
function runjs_13831() {
	window.obj13825_onSwipeLeft_runningActionsCount = obj13825_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13825_onSwipeLeft_runningActionsCount = window.obj13825_onSwipeLeft_runningActionsCount - 1;
if (window.obj13825_onSwipeLeft_runningActionsCount == 0) {
	obj13825_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13825_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13825_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13825").trigger("obj13825_onSwipeLeft_ended");
		
		return;
	}
	window.obj13825_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13825_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13825_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13825").trigger("obj13825_onSwipeRight_ended");
		
		return;
	}
	window.obj13825_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13833();
function runjs_13833() {
	window.obj13825_onSwipeRight_runningActionsCount = obj13825_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13825_onSwipeRight_runningActionsCount = window.obj13825_onSwipeRight_runningActionsCount - 1;
if (window.obj13825_onSwipeRight_runningActionsCount == 0) {
	obj13825_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13825_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13825_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13825").trigger("obj13825_onSwipeRight_ended");
		
		return;
	}
	window.obj13825_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13834_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13834_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13834").trigger("obj13834_onSwipeLeft_ended");
		
		return;
	}
	window.obj13834_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13839();
function runjs_13839() {
	window.obj13834_onSwipeLeft_runningActionsCount = obj13834_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13834_onSwipeLeft_runningActionsCount = window.obj13834_onSwipeLeft_runningActionsCount - 1;
if (window.obj13834_onSwipeLeft_runningActionsCount == 0) {
	obj13834_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13834_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13834_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13834").trigger("obj13834_onSwipeLeft_ended");
		
		return;
	}
	window.obj13834_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13834_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13834_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13834").trigger("obj13834_onSwipeRight_ended");
		
		return;
	}
	window.obj13834_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13841();
function runjs_13841() {
	window.obj13834_onSwipeRight_runningActionsCount = obj13834_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13834_onSwipeRight_runningActionsCount = window.obj13834_onSwipeRight_runningActionsCount - 1;
if (window.obj13834_onSwipeRight_runningActionsCount == 0) {
	obj13834_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13834_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13834_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13834").trigger("obj13834_onSwipeRight_ended");
		
		return;
	}
	window.obj13834_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13842_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13842_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13842").trigger("obj13842_onSwipeLeft_ended");
		
		return;
	}
	window.obj13842_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13847();
function runjs_13847() {
	window.obj13842_onSwipeLeft_runningActionsCount = obj13842_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13842_onSwipeLeft_runningActionsCount = window.obj13842_onSwipeLeft_runningActionsCount - 1;
if (window.obj13842_onSwipeLeft_runningActionsCount == 0) {
	obj13842_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13842_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13842_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13842").trigger("obj13842_onSwipeLeft_ended");
		
		return;
	}
	window.obj13842_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13842_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13842_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13842").trigger("obj13842_onSwipeRight_ended");
		
		return;
	}
	window.obj13842_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13849();
function runjs_13849() {
	window.obj13842_onSwipeRight_runningActionsCount = obj13842_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13842_onSwipeRight_runningActionsCount = window.obj13842_onSwipeRight_runningActionsCount - 1;
if (window.obj13842_onSwipeRight_runningActionsCount == 0) {
	obj13842_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13842_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13842_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13842").trigger("obj13842_onSwipeRight_ended");
		
		return;
	}
	window.obj13842_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13850_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13850_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13850").trigger("obj13850_onSwipeLeft_ended");
		
		return;
	}
	window.obj13850_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13855();
function runjs_13855() {
	window.obj13850_onSwipeLeft_runningActionsCount = obj13850_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13850_onSwipeLeft_runningActionsCount = window.obj13850_onSwipeLeft_runningActionsCount - 1;
if (window.obj13850_onSwipeLeft_runningActionsCount == 0) {
	obj13850_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13850_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13850_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13850").trigger("obj13850_onSwipeLeft_ended");
		
		return;
	}
	window.obj13850_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13850_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13850_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13850").trigger("obj13850_onSwipeRight_ended");
		
		return;
	}
	window.obj13850_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13857();
function runjs_13857() {
	window.obj13850_onSwipeRight_runningActionsCount = obj13850_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13850_onSwipeRight_runningActionsCount = window.obj13850_onSwipeRight_runningActionsCount - 1;
if (window.obj13850_onSwipeRight_runningActionsCount == 0) {
	obj13850_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13850_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13850_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13850").trigger("obj13850_onSwipeRight_ended");
		
		return;
	}
	window.obj13850_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13858_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13858_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13858").trigger("obj13858_onSwipeLeft_ended");
		
		return;
	}
	window.obj13858_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13861();
function runjs_13861() {
	window.obj13858_onSwipeLeft_runningActionsCount = obj13858_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13858_onSwipeLeft_runningActionsCount = window.obj13858_onSwipeLeft_runningActionsCount - 1;
if (window.obj13858_onSwipeLeft_runningActionsCount == 0) {
	obj13858_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13858_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13858_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13858").trigger("obj13858_onSwipeLeft_ended");
		
		return;
	}
	window.obj13858_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13858_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13858_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13858").trigger("obj13858_onSwipeRight_ended");
		
		return;
	}
	window.obj13858_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13863();
function runjs_13863() {
	window.obj13858_onSwipeRight_runningActionsCount = obj13858_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13858_onSwipeRight_runningActionsCount = window.obj13858_onSwipeRight_runningActionsCount - 1;
if (window.obj13858_onSwipeRight_runningActionsCount == 0) {
	obj13858_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13858_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13858_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13858").trigger("obj13858_onSwipeRight_ended");
		
		return;
	}
	window.obj13858_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13864_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13864_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13864").trigger("obj13864_onSwipeLeft_ended");
		
		return;
	}
	window.obj13864_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13867();
function runjs_13867() {
	window.obj13864_onSwipeLeft_runningActionsCount = obj13864_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13864_onSwipeLeft_runningActionsCount = window.obj13864_onSwipeLeft_runningActionsCount - 1;
if (window.obj13864_onSwipeLeft_runningActionsCount == 0) {
	obj13864_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13864_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13864_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13864").trigger("obj13864_onSwipeLeft_ended");
		
		return;
	}
	window.obj13864_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13864_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13864_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13864").trigger("obj13864_onSwipeRight_ended");
		
		return;
	}
	window.obj13864_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13869();
function runjs_13869() {
	window.obj13864_onSwipeRight_runningActionsCount = obj13864_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13864_onSwipeRight_runningActionsCount = window.obj13864_onSwipeRight_runningActionsCount - 1;
if (window.obj13864_onSwipeRight_runningActionsCount == 0) {
	obj13864_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13864_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13864_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13864").trigger("obj13864_onSwipeRight_ended");
		
		return;
	}
	window.obj13864_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13870_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13870_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13870").trigger("obj13870_onSwipeLeft_ended");
		
		return;
	}
	window.obj13870_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13873();
function runjs_13873() {
	window.obj13870_onSwipeLeft_runningActionsCount = obj13870_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13870_onSwipeLeft_runningActionsCount = window.obj13870_onSwipeLeft_runningActionsCount - 1;
if (window.obj13870_onSwipeLeft_runningActionsCount == 0) {
	obj13870_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13870_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13870_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13870").trigger("obj13870_onSwipeLeft_ended");
		
		return;
	}
	window.obj13870_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13870_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13870_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13870").trigger("obj13870_onSwipeRight_ended");
		
		return;
	}
	window.obj13870_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13875();
function runjs_13875() {
	window.obj13870_onSwipeRight_runningActionsCount = obj13870_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13870_onSwipeRight_runningActionsCount = window.obj13870_onSwipeRight_runningActionsCount - 1;
if (window.obj13870_onSwipeRight_runningActionsCount == 0) {
	obj13870_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13870_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13870_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13870").trigger("obj13870_onSwipeRight_ended");
		
		return;
	}
	window.obj13870_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13876_onSwipeLeft_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13876_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13876").trigger("obj13876_onSwipeLeft_ended");
		
		return;
	}
	window.obj13876_onSwipeLeft_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13879();
function runjs_13879() {
	window.obj13876_onSwipeLeft_runningActionsCount = obj13876_onSwipeLeft_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13876_onSwipeLeft_runningActionsCount = window.obj13876_onSwipeLeft_runningActionsCount - 1;
if (window.obj13876_onSwipeLeft_runningActionsCount == 0) {
	obj13876_onSwipeLeft_actionGroup1();
}
	}, 1);
}






};
obj13876_onSwipeLeft_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13876_onSwipeLeft_activeActionGroupIndex = -1;
		$("#obj13876").trigger("obj13876_onSwipeLeft_ended");
		
		return;
	}
	window.obj13876_onSwipeLeft_activeActionGroupIndex = 1;
	




















};
obj13876_onSwipeRight_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13876_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13876").trigger("obj13876_onSwipeRight_ended");
		
		return;
	}
	window.obj13876_onSwipeRight_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13881();
function runjs_13881() {
	window.obj13876_onSwipeRight_runningActionsCount = obj13876_onSwipeRight_runningActionsCount + 1;

	var nothing;
	setTimeout(function() {
		window.obj13876_onSwipeRight_runningActionsCount = window.obj13876_onSwipeRight_runningActionsCount - 1;
if (window.obj13876_onSwipeRight_runningActionsCount == 0) {
	obj13876_onSwipeRight_actionGroup1();
}
	}, 1);
}






};
obj13876_onSwipeRight_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13876_onSwipeRight_activeActionGroupIndex = -1;
		$("#obj13876").trigger("obj13876_onSwipeRight_ended");
		
		return;
	}
	window.obj13876_onSwipeRight_activeActionGroupIndex = 1;
	




















};
obj13882_onTouchUp_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13882_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13882").trigger("obj13882_onTouchUp_ended");
		
		return;
	}
	window.obj13882_onTouchUp_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_13885();
function runjs_13885() {
	window.obj13882_onTouchUp_runningActionsCount = obj13882_onTouchUp_runningActionsCount + 1;

	window[nameFromPage] = pageTitle;
localStorage[nameFromPage] = window[nameFromPage];
	setTimeout(function() {
		window.obj13882_onTouchUp_runningActionsCount = window.obj13882_onTouchUp_runningActionsCount - 1;
if (window.obj13882_onTouchUp_runningActionsCount == 0) {
	obj13882_onTouchUp_actionGroup1();
}
	}, 1);
}






};
obj13882_onTouchUp_actionGroup1 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj13882_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13882").trigger("obj13882_onTouchUp_ended");
		
		return;
	}
	window.obj13882_onTouchUp_activeActionGroupIndex = 1;
	
//	action: goToPage
//	target: page4 
goToPage_13886();
function goToPage_13886() {
	window.obj13882_onTouchUp_runningActionsCount = obj13882_onTouchUp_runningActionsCount + 1;
	$(location).attr('href', '../4/page.xhtml');
	window.obj13882_onTouchUp_runningActionsCount = window.obj13882_onTouchUp_runningActionsCount - 1;
if (window.obj13882_onTouchUp_runningActionsCount == 0) {
	obj13882_onTouchUp_actionGroup2();
}
}




















};
obj13882_onTouchUp_actionGroup2 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj13882_onTouchUp_activeActionGroupIndex = -1;
		$("#obj13882").trigger("obj13882_onTouchUp_ended");
		
		return;
	}
	window.obj13882_onTouchUp_activeActionGroupIndex = 2;
	




















};
obj14152_onLoad_actionGroup0 = function(){
	isLastActionGroup = false;
	if (isLastActionGroup) {
		window.obj14152_onLoad_activeActionGroupIndex = -1;
		$("#obj14152").trigger("obj14152_onLoad_ended");
		
		return;
	}
	window.obj14152_onLoad_activeActionGroupIndex = 0;
	














//	action: Run JavaScript
runjs_14155();
function runjs_14155() {
	window.obj14152_onLoad_runningActionsCount = obj14152_onLoad_runningActionsCount + 1;

	/* Génération menu dans l'ordre */
$.each( [ "contraste", 
          "aeration", 
          "phonemes", 
          "syllabes", 
          "trameRheses", 
          "trameLignes", 
          "ponctuation", 
          "popUp", 
          "suiviAudio", 
          "suiviSilence", 
          "narration",
          "marqueLigne",
          "police",
          "zoom",
          "dezoom",
          "pageApage",
          "vide1",
          "vide2",
          "vide3",
          "vide4"], function( i, bequille ){
            $('.' + bequille + '-icon').css ({ 'top' : grilleTiroirY[regCourant[bequille]], 'left' : grilleTiroirX[regCourant[bequille]] });
    });
/*styleText();*/
	setTimeout(function() {
		window.obj14152_onLoad_runningActionsCount = window.obj14152_onLoad_runningActionsCount - 1;
if (window.obj14152_onLoad_runningActionsCount == 0) {
	obj14152_onLoad_actionGroup1();
}
	}, 1);
}






};
obj14152_onLoad_actionGroup1 = function(){
	isLastActionGroup = true;
	if (isLastActionGroup) {
		window.obj14152_onLoad_activeActionGroupIndex = -1;
		$("#obj14152").trigger("obj14152_onLoad_ended");
		
		return;
	}
	window.obj14152_onLoad_activeActionGroupIndex = 1;
	




















};
		
		/*
		 *
	 	 *  Events
	 	 *
	 	 */
		





































































/*
 *
 *   obj14140: Event Show
 *
 */
 
$("#obj14140").one('SCEventShow', function(event) {
	if (window.obj14140_onShow_activeActionGroupIndex != -1) return;
var obj14140_onShow_runningActionsCount = 0;
var obj14140_onShow_loopCount = 0;
obj14140_onShow_actionGroup0();
});


















/*
 *
 *   obj13689: Event Touch Up
 *
 */
$("#obj13689").bind(window.touchUpEvent, function(event) {
	event.preventDefault();
	var startActionList = function() {
		$("#obj13689").unbind("obj13689_onTouchDown_ended", startActionList);
	    if (window.obj13689_onTouchUp_activeActionGroupIndex != -1) return;
var obj13689_onTouchUp_runningActionsCount = 0;
var obj13689_onTouchUp_loopCount = 0;
obj13689_onTouchUp_actionGroup0();
	};
	if ((window['obj13689_onTouchDown_activeActionGroupIndex'] == undefined) || window.obj13689_onTouchDown_activeActionGroupIndex == -1) {
		startActionList();
	} else {
		$("#obj13689").bind("obj13689_onTouchDown_ended", startActionList);
	}
});













/*
 *
 *   obj13695: Event Touch Up
 *
 */
$("#obj13695").bind(window.touchUpEvent, function(event) {
	event.preventDefault();
	var startActionList = function() {
		$("#obj13695").unbind("obj13695_onTouchDown_ended", startActionList);
	    if (window.obj13695_onTouchUp_activeActionGroupIndex != -1) return;
var obj13695_onTouchUp_runningActionsCount = 0;
var obj13695_onTouchUp_loopCount = 0;
obj13695_onTouchUp_actionGroup0();
	};
	if ((window['obj13695_onTouchDown_activeActionGroupIndex'] == undefined) || window.obj13695_onTouchDown_activeActionGroupIndex == -1) {
		startActionList();
	} else {
		$("#obj13695").bind("obj13695_onTouchDown_ended", startActionList);
	}
});













/*
 *
 *   obj13704: Event Touch Up
 *
 */
$("#obj13704").bind(window.touchUpEvent, function(event) {
	event.preventDefault();
	var startActionList = function() {
		$("#obj13704").unbind("obj13704_onTouchDown_ended", startActionList);
	    if (window.obj13704_onTouchUp_activeActionGroupIndex != -1) return;
var obj13704_onTouchUp_runningActionsCount = 0;
var obj13704_onTouchUp_loopCount = 0;
obj13704_onTouchUp_actionGroup0();
	};
	if ((window['obj13704_onTouchDown_activeActionGroupIndex'] == undefined) || window.obj13704_onTouchDown_activeActionGroupIndex == -1) {
		startActionList();
	} else {
		$("#obj13704").bind("obj13704_onTouchDown_ended", startActionList);
	}
});


/*
 *
 *   obj13704: Event PinchOpen
 *
 */
if (window.SCuaosIsWindows) 
	SCPreventTouch("#obj13704");
$("#obj13704").bind(window.touchDownEvent, function(event) {
	event.preventDefault();
});
$("#obj13704").bind(window.pinchopen, function(event) {
		if (window.obj13704_onPinchOpen_activeActionGroupIndex != -1) return;
var obj13704_onPinchOpen_runningActionsCount = 0;
var obj13704_onPinchOpen_loopCount = 0;
obj13704_onPinchOpen_actionGroup0();
});		


/*
 *
 *   obj13710: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13710");

$("#obj13710").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13710").bind("SCswipeleft", function(event) {
	if (window.obj13710_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13710_onSwipeLeft_runningActionsCount = 0;
var obj13710_onSwipeLeft_loopCount = 0;
obj13710_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13710: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13710");
$("#obj13710").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13710").bind("SCswiperight", function(event) {
	if (window.obj13710_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13710_onSwipeRight_runningActionsCount = 0;
var obj13710_onSwipeRight_loopCount = 0;
obj13710_onSwipeRight_actionGroup0();
});














/*
 *
 *   obj13721: Event Touch Up
 *
 */
$("#obj13721").bind(window.touchUpEvent, function(event) {
	event.preventDefault();
	var startActionList = function() {
		$("#obj13721").unbind("obj13721_onTouchDown_ended", startActionList);
	    if (window.obj13721_onTouchUp_activeActionGroupIndex != -1) return;
var obj13721_onTouchUp_runningActionsCount = 0;
var obj13721_onTouchUp_loopCount = 0;
obj13721_onTouchUp_actionGroup0();
	};
	if ((window['obj13721_onTouchDown_activeActionGroupIndex'] == undefined) || window.obj13721_onTouchDown_activeActionGroupIndex == -1) {
		startActionList();
	} else {
		$("#obj13721").bind("obj13721_onTouchDown_ended", startActionList);
	}
});




/*
 *
 *   obj13729: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13729");

$("#obj13729").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13729").bind("SCswipeleft", function(event) {
	if (window.obj13729_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13729_onSwipeLeft_runningActionsCount = 0;
var obj13729_onSwipeLeft_loopCount = 0;
obj13729_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13729: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13729");
$("#obj13729").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13729").bind("SCswiperight", function(event) {
	if (window.obj13729_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13729_onSwipeRight_runningActionsCount = 0;
var obj13729_onSwipeRight_loopCount = 0;
obj13729_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13737: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13737");

$("#obj13737").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13737").bind("SCswipeleft", function(event) {
	if (window.obj13737_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13737_onSwipeLeft_runningActionsCount = 0;
var obj13737_onSwipeLeft_loopCount = 0;
obj13737_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13737: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13737");
$("#obj13737").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13737").bind("SCswiperight", function(event) {
	if (window.obj13737_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13737_onSwipeRight_runningActionsCount = 0;
var obj13737_onSwipeRight_loopCount = 0;
obj13737_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13745: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13745");

$("#obj13745").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13745").bind("SCswipeleft", function(event) {
	if (window.obj13745_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13745_onSwipeLeft_runningActionsCount = 0;
var obj13745_onSwipeLeft_loopCount = 0;
obj13745_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13745: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13745");
$("#obj13745").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13745").bind("SCswiperight", function(event) {
	if (window.obj13745_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13745_onSwipeRight_runningActionsCount = 0;
var obj13745_onSwipeRight_loopCount = 0;
obj13745_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13753: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13753");

$("#obj13753").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13753").bind("SCswipeleft", function(event) {
	if (window.obj13753_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13753_onSwipeLeft_runningActionsCount = 0;
var obj13753_onSwipeLeft_loopCount = 0;
obj13753_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13753: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13753");
$("#obj13753").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13753").bind("SCswiperight", function(event) {
	if (window.obj13753_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13753_onSwipeRight_runningActionsCount = 0;
var obj13753_onSwipeRight_loopCount = 0;
obj13753_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13761: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13761");

$("#obj13761").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13761").bind("SCswipeleft", function(event) {
	if (window.obj13761_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13761_onSwipeLeft_runningActionsCount = 0;
var obj13761_onSwipeLeft_loopCount = 0;
obj13761_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13761: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13761");
$("#obj13761").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13761").bind("SCswiperight", function(event) {
	if (window.obj13761_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13761_onSwipeRight_runningActionsCount = 0;
var obj13761_onSwipeRight_loopCount = 0;
obj13761_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13769: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13769");

$("#obj13769").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13769").bind("SCswipeleft", function(event) {
	if (window.obj13769_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13769_onSwipeLeft_runningActionsCount = 0;
var obj13769_onSwipeLeft_loopCount = 0;
obj13769_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13769: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13769");
$("#obj13769").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13769").bind("SCswiperight", function(event) {
	if (window.obj13769_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13769_onSwipeRight_runningActionsCount = 0;
var obj13769_onSwipeRight_loopCount = 0;
obj13769_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13777: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13777");

$("#obj13777").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13777").bind("SCswipeleft", function(event) {
	if (window.obj13777_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13777_onSwipeLeft_runningActionsCount = 0;
var obj13777_onSwipeLeft_loopCount = 0;
obj13777_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13777: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13777");
$("#obj13777").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13777").bind("SCswiperight", function(event) {
	if (window.obj13777_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13777_onSwipeRight_runningActionsCount = 0;
var obj13777_onSwipeRight_loopCount = 0;
obj13777_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13785: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13785");

$("#obj13785").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13785").bind("SCswipeleft", function(event) {
	if (window.obj13785_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13785_onSwipeLeft_runningActionsCount = 0;
var obj13785_onSwipeLeft_loopCount = 0;
obj13785_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13785: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13785");
$("#obj13785").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13785").bind("SCswiperight", function(event) {
	if (window.obj13785_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13785_onSwipeRight_runningActionsCount = 0;
var obj13785_onSwipeRight_loopCount = 0;
obj13785_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13793: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13793");

$("#obj13793").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13793").bind("SCswipeleft", function(event) {
	if (window.obj13793_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13793_onSwipeLeft_runningActionsCount = 0;
var obj13793_onSwipeLeft_loopCount = 0;
obj13793_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13793: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13793");
$("#obj13793").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13793").bind("SCswiperight", function(event) {
	if (window.obj13793_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13793_onSwipeRight_runningActionsCount = 0;
var obj13793_onSwipeRight_loopCount = 0;
obj13793_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13801: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13801");

$("#obj13801").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13801").bind("SCswipeleft", function(event) {
	if (window.obj13801_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13801_onSwipeLeft_runningActionsCount = 0;
var obj13801_onSwipeLeft_loopCount = 0;
obj13801_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13801: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13801");
$("#obj13801").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13801").bind("SCswiperight", function(event) {
	if (window.obj13801_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13801_onSwipeRight_runningActionsCount = 0;
var obj13801_onSwipeRight_loopCount = 0;
obj13801_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13809: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13809");

$("#obj13809").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13809").bind("SCswipeleft", function(event) {
	if (window.obj13809_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13809_onSwipeLeft_runningActionsCount = 0;
var obj13809_onSwipeLeft_loopCount = 0;
obj13809_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13809: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13809");
$("#obj13809").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13809").bind("SCswiperight", function(event) {
	if (window.obj13809_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13809_onSwipeRight_runningActionsCount = 0;
var obj13809_onSwipeRight_loopCount = 0;
obj13809_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13817: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13817");

$("#obj13817").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13817").bind("SCswipeleft", function(event) {
	if (window.obj13817_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13817_onSwipeLeft_runningActionsCount = 0;
var obj13817_onSwipeLeft_loopCount = 0;
obj13817_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13817: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13817");
$("#obj13817").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13817").bind("SCswiperight", function(event) {
	if (window.obj13817_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13817_onSwipeRight_runningActionsCount = 0;
var obj13817_onSwipeRight_loopCount = 0;
obj13817_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13825: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13825");

$("#obj13825").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13825").bind("SCswipeleft", function(event) {
	if (window.obj13825_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13825_onSwipeLeft_runningActionsCount = 0;
var obj13825_onSwipeLeft_loopCount = 0;
obj13825_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13825: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13825");
$("#obj13825").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13825").bind("SCswiperight", function(event) {
	if (window.obj13825_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13825_onSwipeRight_runningActionsCount = 0;
var obj13825_onSwipeRight_loopCount = 0;
obj13825_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13834: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13834");

$("#obj13834").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13834").bind("SCswipeleft", function(event) {
	if (window.obj13834_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13834_onSwipeLeft_runningActionsCount = 0;
var obj13834_onSwipeLeft_loopCount = 0;
obj13834_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13834: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13834");
$("#obj13834").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13834").bind("SCswiperight", function(event) {
	if (window.obj13834_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13834_onSwipeRight_runningActionsCount = 0;
var obj13834_onSwipeRight_loopCount = 0;
obj13834_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13842: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13842");

$("#obj13842").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13842").bind("SCswipeleft", function(event) {
	if (window.obj13842_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13842_onSwipeLeft_runningActionsCount = 0;
var obj13842_onSwipeLeft_loopCount = 0;
obj13842_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13842: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13842");
$("#obj13842").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13842").bind("SCswiperight", function(event) {
	if (window.obj13842_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13842_onSwipeRight_runningActionsCount = 0;
var obj13842_onSwipeRight_loopCount = 0;
obj13842_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13850: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13850");

$("#obj13850").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13850").bind("SCswipeleft", function(event) {
	if (window.obj13850_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13850_onSwipeLeft_runningActionsCount = 0;
var obj13850_onSwipeLeft_loopCount = 0;
obj13850_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13850: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13850");
$("#obj13850").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13850").bind("SCswiperight", function(event) {
	if (window.obj13850_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13850_onSwipeRight_runningActionsCount = 0;
var obj13850_onSwipeRight_loopCount = 0;
obj13850_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13858: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13858");

$("#obj13858").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13858").bind("SCswipeleft", function(event) {
	if (window.obj13858_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13858_onSwipeLeft_runningActionsCount = 0;
var obj13858_onSwipeLeft_loopCount = 0;
obj13858_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13858: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13858");
$("#obj13858").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13858").bind("SCswiperight", function(event) {
	if (window.obj13858_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13858_onSwipeRight_runningActionsCount = 0;
var obj13858_onSwipeRight_loopCount = 0;
obj13858_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13864: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13864");

$("#obj13864").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13864").bind("SCswipeleft", function(event) {
	if (window.obj13864_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13864_onSwipeLeft_runningActionsCount = 0;
var obj13864_onSwipeLeft_loopCount = 0;
obj13864_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13864: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13864");
$("#obj13864").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13864").bind("SCswiperight", function(event) {
	if (window.obj13864_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13864_onSwipeRight_runningActionsCount = 0;
var obj13864_onSwipeRight_loopCount = 0;
obj13864_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13870: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13870");

$("#obj13870").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13870").bind("SCswipeleft", function(event) {
	if (window.obj13870_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13870_onSwipeLeft_runningActionsCount = 0;
var obj13870_onSwipeLeft_loopCount = 0;
obj13870_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13870: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13870");
$("#obj13870").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13870").bind("SCswiperight", function(event) {
	if (window.obj13870_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13870_onSwipeRight_runningActionsCount = 0;
var obj13870_onSwipeRight_loopCount = 0;
obj13870_onSwipeRight_actionGroup0();
});






/*
 *
 *   obj13876: Event SwipeLeft
 *
 */
if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13876");

$("#obj13876").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13876").bind("SCswipeleft", function(event) {
	if (window.obj13876_onSwipeLeft_activeActionGroupIndex != -1) return;
var obj13876_onSwipeLeft_runningActionsCount = 0;
var obj13876_onSwipeLeft_loopCount = 0;
obj13876_onSwipeLeft_actionGroup0();
});
/*
 *
 *   obj13876: Event SwipeRight
 *
 */
 if (window.SCuaosIsWindows)
	SCPreventTouch("#obj13876");
$("#obj13876").bind("touchmove", function(event) {
	event.preventDefault();
})
$("#obj13876").bind("SCswiperight", function(event) {
	if (window.obj13876_onSwipeRight_activeActionGroupIndex != -1) return;
var obj13876_onSwipeRight_runningActionsCount = 0;
var obj13876_onSwipeRight_loopCount = 0;
obj13876_onSwipeRight_actionGroup0();
});








/*
 *
 *   obj13882: Event Touch Up
 *
 */
$("#obj13882").bind(window.touchUpEvent, function(event) {
	event.preventDefault();
	var startActionList = function() {
		$("#obj13882").unbind("obj13882_onTouchDown_ended", startActionList);
	    if (window.obj13882_onTouchUp_activeActionGroupIndex != -1) return;
var obj13882_onTouchUp_runningActionsCount = 0;
var obj13882_onTouchUp_loopCount = 0;
obj13882_onTouchUp_actionGroup0();
	};
	if ((window['obj13882_onTouchDown_activeActionGroupIndex'] == undefined) || window.obj13882_onTouchDown_activeActionGroupIndex == -1) {
		startActionList();
	} else {
		$("#obj13882").bind("obj13882_onTouchDown_ended", startActionList);
	}
});





















/*
 *
 *   obj14152: Event Load
 *
 */
setTimeout(function () {
if (window.obj14152_onLoad_activeActionGroupIndex != -1) return;
var obj14152_onLoad_runningActionsCount = 0;
var obj14152_onLoad_loopCount = 0;
obj14152_onLoad_actionGroup0();
}, 200);


		
		/*
		 *
	 	 *   Trigger onShow events for objects already shown on stage
	 	 *
	 	 */
	 	setTimeout(function() {
		
$("#obj14107").trigger('SCEventShow');
$("#obj14109").trigger('SCEventShow');
$("#obj14111").trigger('SCEventShow');
$("#obj14113").trigger('SCEventShow');
$("#obj14115").trigger('SCEventShow');
$("#obj14117").trigger('SCEventShow');
$("#obj14119").trigger('SCEventShow');
$("#obj14123").trigger('SCEventShow');
$("#obj14134").trigger('SCEventShow');
$("#obj14140").trigger('SCEventShow');
$("#obj14148").trigger('SCEventShow');
$("#obj13710").trigger('SCEventShow');
$("#obj13718").trigger('SCEventShow');
$("#obj13721").trigger('SCEventShow');
$("#obj13729").trigger('SCEventShow');
$("#obj13737").trigger('SCEventShow');
$("#obj13745").trigger('SCEventShow');
$("#obj13753").trigger('SCEventShow');
$("#obj13761").trigger('SCEventShow');
$("#obj13769").trigger('SCEventShow');
$("#obj13777").trigger('SCEventShow');
$("#obj13785").trigger('SCEventShow');
$("#obj13793").trigger('SCEventShow');
$("#obj13801").trigger('SCEventShow');
$("#obj13809").trigger('SCEventShow');
$("#obj13817").trigger('SCEventShow');
$("#obj13825").trigger('SCEventShow');
$("#obj13834").trigger('SCEventShow');
$("#obj13842").trigger('SCEventShow');
$("#obj13850").trigger('SCEventShow');
$("#obj13858").trigger('SCEventShow');
$("#obj13864").trigger('SCEventShow');
$("#obj13870").trigger('SCEventShow');
$("#obj13876").trigger('SCEventShow');
$("#obj13882").trigger('SCEventShow');
$("#obj14094").trigger('SCEventShow');
		$(window).trigger('SCEventPageReady');
		}, 200);
	 }
})