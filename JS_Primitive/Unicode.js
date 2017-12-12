//M Bynens article: https://mathiasbynens.be/notes/javascript-unicode

//method of encoding/decoding to base64 :: because btoa will throw an error if it is given a character outside of 0x00-0xFF.
// encodeURIComponent() splits characters outside of that range into sequences of %FF codes
// unescape converts() those "units" into corresponding individual characters.
// the calls outside of that "reverse" the process.
decodeURIComponent(escape(atob(btoa(unescape(encodeURIComponent('✓ à la mode'))))))

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

  
//[On UTF:] To enable this encoding scheme, the BMP has a hole with unused code points whose range is 0xD800–0xDFFF. Therefore, the ranges of leading surrogates, trailing surrogates, and BMP code points are disjoint -Rauschmeyer (speakingjs.com)
//ES5 Supplementaries over FFFF: Surrogate Pairs:
var cow = '\uD83D\uDC04'; //=> 0x1F404: (Symbol for a cow)
console.log(cow); 
console.log(cow.length); //Even though it shows up as one character, it has a length of 2 because of the surrogate pair

console.log('\uD835\uD800'); //=> 1D400 => Math Bold A

//Math of Surrogate Pair Creation:
 //So for 0x1D400.toString(2) == 11101010000000000
 //1.  Subtract 0x100000 from it (i.e. -1 at the 17th bit): ( 0x1D400 - 0x10000 ).toString(2) == 1101010000000000
 //2.  Take the *most significant* 10 bits from it and prefix those with 0xD800: var leadingSurrogate = 0xD800 | ( ( 0x1D400 - 0x10000 ) >> 10);
 //3.  Take the *least significant* 10 bits and prefix with 0xDC00: var trailingSurrogate = 0xDC00 | (( 0x1D400 - 0x10000 ) & parseInt('1111111111',2) );
 //4.  Surrogate Pair == '\\u' + leadingSurrogate.toString(16).toUpperCase() + '\\u' + trailingSurrogate.toString(16).toUpperCase() //=> \d835
 
//ES6 Only:
//Array.from('\uD83D\uDC04').length //Will count the symbol only once in the length.

console.log('man\u0303ana'); //=> Here +0303 is a "combining" symbol that creates a diacritical mark above n. +0303 and other diacriticals "stack" above the first non-diacritical character that appears before them in byte order.
var str = 'man\u0303ana';
console.log(str.split('').reverse().join('')); //This will screw everything up.

//Workaround: Match things with this and 'flip' them before you reverse the string
var regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uDC00-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])([\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
console.log( 'man\u0303ana'.match(regexSymbolWithCombiningMarks) );
console.log( 'man\u0303ana'.replace(regexSymbolWithCombiningMarks, function(match, symbol, combiner){ return combiner + symbol }).split('').reverse().join('') );

console.log(String.fromCharCode(0xD835, 0xD800)); //=> Math Bold A (1D400)

//ES6 Only
// /First.Second/gu //=> 'u' flag makes the dot match unicode characters for RegEx

//General notes: in Node, especially for Request lengths, always use Buffer lengths and not string lengths.
  //Always account for Supplementary symbols whenever counting or slicing symbols from uncontrolled sources.
  

//In Source: In identifiers, string literals, and regular expression literals, any code unit can also be expressed via a Unicode escape sequence \uHHHH, where HHHH are four hexadecimal digits. - Rausch.
  var f\u006F\u006F = 'abc';
  foo //=> 'abc'
  
//code golf
((String.fromCharCode(65,771,771,772)).match(/\u0303/)+'').charCodeAt(0)

