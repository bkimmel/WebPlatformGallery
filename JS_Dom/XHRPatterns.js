//CORS w/ credentials:
var cors_xhr = new XMLHttpRequest();
cors_xhr.withCredentials = 1;
cors_xhr.open('GET', 'http://thirdparty.com/resource.js');
cors_xhr.onload = function() { ... };
cors_xhr.send();
/*
SERVER:
=> Request
GET /resource.js HTTP/1.1
Host: thirdparty.com
Origin: http://example.com
...

<= Response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://example.com
Access-Control-Allow-Credentials: http://example.com
...
*/

//DOWNLOADING:
var xhr = new XMLHttpRequest();
xhr.open('GET', '/images/photo.webp');
xhr.responseType = 'blob';
//responseType can be one of: ArrayBuffer, Blob, Document, JSON, Text
xhr.onload = function() {
  if (this.status == 200) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(this.response);
    img.onload = function() {
        window.URL.revokeObjectURL(this.src);
    }
    document.body.appendChild(img);
  }
};

xhr.send();


//UPLOAD FORM DATA:
var formData = new FormData();
formData.append('id', 123456);
formData.append('topic', 'performance');

var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
xhr.send(formData);

//UPLOAD BLOB:
var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
var blob = new Blob(aFileParts, {type : 'text/html'}); // the blob

const BYTES_PER_CHUNK = 1024 * 1024;
const SIZE = blob.size;

var start = 0;
var end = BYTES_PER_CHUNK;

while(start < SIZE) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload');
  xhr.onload = function() { ... };

  xhr.setRequestHeader('Content-Range', start+'-'+end+'/'+SIZE);
  xhr.send(blob.slice(start, end));

  start = end;
  end = start + BYTES_PER_CHUNK;
}


//LONG-POLLING:
function checkUpdates(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    checkUpdates('/updates');
  };
  xhr.send();
}

checkUpdates('/updates');