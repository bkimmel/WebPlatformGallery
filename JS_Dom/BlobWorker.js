var sblob = new Blob(['onmessage = function(e){ postMessage(e.data); }']);
var objurl = URL.createObjectURL(sblob);
var wk = new Worker(objurl);
//URL.revokeObjectURL(objurl);
wk.onmessage = function(e) {
    console.log('msg from worker:', e.data);
}
wk.postMessage(1);