var bleno = require('bleno');
var Characteristic = bleno.Characteristic;

function run_characteristic(){
	var test_characteristic = new Characteristic({
		uuid: 'fff1', // or 'fff1' for 16-bit
		properties: [ 'read' ], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
		secure: [ ], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
		value: null, // optional static value, must be of type Buffer - for read only characteristics
		descriptors: [
			// see Descriptor for data type
		],
		onReadRequest: function(offset, callback) {
			var result = Characteristic.RESULT_SUCCESS;
			var data = new Buffer( 'I Love You Michelle', 'utf-8' );
			callback(result, data);
		}, // optional read request handler, function(offset, callback) { ... }
		onWriteRequest: null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
		onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
		onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
		onNotify: null, // optional notify sent handler, function() { ...}
		onIndicate: null // optional indicate confirmation received handler, function() { ...}
	});

	var PrimaryService = bleno.PrimaryService;

	var primaryService = new PrimaryService({
		uuid: 'ffd0', // or 'fff0' for 16-bit
		characteristics: [
			test_characteristic
		]
	});

	var name = 'test_ble2';
	
	var serviceUuids = ['ffd0'];
	
	bleno.setServices([primaryService], function(err){ console.log(err); });
	bleno.startAdvertising(name, serviceUuids, function(err){ console.log(err); });
}

bleno.on('stateChange', function(state){
	console.log(state);
	run_characteristic();
	//debugger;
});