var bleno = require('bleno');
var Characteristic = bleno.Characteristic;
var answerHolder = null;

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function(){
  var chunk = process.stdin.read();
  if (chunk !== null) {
    console.log('GATT answer is now ' + chunk);
	answerHolder = Promise.resolve(chunk);
  }
});

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
			if(!!answerHolder){
				answerHolder.then(function(v){
					console.log('Responding to GATT Request...');
					var data = new Buffer(v, 'utf-8' );
					return callback(result, data);
				});
			}
			else{
				var data = new Buffer('No Characteristic set', 'utf-8' );
				return callback(result, data);
			}
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
	
	bleno.setServices([primaryService], function(err){ console.log('Service: %s', err || 'OK'); });
	bleno.startAdvertising(name, serviceUuids, function(err){ console.log('Advertising: %s', err||'OK'); });
}

bleno.on('stateChange', function(state){
	console.log('State: %s',state);
	state == 'poweredOn' && run_characteristic() && console.log('GATT Characteristic set to advertise');
	//debugger;
});
