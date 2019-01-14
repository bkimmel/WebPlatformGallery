function debounce (fn, time) {
  const flush = Symbol('FLUSH');
  let src; 
  const ws = new WritableStream({ write: fn/* Writes directly to the wrapped function */});
  const rs = new ReadableStream({
    start(controller){
      //console.log('starting');
      src = function(idx) {
        //console.log('enqueue: ', idx)
        controller.enqueue(idx)
      }
    },
  });
  const ts = new TransformStream({
    transform(chunk, controller){
      console.log('transform');
      /*Holds the (latest) chunk until the debounce timer elapses, then sends it to the writable side*/
      if(!this[flush]) {
        this.holding = chunk;
        setTimeout(()=>{ controller.enqueue(this.holding); this[flush] = false; }, time);
        this[flush] = true; 
      }
      else {
        this.holding = chunk;
      }
      //controller.enqueue(chunk);
    }
  });
  //let writer = ws.getWriter();
  rs
    .pipeThrough(ts)
    .pipeTo(ws);
  //let reader = rs.getReader().read().then((v)=>{ console.info(v.value) })
  return src;
}



function callback(input) {
  console.log('Callback: ', input);
}

var debouncedCallback = debounce(callback, 500)

// These next 3 invocations should only print '3'
debouncedCallback(1)
debouncedCallback(2)
debouncedCallback(3)

// These next two invocations should print '4' and '5'
setTimeout(
  function () {  
    //should print 4 and then 5
    debouncedCallback(4)
    
    setTimeout(
      function () {
        debouncedCallback(5)
      },
      700
    )
  },
  1000
);
