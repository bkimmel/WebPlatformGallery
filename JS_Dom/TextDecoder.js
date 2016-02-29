//Declare a textDecoder for the utf8 code space
var td = new TextDecoder('utf8');

//With 'false' as 2nd parameter: immediately decode
var u8 = Uint8Array.from([65,66,67]);
console.info(td.decode(u8));

//With {stream: true} as 2nd parameter: decode will span buffers if the buffer ends midway through a 3-byte codepoint like [0xE2, 0x99, 0xA5]
var tmp = '';
tmp = td.decode(Uint8Array.from([0xE2, 0x99]), {stream: true});
console.info(tmp); //''
tmp = td.decode(Uint8Array.from([0xA5]));
console.info(tmp); //'♥' (a heart)