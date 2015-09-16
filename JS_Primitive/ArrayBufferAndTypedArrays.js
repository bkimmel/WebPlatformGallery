//ArrayBuffer is the "Underlying Construct" that holds Binary Data.  You can not manipulate it directly.
//ArrayBuffers are instantiated with new ArrayBuffer(n), where n is the number of bytes.
var ab = new ArrayBuffer(12);
console.log('typeof ab = %s', typeof ab);
//get the length of the array buffer with .byteLength
console.log('ab.byteLength = %s', ab.byteLength);
//You can read data from parts of the ArrayBuffer by using .slice, which is analogous to normal Arrays
console.log('ab.slice(1).byteLength = %s', ab.slice(1).byteLength);
console.log('ab.slice(1,-1).byteLength = %s', ab.slice(1,-1).byteLength);

//**Typed Arrays
//Typed Arrays act as "views" to their underlying ArrayBuffer.
//You *can* manipulate TypedArrays and effect the underlying ArrayBuffer
//Uint8Array represents the data as unsigned 8-bit integers, so each 'byte' in the ArrayBuffer corresponds to an integer
console.log('%cvar u8 = new Uint8Array(ab);u8[0] = 255;u8[1] = 255;', 'color: rgb(0,200,0);');
var u8 = new Uint8Array(ab);
u8[0] = 255;
u8[1] = 255;
console.log('u8.toString = %s', u8.toString());
//To illustrate, here is a UInt16Array from the same buffer - see how instead of 2 numbers (255,255) the first two bytes are used for 1 16-bit number
//So the 16-bit int array uses *twice* as many bits per number it represents, therefore reps 1/2 the numbers of the 8-bit array
console.log('%cvar u16 = new Uint16Array(ab);', 'color: rgb(0,200,0);');
var u16 = new Uint16Array(ab);
console.log('u16.toString = %s', u16.toString());

console.log('%cvar u32 = new Uint32Array(ab);u8[11] = 255;u8[5] = 255', 'color: rgb(0,200,0);');
var u32 = new Uint32Array(ab);
u8[11] = 255;u8[5] = 255;
//'Endianness' comes into play. On chrome, the interpretation is "little endian" i.e. the most sig bits are at the end of the range'
console.log('u32.toString = %s', u32.toString());

//Overflow is handled via modulo arithmetic: i.e. 1+ the most cycles back to = 0
console.log('%cu8[11] = 256', 'color: rgb(0,200,0);');
u8[11] = 256;
console.log('u32.toString = %s', u32.toString());

//Likewise, underflow: the least - 1 == the most
console.log('%cu8[11] = -1', 'color: rgb(0,200,0);');
u8[11] = -1;
console.log('u32.toString = %s', u32.toString());

//Exception: "clamped" Arrays, where 1 + most == most && least -1 == least;
console.log('%cvar c8 = new Uint8ClampedArray(ab); c8[11]=256;', 'color: rgb(0,200,0);');
var c8 = new Uint8ClampedArray(ab); c8[11]=256;
console.log('u32.toString = %s', u32.toString());


//**DataViews
console.log('%cvar dv = new DataView(ab);', 'color: rgb(0,200,0);');
var dv = new DataView(ab);
//Dataviews allow ad-hoc reads & writes to data buffers via established view formats
console.log('dv.getUint32(0, true);//true=little endian = %s', dv.getUint32(0, true));
console.log('dv.getUint32(0, false);//false=big endian = %s', dv.getUint32(0, false));
'.:'