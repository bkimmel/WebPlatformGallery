//To test: open localhost:3000 in browser

var connect = require('connect');
var i = 0;

var ssetest = function(){
	window.es = new EventSource("//localhost:3001");
	
	window.es.addEventListener("test", function(ev){ console.log(ev.data) })
	//Failsafe: will only fire for events without a type
	window.es.onmessage = function(event) {
		console.log(event.id,"::",event.data);
	}
}

var doc = '<html><head></head><body><script>(' + ssetest.toString() + ')();</script></body></html>'
var server = connect()
 .use(function(req, res, next) {
	 res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write( doc );
	res.end();
 });
 
 var sse = connect()
 .use(function(req, res, next) {
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "text/event-stream",
		"Transfer-Encoding" : "chunked"
	});
	
	intervalx = setInterval(function() {
		res.write("id: " + (i++) + '\n');
		res.write("event: " + 'test' + "\n");
		res.write("data: " + JSON.stringify({test: '123'}) + "\n\n");
	}, 1000);

	req.connection.addListener("close", function() {
		res.end();
		clearInterval(intervalx);
	});

	//
 });
 
server.listen(3000);
sse.listen(3001);