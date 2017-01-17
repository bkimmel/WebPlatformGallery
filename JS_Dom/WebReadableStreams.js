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

/*********** .tee example *********/
function wrapIterator(i){
    if(!i[Symbol.iterator]){
        return new Error('Symbol.iterator must be an iterator');
    }
    let feeder = (function*(){
        yield* i;
    })();
    return new ReadableStream({
      start(controller) {
           let _data = feeder.next();
           controller[_data.done ? 'close': 'enqueue'](_data.value);
      },
      pull(controller) {
            let _data = feeder.next();
            controller[_data.done ? 'close': 'enqueue'](_data.value);
      },
      cancel() {
            // This is called if the reader cancels
            feeder.close();
      }
    });
}

var myReadableStream = wrapIterator([1,2,3]);
var myTee = myReadableStream.tee();
var stream1 = myTee[0], stream2 = myTee[1];
var reader1 = stream1.getReader(), reader2 = stream2.getReader();
reader1.read().then((v)=>{ console.log('%O',v) });
reader2.read().then((v)=>{ console.log('%O',v) });






