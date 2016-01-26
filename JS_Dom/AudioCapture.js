navigator.webkitGetUserMedia({audio: true}, function(stream){
    var audioCtx = new AudioContext();
    var source = audioCtx.createMediaStreamSource(stream);
    //first arg of createScriptProcessor indicates how many *frames* get stuffed into each "buffer", or i.e. "how often onaudioprocess gets called"
    //So for every 4,096 frames, with two input and two output channels, the scriptNode gets its audioprocess event fired.
    var scriptNode = audioCtx.createScriptProcessor(4096, 2, 2);
    var samples = [];
    scriptNode.onaudioprocess = function(audioevt) {
        var inputBuffer = audioevt.inputBuffer;
        var outputBuffer = audioevt.outputBuffer;
        var inputData = inputBuffer.getChannelData(1);
        var outputData = outputBuffer.getChannelData(1);
        //Copy the input buffer to the output buffer
        inputData.forEach(function(v,i){ outputData[i] = v; });
        //Also take the captured frames and put them in samples
        samples.push(inputData.slice());
    }

    //Connect the microphone to the scriptNode
    source.connect(scriptNode);
    //Connect the scriptNode to the Speaker (audioContext's default "destination" is a speaker)
    scriptNode.connect(audioCtx.destination);

    //*Play back what was recorded for three seconds.*
    setTimeout(function(){
        
        //Painful Finding: AudioBuffers are not (easily) "transferable" - I tried to make an AudioBuffer from the samples to no avail (see multiple failed attempts below)
        //Solution: Use an "Output only" ScriptProcessor Node with the same frame chunk-size as the one it was captured with
        var floatarray = samples.reduce(function(agg,v){ var ret = new Float32Array(agg.length + v.length); ret.set(agg,0); ret.set(v, agg.length); return ret; }, new Float32Array(0));
        
        //floatarray...
        //Can post this off via an XHR like so:
        //var myxhr = new XMLHttpRequest();
        //myxhr.addEventListener('load', function(e){ console.log(this.responseText); });
        //myxhr.open("GET", "http://www.someendpointwhereyousendtheaudio/audioapi");
        //myxhr.send(floatarray);

        var sourceNode = audioCtx.createScriptProcessor(4096, 0, 1);
        var currentframe = 0;
        sourceNode.onaudioprocess = function(audioevt) {
            var outputBuffer = audioevt.outputBuffer;
            var outputData = outputBuffer.getChannelData(0);
            //debugger;
            var takeframe = samples[currentframe++];
            currentframe = (currentframe >= samples.length) ? 0 : currentframe;
            !currentframe && console.log('framereset'); 
            //Pull the frame from the recorded one and put it in the output channel
            outputData.forEach(function(v,i){ outputData[i] = takeframe[i]; });
        }
        
        source.disconnect();
        // start the _source playing
        sourceNode.connect(audioCtx.destination);
        console.log('Playing...');
    }, 4000);

}, function(err){ 
    debugger; 
});

/*
//COMMENTS ON FAILED EXPERIMENTS:
//1. MediaRecorder: This is actually the most elegant solution, but only supported by Firefox.
//2. As mentioned above, AudioBuffer objects are not as "transferable" as you might think.
//3. To solve for 2, tried "custom sampling" over Herz range, whoch did not work well.
//4. Ran into some funny-ish issues with Nodes "disappearing" in debug in places where they were closed over...not sure if platform bug or what.
//audioCtx.close();
        //debugger;
        //source.disconnect();
//         scriptNode.disconnect();
        //console.log('First context closed');
        //var _audioCtx = new AudioContext();
        //scriptNode.disconnect();
        //samples.length will make a buffer of the correct size
        
        // This gives us the actual ArrayBuffer that contains the data
        
        var floatarray = samples.reduce(function(agg,v){ var ret = new Float32Array(agg.length + v.length); ret.set(agg,0); ret.set(v, agg.length); return ret; }, new Float32Array(0));
        //debugger;
        //myArrayBuffer.copyToChannel(floatarray, 0, 0);
        //myArrayBuffer.copyToChannel(floatarray, 1, 0);

        var myArrayBuffer = audioCtx.createBuffer(2, samples.length * 4096, audioCtx.sampleRate);
        
        var nowBuffering = myArrayBuffer.getChannelData(0);
        var nowBuffering_b = myArrayBuffer.getChannelData(1);
        var samplelength = floatarray.length;
        var buffLength = nowBuffering.length;

        for (var i = 0; i < nowBuffering.length; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]
//             nowBuffering[i] = Math.random() * 2 - 1;
//             nowBuffering_b[i] = Math.random() * 2 - 1;
               i % 500 == 0 && console.log(~~((i/buffLength) * samplelength), '#', floatarray[~~((i/buffLength) * samplelength)]);
               nowBuffering[i] = floatarray[~~((i/buffLength) * samplelength)] + (Math.random() * .1);
               nowBuffering_b[i] = floatarray[~~((i/buffLength) * samplelength)] + (Math.random() * .1);
        }
        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        var _source = audioCtx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        _source.buffer = myArrayBuffer;
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        var gainNode = audioCtx.createGain();

        _source.connect(gainNode);
        gainNode.gain.value = 1;
        gainNode.connect(audioCtx.destination);
        // start the _source playing
        console.log('Playing...');
        _source.start(0);


//     var mediaRecorder = new MediaRecorder(stream);
//     var chunks = [];


//     mediaRecorder.start();

//     mediaRecorder.ondataavailable = function(e) {
//       chunks.push(e.data);
//     };

//     mediaRecorder.onstop = function(){
//         var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
//         var tgtURL = window.URL.createObjectURL(blob);
//         window.location = tgtURL;
//     };

//     setTimeout(function(){ mediaRecorder.stop(); }, 4000);
    //debugger; 

*/