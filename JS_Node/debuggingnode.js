//WITH REPL:
  //run node debug program.js
  //this will being up the debug> prompt
    //debug> commands:
	  // repl :: drop into repl to inspect vars, objects, etc.
	  // c/cont :: continue to next breakpoint
	  // n/next :: go to next line
	  // s/step :: step into function call
	  // o/out :: step out of function call
	  // sb :: set breakpoint
	  // backtrace :: print call stack
	  
var a = 0;
function toplev() {
	var a = 1;
	function midlev() {
		var a = 2;
		function lowlev() {
			console.log('entering debugger');
			debugger;
		}
	}
}