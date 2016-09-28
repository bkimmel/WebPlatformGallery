var bleno = require('bleno');
var Characteristic = bleno.Characteristic;
var markup = require('./getdiv.js');

function run_characteristic(){
	var tx = new Characteristic({
		uuid: 'fff1', // or 'fff1' for 16-bit
		properties: [ 'read','write','writeWithoutResponse' ], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
		secure: [ ], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
		value: null, // optional static value, must be of type Buffer - for read only characteristics
		descriptors: [
			// see Descriptor for data type
		],
		onReadRequest: function(offset, callback) {
			var result = Characteristic.RESULT_SUCCESS;
			var data = markup;
			callback(result, data);
		}, // optional read request handler, function(offset, callback) { ... }
		onWriteRequest: function(data, offset, withoutResponse, callback) {
			console.log('write request');
			console.log(data);
		}, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
		onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
		onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
		onNotify: null, // optional notify sent handler, function() { ...}
		onIndicate: null // optional indicate confirmation received handler, function() { ...}
	});
	
	var rx = new Characteristic({
		uuid: 'fff2', // or 'fff1' for 16-bit
		properties: ['write'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
		secure: [ ], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
		value: null, // optional static value, must be of type Buffer - for read only characteristics
		descriptors: [
			// see Descriptor for data type
		],
		onReadRequest: null, // optional read request handler, function(offset, callback) { ... }
		onWriteRequest: function(data, offset, withoutResponse, callback) {
			console.log('write request');
			console.log(data);
		}, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
		onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
		onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
		onNotify: null, // optional notify sent handler, function() { ...}
		onIndicate: null // optional indicate confirmation received handler, function() { ...}
	});

	var PrimaryService = bleno.PrimaryService;

	var primaryService = new PrimaryService({
		uuid: 'ffd0', // or 'fff0' for 16-bit
		characteristics: [
			rx,
			tx
		]
	});

	var name = 'gatt_mark';
	
	var serviceUuids = ['ffd0'];
	
	bleno.setServices([primaryService], function(err){ console.log(err); });
	bleno.startAdvertising(name, serviceUuids, function(err){ console.log(err); });
}

bleno.on('stateChange', function(state){
	console.log(state);
	run_characteristic();
	//debugger;
});