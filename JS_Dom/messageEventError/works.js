function rwbuff() {
  var {port1, port2} = new MessageChannel()
  var buff = [];
  var skip_buffer = true;
  let last_listener = Symbol();
  port2.addEventListener('message', (msg)=>{ if(!skip_buffer){
    debugger;
    buff.push(msg)
  } })
  port2.start();
  return {
    read() {
      return new Promise((res)=>{
        if(buff.length){
          //debugger;
          var tores = buff.shift();
          skip_buffer = !buff.length;
          res(tores);
        }
        else {
          const local_last = last_listener = Symbol('last');
          //debugger;
          const local_func = (msg)=>{ 
            //debugger;
            console.log(port2)
            skip_buffer = !(local_last === last_listener);
            console.log({res: msg});
            res(msg);
            msg.stopImmediatePropagation();
            port2.removeEventListener('message', local_func, true)
          }
          port2.addEventListener('message', local_func, true)
        }
      })
    },
    write(v) {
      //debugger;
      return port1.postMessage(v)
    }
  }
}

var {read, write} = rwbuff();
read().then(v=>{ console.log(v) })
read().then(v=>{ console.log(v) })
read().then(v=>{ console.log(v) })
read().then(v=>{ console.log(v) })
write('aaa')
write('bbb')
write('ccc')
