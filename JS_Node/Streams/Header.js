var stream = require('stream');
var fs = require('fs');

function Header() {
	stream.Readable.call(this, {objectMode: true});
	this.objectbuffer = [];
	this.bufferlength = 1;
	this.readable = false;
}

Header.prototype = Object.create(stream.Readable.prototype, {constructor: {value: Header}});

//abstract method to implement: #_transform
console.log('Readable prototype _read...');
Header.prototype._read = function(size) {
	console.log('_read Called');
	!!this.readable && this.push(this.objectbuffer.pop());
	this.readable = false;
}

Header.prototype.proc = function(objtoprocess){
	this.objectbuffer.push(objtoprocess);
	this.readable = true;
	this.emit('readable');
}

module.exports = Header;