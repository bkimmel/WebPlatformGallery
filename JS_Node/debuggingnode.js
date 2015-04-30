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

//WITH NODE-INSPECTOR:
  //run node --debug program.js
  //in a seperate window run node-inspector
    //go to the URL it serves from and it will open a devtools for you

var http = require('http');
var connect = require('connect');
var events = require('events');
var url = require('url');
var fs = require('fs');
var lo_ = require('lodash');

var a = 0;
function toplev() {
	var a = 1;
	function midlev() {
		var a = 2;
		function lowlev() {
			console.log('entering debugger');
			debugger;
			return a;
		}
		return lowlev();
	}
	return midlev();
}

console.log( toplev() );

var server = connect()
 .use(function(req, res, next) {
	res.write( 'result: ' + toplev() );
 });
 
server.listen(3000);

