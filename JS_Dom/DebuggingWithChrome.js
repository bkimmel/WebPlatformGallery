//What the hell is happening to this object and why?
Object.observe(thobjectinquestion, function(change){ console.log(change); debugger; });

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

	//OK, but this event handler is just a bunch of weird jQuery stuff... Where is the function it's actually calling?
	jQuery._data( document.querySelector('#mydiv'), "events" );

//Why is this part of the code going so slow or taking so long?
profile('This part');
//code
profileEnd('This part.');
//then check in the code profiler

//What's the deal with this DOM object?
inspect(document.querySelector('#mydiv'));

//What is messing with this DOM object?
  //--> Go to 'elements' --> Right click the element in question --> Select 'break on subtree modifications' or 'break on attribute modifications' -->  Type console.trace() when you get to the break.

//I'm keeping my eye on you, mister Precondition:
console.assert(precondition == true, "Precondition not met")

//break on failed assert:
function assertstop() {
	var args = Array.prototype.slice.call(arguments);
	return args.filter(function(v){ return !v; }).length ? (function(){ debugger; })() : true;
}
assertstop(1 === 1, 0 === 0); //nothing
assertstop(true, true, false); //breaks and allows you to inspect (use console.trace to go back through the stack and see where it failed)
