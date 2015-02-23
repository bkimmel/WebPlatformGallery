//Unicode is like a database that maps Code Points (U+0041), to Symbols (A), to Letter Names ('Latin Uppercase Letter A')
//Possible codepoints range from U+000000 -> U+10FFFF (= 1 million)
  //U+0000 -> U+FFFF is the Basic Multilingual Plane (Basic letters, etc.)
  //U+010000 -> U+10FFFF is the Supplementary Plane (Snowman, Pile of Poo, etc.)

console.log( '\x41' ); //=> 'A'.  \x escapes into unicode codepoint
  //Can only be used for codepoints up to +0000FF

console.log( '\u0041' ); //=> 'A' \u also escapes to Unicode, allowing up to 4 hex digits

console.log( '\u2661' ); //=> (Heart Symbol).

//ES6 Only:
//console.log( '\u{1F4A9}' );
  //Can be used to address supplementary symbols bigger than +00FFFF that plain \u allows.

//ES5 Supplementaries over FFFF: Surrogate Pairs:
var cow = '\uD83D\uDC04'; //=> 0x1F404: (Symbol for a cow)
console.log(cow); 
console.log(cow.length); //Even though it shows up as one character, it has a length of 2 because of the surrogate pair

console.log('\uD835\uD800'); //=> 1D400 => Math Bold A

//ES6 Only:
//Array.from('\uD83D\uDC04').length //Will count the symbol only once in the length.

console.log('man\u0303ana'); //=> Here +0303 is a "combining" symbol that creates a surrogate pair with n.
var str = 'man\u0303ana';
console.log(str.split('').reverse().join('')); //This will screw everything up.

//Workaround: Math things with this and 'flip' them before you reverse the string
var regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uDC00-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])([\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
console.log( 'man\u0303ana'.match(regexSymbolWithCombiningMarks) );
console.log( 'man\u0303ana'.replace(regexSymbolWithCombiningMarks, function(match, symbol, combiner){ return combiner + symbol }).split('').reverse().join('') );

console.log(String.fromCharCode(0xD835, 0xD800)); //=> Math Bold A (1D400)

//ES6 Only
// /First.Second/gu //=> 'u' flag makes the dot match unicode characters for RegEx

//General notes: in Node, especially for Request lengths, always use Buffer lengths and not string lengths.
  //Always account for Supplementary symbols whenever counting or slicing symbols from uncontrolled sources.

