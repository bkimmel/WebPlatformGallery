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

//Then feed the receiver to the promise
p2.then(genericreceiver);

var p3 = new Promise(function(res,rej){
    setTimeout(res, 3000, '1st one');
});
var p4 = new Promise(function(res,rej){
    setTimeout(res, 5000, '2nd one');
});

var p5 = Promise.all([p3, p4]);

p5.then(genericreceiver); // receiver gets ['1st one','2nd one'] @ 5000ms



