//This creates a point from which performance can be measured.
window.performance.mark('mark1');
//This creates another one
setTimeout(function(){
	window.performance.mark('mark2');
	//This creates a 'measure' entry with a duration from mark1 to mark2, with a name of test
	window.performance.measure('test','mark1','mark2');
	
	//This gets the time from mark1 to mark2 (should be roughly 3 seconds)
	console.log('mark1 -> mark2: %f', performance.getEntriesByName('test')[0].duration );
}, 3000);

//You can also use named events from the Performance model, like 'domInteractive':
window.performance.measure('test2','domInteractive','mark1');
console.log('domInteractive -> mark1: %f', performance.getEntriesByName('test2')[0].duration );


//Get individual resource times...e.g. here we look for a big image named hero_k12home_load, and we
//fetch a bigger image only if it's load time was fast enough.
var perf = window.performance.getEntries();
var imgentry = perf.filter(function(v){ return v.name.match(/hero_k12home_load/) })[0];
if(!imgentry || !imgentry.duration || imgentry.duration > 1200) {
  //too slow, don't load the big one
  console.log('cancelled image load');
  return false;
}

//You can also use named events from the Performance model, like 'domInteractive':
window.performance.measure('received','requestStart','responseEnd');
window.performance.measure('interactive','requestStart','domInteractive');
window.performance.measure('complete','requestStart','domComplete');

function setPerf(nm) {
	var meas = performance.getEntriesByName(nm)[0].duration;
	console.log(nm + ': %d', meas );
	var _str = localStorage.getItem(nm);
	localStorage.setItem(nm, ( _str ? _str + ',' : '' ) + meas);
}

['interactive','complete','received'].forEach(setPerf);

//to tally:
localStorage.getItem('complete').split(',').map(function(v){ return parseInt(v, 10); }).reduce(function(a, v, i, l){ return a + ( v / l.length) }, 0);


