var request = new XMLHttpRequest();
request.responseType = 'blob';
request.open('GET', 'http://m.rosettastone.com/demo/audio/voiceovers/VO_ZMiller_RosettaStoneMobile_R_1_Graph_9_German.mp3', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var b = new Blob([request.response], {type: 'audio/mpeg'});
    var a = document.createElement('audio');
    var src = URL.createObjectURL(b);
    a.setAttribute('src', src);
    document.body.appendChild(a);
    a.play();
    //debugger;
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();