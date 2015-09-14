var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result contains the results of the read operation
   console.log('read: ', reader.result);
});
reader.readAsText(oMyBlob);
