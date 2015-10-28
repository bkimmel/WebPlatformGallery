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

//if you don't retrieve the iterator right away, you have to .call it with the object, otherwise it will yield an error:
var a = [1,2,3,4];
var b = a[Symbol.iterator];
//b() --> ERROR
var c = b.call(a); //OK

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


//A somewhat simple semaphore implemented with iterators 
function sem() {
	if(this.arr.length) {
		//i.e. "If we're ready, return and lock the steps"
		var _arr = this.arr.slice();
		this.arr = [];
		var that = this;
		var getiter = function getiter(){return {
				'next': function() {
					console.log('called next');
					return _arr.length ? {value: _arr.pop(), done: false} : (this.next = function(){ return {value: undefined, done: true} }, this.return(), {value: undefined, done: true});
				},
				'return': (function() {
					console.log('called return');
					_arr = [1,2,3,4,5];
					if(that.q && that.q.length) {
						//i.e. "If there is someone waiting in line, call them"
						that.q.shift()((function(){ var _ret = {}; _ret[Symbol.iterator] = function(){ return getiter();}; return _ret; })());
					}
					else {
						//i.e. reset the public state
						console.log('reset public arr state');
						that.arr = [1,2,3,4,5];
					}
					return {value: undefined, done: true};
				}).bind(this)
			}
		}.bind(this);
		return getiter();
	}
	else {
		//i.e. "Something else is using this - get in line"
		this.q = this.q || [];
		var ret = new Promise(function(res, rej){
			console.log('Pushing to queue');
			//omitting error handling for brevity
			this.q.push(res);
		}.bind(this));
		var _done = false;
		return {
			'next': function(){ return !_done ? ( _done = true, {value: ret, done: false} ) : {value: ret, done: true} }
		};
	}
}
var thing = {
	'arr': [1,2,3,4,5]
};
thing[Symbol.iterator] = sem;

var it1 = thing[Symbol.iterator]();
var it2 = thing[Symbol.iterator]();
it1.next(); //=> 1
it2.next().value.then(function(_it){ console.log('my turn!!'); for(var i of _it){ console.log('iterator 2: %i', i); } });
while(!it1.next().done){}

console.log('calling slowpoke');
var slowpoke = thing[Symbol.iterator]();

function lineup(t, f) {
    if(t instanceof Promise) {
        return t.then(function(_it){ lineup(_it, f) })
    }
	for (var i of t) {
		console.log('lining up: %O', i);
		i instanceof Promise ? i.then(function(_it){ lineup(_it, f) }) : f(i);
	}
}
lineup(thing, function(v){ console.log('%i', this.num, ' received:%i', v); }.bind({num: 4}));
lineup(thing, function(v){ console.log('%i', this.num, ' received:%i', v); }.bind({num: 5}));
lineup(slowpoke.next().value, function(v){ console.log('Slowpoke received:%i', v); })












