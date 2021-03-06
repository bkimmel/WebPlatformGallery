//To track down "mystery traces" where Chrome doesn't report the line number, turn on 'pause on uncaught exceptions' then do this
document.querySelectorAll('script');
//and look at the last script - which is often the offender

//What the hell is happening to this object and why?
//Deprecated in Chrome: Now use ES6 Proxies
//Object.observe(thobjectinquestion, function(change){ console.log(change); debugger; });

//How is that object even getting there in the first place?
//In Chrome Event Listener Breakpoints -> Script -> First Script Load
Object.defineProperty(window, 'weirdobject', { set: function(v){ debugger; window.weirdobject_cache = v; }, get: function(){ return window.weirdobject_cache; } });
  
//When is this function even getting called?
monitor(thefunction);

//When, how, why is this function screwing up?
debug(thefunction);
	//OK, but how the hell did this function even get called?
	console.trace();

//What is wrong with this Event Handler?  Is it even getting called at all?
getEventListeners(document);
getEventListeners(document.querySelector('#mydiv'));
//Also, in elements panel - look at the top-right tab labeled "event handlers" and it will display all bubblable handlers for the element

	//OK, but this event handler is just a bunch of weird jQuery stuff... Where is the function it's actually calling?
	jQuery._data( document.querySelector('#mydiv'), "events" );
	//maybe in old jQuery => jQuery('#mydiv').data('events')
	//Walk it up
	function walkitup(el) {
		var handlers = [];
		while( !!el ) {
			handlers.push( jQuery._data( el, "events" ) );
			el = el.parentElement;
		}
		return handlers;
	}
	walkitup( document.querySelectorAll('.addcart .upselladd-button')[2] )
	//From inside the handler function, if necessary:
	debug( it.event.handlers );
		//inside handlers:
		t; //The t object (2nd arg in it.event.handlers function) holds the list of handlers

//Why is this part of the code going so slow or taking so long?
profile('This part');
//code
profileEnd('This part.');
//then check in the code profiler

//What's the deal with this DOM object?
inspect(document.querySelector('#mydiv'));

//What is messing with this DOM object?
	//using MutationObserver.  Make sure "aync debugging" is checked on DevToolss
	var mo = new MutationObserver(function(e){ debugger; });
	mo.observe(document.querySelector('#cdList'), {'characterData': true, 'childList': true, 'subtree': true, 'attributes': true});
  
//I'm keeping my eye on you, mister Precondition:
console.assert(precondition == true, "Precondition not met")

//break on failed assert:
function assertstop() {
	var args = Array.prototype.slice.call(arguments);
	return args.filter(function(v){ return !v; }).length ? (function(){ debugger; })() : true;
}
assertstop(1 === 1, 0 === 0); //nothing
assertstop(true, true, false); //breaks and allows you to inspect (use console.trace to go back through the stack and see where it failed)

//DebugBySignature (Chrome 62)
//debug()'s a function based on a string or RegExp in its source
function DebugBySignature(sig,tmp/*for now? console doesn't persist as an expression*/){
    if(typeof sig == 'string' || sig instanceof RegExp){
        let op = sig instanceof RegExp ? 'match' : 'includes';
        let debuggedfunctions = [];
        //debugger;
        (tmp || queryObjects(Function))
            .filter(function(v){ let ret = null; try{ ret = v.toString()[op](sig); } catch(e){  }; return ret; }) //only the ones that match the signature
            .forEach((v)=>{debug(v); debuggedfunctions.push(v);})
        return debuggedfunctions;
    }
    throw new Error('argument[0] must be a String or a RegExp');
    //Usage: (As of Chrome 62)
    //1. Evaluate in console: queryObjects(Function)
    //2. Right-click and "store as global variable -> temp1" (For some reason Chrome will not honor var abc = queryObjects(Function) - as an expression)
    //3. DebugBySignature('.js_oct_2016_addtocart[data-lvl=', temp1);
}

//DEBUGGING EVENTS:
//1. be cautious - jQuery events jQuery('#mydiv').trigger('submit') - do not always fire native handlers in older versions of jQuery.
//2. jQuery handlers do not account for useCapture
//3. When employing useCapture, you must specify true to remove the listener -->
	//function dosomething(){ console.log(1); }
	//document.querySelector('#mydiv').addEventListener('click',dosomething,true/*usecapture*/)
	//document.querySelector('#mydiv').removeEventListener('click',dosomething,true/*must also specify usecapture to remove*/)


//For Adobe Analytics (at work:) set breakpoint on sendBeacon function to catch Analytics errors
