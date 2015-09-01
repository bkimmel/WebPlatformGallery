var mc = new MessageChannel();
mc.port1.onmessage = function(e){ 
    console.log(e);
    mc.port2.postMessage('hi back');
};

//You would normally do this from a WebWorker or an iframe
window.addEventListener('message', function(e){
    console.log(e);
    e.ports[0].postMessage('hi');
    
});

window.postMessage('from window', '*', [mc.port2]);