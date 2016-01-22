var ThermalStream = require('./Thermal.js');
var Header = require('./Header.js');
var fs = require('fs');

console.log('required ThermalStream.');
var TS = new ThermalStream();
var Go = new Header();

Go
 .pipe(TS)
 .pipe(process.stdout);

var reactormodel = {
	entropy: .5,
	layers: [
		
	],
	strata: [
	
	]
};

Go.proc(reactormodel);

// TS.pipe(process.stdout);

// fs.createReadStream('./sample.txt').pipe(TS);

//To call directly, would require direct call to _transform
//console.log(typeof TS._transform('data','utf-8',function(){ console.log('done'); }));
//TS._transform();