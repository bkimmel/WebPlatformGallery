/*
ECMAScript 6 introduces a new primitive type: symbols.
They are tokens that serve as unique IDs.
You create symbols via the factory function Symbol() (which is loosely similar to String returning strings if called as a function):
--http://www.2ality.com/2014/12/es6-symbols.html
*/

//Symbols are unique - no matter how they are instantiated.
var sym = Symbol('abc');
var symb = Symbol('abc');

console.log('sym === symb: %b', sym === symb); //=> sym === symb: %b false
//symbol is its own primitive type:
console.log('typeof sym: %s', typeof sym); //=> typeof sym: symbol

//symbols can be used as object keys
const MY_KEY = Symbol();
var obj = {};

obj[MY_KEY] = 123;
console.log(obj[MY_KEY]); // 123
