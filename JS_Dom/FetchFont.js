//<link href="https://fonts.googleapis.com/css?family=Montserrat|Work+Sans" rel="stylesheet">
'use strict';
var fontcache = caches.open('fontstore');
onmessage = function(e){
    //myport:the messagechannel port sent from the window: we will use this to communicate with the main thread
    var myport = e.ports[0];
    //make sure it's the right message...
    e.data == 'startup' && !!myport && (function(){
        //set up the listener for this Worker: 
        myport.addEventListener('message', function(d){
            //when you get a message, open the cache...        
            fontcache.then(function(c){
                var reqs = this.data;
                //for each request in the group...
                reqs.reduce(function(c,v,i){
                   //Make a new Request object, keyed by the Font Name
                   var fontreq = new Request('__FONTCACHE__' + encodeURIComponent(v[0]));
                   //See if it's already in the cache...
                   c.match(fontreq)
                    .then(function(matched){ 
                            (new Promise(function(res, rej){
                                //If it is, just resolve with the corresponding Response
                                if(!!matched){
                                    res(matched);
                                }
                                //If it is not: go fetch it at the indicated URL
                                else {
                                    fetch(v[1]).then(function(f){
                                        //Put the Response into the Cache
                                        c.put(fontreq, f).then(function(){ res(f); });
                                    })
                                }
                            })).then(function(resolvedwith){
                               //indicate to the caller that the cache is loaded with their asset.
                               myport.postMessage(v[0]); 
                            });
                    });
                   return c;
                },c);
            }.bind({data: JSON.parse(d.data)}))
        });

        //remember to .start when using addEventListener::
        myport.start();
        //handshake to the main thread:
        myport.postMessage('ready');
    })();
};






function ThreadFonts(fontarray){
    var mc = new MessageChannel();

    function encodeArrayAsBuffer(a){
        //MessagePorts still do not allow ArrayBuffers to transfer :( 
        return Array.prototype.isPrototypeOf(a) && new TextEncoder('utf-8').encode(JSON.stringify(a));
    }
    function encodeArrayAsString(a){
        return Array.prototype.isPrototypeOf(a) && JSON.stringify(a);
    }

    //everything above minified:
    var minified = '"use strict";var fontcache=caches.open("fontstore");onmessage=function(t){var n=t.ports[0];"startup"==t.data&&!!n&&function(){n.addEventListener("message",function(t){fontcache.then(function(t){var e=this.data;e.reduce(function(t,e,a){var o=new Request(location.origin + "/__FONTCACHE__"+encodeURIComponent(e[0]));return t.match(o).then(function(a){new Promise(function(n,s){a?n(a):fetch(e[1]).then(function(e){t.put(o,e).then(function(){n(e)})})}).then(function(t){n.postMessage(e[0])})}),t},t)}.bind({data:JSON.parse(t.data)}))}),n.start(),n.postMessage("ready")}()};';
    var fontWorkerBlob = new Blob([minified]);
    var fontWorkerURL = URL.createObjectURL(fontWorkerBlob);
    var fontWorker = new Worker(fontWorkerURL);

    setTimeout(function(){
        //TODO: Use Promise race to terminate when the worker is done or time elapses?
        fontWorker.terminate();
    }, 10000)

    //window.postMessage('startup','*', [mc.port2]);
    //Pass the MessageChannel to the FontWorker
    fontWorker.postMessage('startup', [mc.port2]);
    //load desired fonts when Worker is ready:
    mc.port1.addEventListener('message', function workerReady(d){
        if(d.data == 'ready'){
            mc.port1.removeEventListener('message', workerReady);
            mc.port1.addEventListener('message', function fontReady(d){
                //debugger;
                var fontname = d.data;
                fontcache.then(function(c){ 
                    c.match(new Request('__FONTCACHE__' + encodeURIComponent(fontname)))
                        .then(function(m){
                            //m is the matching response
                            m.blob().then(function(b){
                                //b is the blob from the request
                                var ou = URL.createObjectURL(b);
                                //now ou is the ObjectURL
                                var fontstyle = '@font-face{ font-family:"' + fontname + '"; src: url('+ ou.toString() + '); }';
                                var s = document.createElement('style');
                                s.setAttribute('class','font_' + fontname);
                                s.innerHTML = fontstyle;
                                document.querySelector('head').appendChild(s);
                            })
                        })
                })
            })
            var bufferToSend = encodeArrayAsString(fontarray);
            //debugger;
            mc.port1.postMessage(bufferToSend);
        }
    });
    mc.port1.start();
}

ThreadFonts([['Montserrat','https://fonts.gstatic.com/s/montserrat/v7/zhcz-_WihjSQC0oHJ9TCYPk_vArhqVIZ0nv9q090hN8.woff2'],['WorkSans','https://fonts.gstatic.com/s/worksans/v2/ElUAY9q6T0Ayx4zWzW63VLO3LdcAZYWl9Si6vvxL-qU.woff']]);
