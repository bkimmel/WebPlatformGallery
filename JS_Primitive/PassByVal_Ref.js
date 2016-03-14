//http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language
//In practical terms, this means that if you change the parameter itself (as with num and obj2), that won't affect the item that was fed into the parameter. But if you change the INTERNALS of the parameter, that will propagate back up (as with obj1).
var a = function a() {
    console.log("i am a");
}
a();
function b(c) {
    return function() { c.call(this) };
}
var outer = b(a);
outer();
a = function d() {
    console.log("i am d");
};

a(); //Logs "I am d." (see above).
outer(); //Logs "I am a." (see above).

//So JS is "pass by value", but the "value" can be a reference to an object.
//.: When you change a above, it changes the top-level value,  but the function b keeps its reference to the original "i am a" function.