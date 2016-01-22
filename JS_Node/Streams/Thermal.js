var stream = require('stream');
var fs = require('fs');

function ThermalStream() {
	stream.Transform.call(this, {objectMode: true});
}

ThermalStream.prototype = Object.create(stream.Transform.prototype, {constructor: {value: ThermalStream}});

//abstract method to implement: #_transform
console.log('ThermalStream prototype _transform...');
ThermalStream.prototype._transform = function(chunk, encoding, done) {
	console.log('Transform Called');
	this.push(JSON.stringify(chunk));
	done();
}

module.exports = ThermalStream;