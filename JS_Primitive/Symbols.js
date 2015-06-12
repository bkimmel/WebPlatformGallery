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

//There are two basic ways to declare symbols:
//The first is just like above and creates a unique object.
var sym = Symbol('abc');
//The second is to use Symbol.for(str), which adds it to the 'Global Symbol Registry' with the key of str.
//This key can translate across global execution objects.
var symabc = Symbol.for('abc');
console.log('symabc === Symbol.for(\'abc\'): %b', symabc === Symbol.for('abc')); //=> symabc === Symbol.for('abc'): %b true

//symbols can be used as object keys
const MY_KEY = Symbol();
var obj = {};

obj[MY_KEY] = 123;
console.log(obj[MY_KEY]); // 123

//Like other primitives, you cannot assign props/methods:
var a = Symbol('a');
a.foo = 3; //=> 3
a.foo; //=> undefined
