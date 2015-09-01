var stream = require('stream');
var readable = stream.Readable;
var fs = require('fs');

function Objectifier(source) {
	//Call stream.Readable to construct this inherited object
	readable.call(this, {objectMode: true});
	this._source = source;
	this._buffer = '';
	
	//when the source stream emits 'readable' (indicating it is ready to be read), call this stream's .read method
	this._source.on('readable', function(){
		console.log('source readable');
		this.read();
	}.bind(this));
}

Objectifier.prototype = Object.create(readable.prototype, {
	constructor: {
		value: Objectifier
	}
});

//All Readable interfaces must implement ._read
Objectifier.prototype._read = function(size) {
	//internally, size will == the highWaterMark the stream is initialized with
	console.log('executing _read, size=', size);
	var chunk = '';
	var recordindex = 0;
	var record = '';
	
	//In practice, there is no need for this unless the consumer can only process size bytes
	// if(size && this._buffer.length < size) {
		// var readsize = size - this._buffer.length;
		// console.log('readsize: ', readsize);
		// chunk = this._source.read(readsize);
		// this._buffer += chunk;
		// console.log('size chunk: ', chunk);
	// }
	// else {
		//If you read n bytes and they are not available, it will return null
		chunk = this._source.read();
		if(!!chunk) {
			this._buffer += chunk;
		}
		console.log('no-size chunk: ', chunk);
	// }
	
	console.log('buffer after read: ', this._buffer);
	recordindex = this._buffer.indexOf('#');
	if(recordindex >= 1) {
		record = this._buffer.slice(0, recordindex);
		console.log('record: ', record);
		//emit is just a convenience, not required
		this.emit('record', {value: record});
		//the readbale stream must call .push to output the data
		this.push({value: record});
	}
	this._buffer = this._buffer.slice(recordindex + 1);
}

var input = fs.createReadStream(__dirname + '/testdata.txt', 'utf-8');

var myValues = new Objectifier(input);
myValues.on('record', function(v){
	console.log('streamed record: ', v);
})