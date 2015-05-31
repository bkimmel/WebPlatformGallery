//in ES5: We had to use IIFEs to artificially create contained scopes:
var a = 2;

(function IIFE(){
    var a = 3;
    console.log( a );   // 3
})();

console.log( a );       // 2

//in ES6: We can use let with any block
'use strict'
var a = 2;

{
    let a = 3;
    console.log( a );   // 3
}

console.log( a );       // 2

//let is not hoisted like var:
{
    console.log( a );   // undefined
    console.log( b );   // ReferenceError!

    var a;
    let b;
}
