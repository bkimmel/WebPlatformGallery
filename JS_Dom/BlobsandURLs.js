var sw = URL.createObjectURL(new Blob(['console.log(1)']));
var s = document.createElement('script');
s.setAttribute('src', sw);
document.body.appendChild(s); //Logs 1


//Example with URL from Blob in worker sent to main window
var sblob = new Blob([`
    onmessage = function(e){ var prt = e.ports[0];
        prt.onmessage = function(e){ 
            console.log(e.data);
            var ourl = URL.createObjectURL(new Blob(['<div id="test"></div>']));
            prt.postMessage(ourl); 
        };
    }
`]);
var objurl = URL.createObjectURL(sblob);
var wk = new Worker(objurl);
var mc = new MessageChannel();
URL.revokeObjectURL(objurl);
// wk.onmessage = function(e) {
//     console.log('msg from worker:', e.data);
// }
wk.postMessage(mc.port2,[mc.port2]);
mc.port1.onmessage = function(e){
    console.log(e.data);
    debugger;
};
// var mp = new Map();
// mp.set("test", new DocumentFragment());
//mc.port1.postMessage(mp);

mc.port1.postMessage("call");