//Use the Symbol.iterator key to get the iterator for an 'iterable' thing.
var j = [1,2,3,4,5];
var iter = j[Symbol.iterator]();
//Use .next to iterate over it:
iter.next() //=> {value: 1, done: false}
//Use 'of' operator to iterate:
for (t of iter) { console.log(t); }
//=> 2
//=> 3
//=> 4
//=> 5
//=> undefined

var customiter = {
};
//At the meta-key for Symbol.iterator, you add the 'iterator function' which returns a module
//with the 'next' property that consumers will use.
customiter[Symbol.iterator] = function() {
	var count = 10;
	return {
		'next': function() {
			return count > 0 ? {value: count--, done: false} : {value: undefined, done: true}
		}
	}
}
//the for/of construct automatically unpacks the value from each iteration for you
for (x of customiter) {console.log(x)}
//=> 10
//=> 9
//=> ...
//=> 1

//A more involved example
var asynciter = {
};
asynciter[Symbol.iterator] = function() {
	var count = 10;
	return {
		'next': function() {
			return count > 0 ? {value: new Promise(function(res,rej){
				setTimeout(function(){
					res(count--);
				},Math.random() * 1000);
			}), done: false} : {value: undefined, done: true}
		}
	}
}
function drain(iter) {
	var v = iter.next();
	if (!!v.done) {
		console.log('%cDrain Finished', 'color:red;');
		console.groupEnd();
		return true;
	}
	v.value.then(function(v){ console.log(v); drain(iter); });
}
console.group('Drain Started...');
drain( asynciter[Symbol.iterator]() );
//=> 10









