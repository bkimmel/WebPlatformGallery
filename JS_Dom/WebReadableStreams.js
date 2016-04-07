function getPortStreamPair() {
    var myChannel = new MessageChannel();
    var writePort = myChannel.port1;
    var readPort = myChannel.port2;

    var buffer = [];

    //debugger;

    var myReadableStream = new ReadableStream({
      start(controller) {
          console.log('Start called...');
          readPort.onmessage = function(msg) {
            console.log('msg.data: %s', msg.data);
            controller.enqueue(msg.data);
          }
      },
      cancel() {
        // This is called if the reader cancels
        
        
      }
    });

    return [myReadableStream, writePort];
}

var activePair = getPortStreamPair();
var myStream = activePair[0];
var myPort = activePair[1];
myReader = myStream.getReader();
//first set up the reader... which will resolve when...
myReader.read().then(function(d){ debugger; console.log('stream reader .read() resolved with: %s', d.value) });

//we write a message to the port
myPort.postMessage('message');
