//Buffers exist to give us access to binary data in Node.  You can think of them as Node's "binary API"

console.log('Messing With Buffers');

//This creates a new "uninitialized" buffer that is 8 bytes in size:
var buffer = new Buffer(8);

console.log('buffer length: ', buffer.length); //=> 8

//This initializes the buffer to the contents of this array. Keep in mind that the contents of the array are integers representing bytes. 
var buffer = new Buffer([81,81,255]);
console.log('buffer length: ', buffer.length); //=> 3
console.log('buffer: ', buffer); //=> 51, 51, ff
console.log('buffer utf-8: ', buffer.toString('utf-8')); //=> QQ?
console.log('\n');


var buffer = new Buffer([81,81,256]);
console.log('buffer length: ', buffer.length); //=> 3
console.log('buffer: ', buffer); //=> 51, 51, 00 **Since it is in bytes, it "mods" by 255 if over
console.log('buffer utf-8: ', buffer.toString('utf-8')); //=> QQ 
console.log('\n');

//encodes to utf-8 by default
var buffer = new Buffer("I'm a string!");
console.log('buffer length: ', buffer.length); //=> 13
console.log('buffer: ', buffer); //=> 49,27,6D ...
console.log('buffer utf-8: ', buffer.toString('utf-8')); //=> I'm a string 
console.log('\n');

var buffer = new Buffer("I'm a string!", 'utf-8');
console.log('buffer length: ', buffer.length); //=> 13
console.log('buffer: ', buffer); //=> 49,27,6D ...
console.log('buffer utf-8: ', buffer.toString('utf-8')); //=> I'm a string 
console.log('\n');

var buffer = new Buffer("I'm a string!", 'ascii');
console.log('buffer length: ', buffer.length); //=> 13
console.log('buffer: ', buffer); //=> 49,27,6D ...
console.log('buffer utf-8: ', buffer.toString('utf-8')); //=> I'm a string 
console.log('\n');

var buffer = new Buffer("I'm a stri\u00f1g!", 'utf-8');
console.log('buffer length: ', buffer.length); //=> 14
console.log('buffer: ', buffer); //=> 49,27,6D ...
console.log('buffer utf-8: ', buffer.toString('utf-8')); //=> I'm a striñg 
console.log('\n');

var buffer = new Buffer("I'm a string!", 'utf-8');
console.log('New buffer: "I\'m a string"');
console.log('slice with .toString:', buffer.toString('utf-8', 6, 12));
buffer[0] = buffer[12];
console.log(buffer.toString('utf-8'));



