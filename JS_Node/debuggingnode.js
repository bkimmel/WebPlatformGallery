//WITH REPL:

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