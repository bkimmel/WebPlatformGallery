//The point at which you would do something asynchronous...
var p = new Promise(function(res, rej){
    //So up to 20 seconds...
    var t = Math.random() * 20 * 1000;
    console.log('Resolving in ' + t + ' millisecs.');
    var otherclosedvalue = Math.random();
    setTimeout(function(){
        res(otherclosedvalue);
    }, t);
});

function genericreceiver(receive_value){
    console.log('Received: ' + receive_value);
}

p.then(genericreceiver);

//Where you have some kind of complicated thing that is asynchronous which expects a callback:
function complicatedthing(cb) {
    var t = Math.random() * 20 * 1000;
    console.log('Finishing complicated thing in ' + t + ' millisecs.');
    setTimeout(function(){
        cb('complex return value');
    }, t);
}

//Again, just do this at the point where you 'go async'
var p2 = new Promise(function(res, rej){
    complicatedthing(res);
});

p2.then(genericreceiver);


