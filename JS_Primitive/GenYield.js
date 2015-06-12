var a = 1;
//The * marks this as a special generator function, which does not behave as normal ES5 functions do...
function* foo(){
  console.log('foo called');
  var index = 0;
  while (index <= 2) // when index reaches 3,
                     // yield's done will be true
                     // and its value will be undefined;
    console.log('foo to yield'), yield index++ + '#' + a;
	//The 'yield' keyword is like 'return' for generators
	//It's like 'yield the callstack back to the caller and wait for them to "next" me again'
  console.log('foo finished');
  //implicit yield undefined, done: true here
}
//..e.g. when you "call" it it doesn't do anything
var iterator = foo(); //Nothing is logged: The function doesn't actually run until next is called.
a = 2; //behaves with scoping like normal JS functions do...
console.log(iterator.next()); //logs: foo called, logs: foo to yield, logs {value: '0#2', done: false}
console.log(iterator.next()); //logs: foo to yield, logs {value: '1#2', done: false}
console.log(iterator.next()); //logs: foo to yield, logs {value: '2#2', done: false}
console.log(iterator.next()); //logs: foo to finished, logs {value: undefined, done: false}
//notice on the last one, it does not log 'foo to yield'

function* g1() {
  yield 2;
  yield 3;
  yield 4;
}

function* g2() {
  yield 1;
  //yield* is like "yield to" or "yield forward"
  //when this generator is 'nexted', it will yield the stack to g1
  //...until g1 itself yields 'done', at which case it will continue down its own stack
  yield* g1();
  yield 5;
  //You can also 'yield to' arrays and other objects
  yield* [6,'7'];
}

var iterator = g2();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: 6, done: false }
console.log(iterator.next()); // { value: '7', done: false }
console.log(iterator.next()); // { value: undefined, done: true }


//yielding promises:
function* g3() {
	var p = new Promise(function(res, rej){
		setTimeout(function(){ res(1); }, 4000);
	});
	yield p;
}

function* g4() {
	yield* g3();
}

var iterator = g4();
iterator.next().value.then(function(a){ console.log(a); });

//parallel operations with generators:
function *foo() {
	while(true) {
		yield Promise.all([new Promise(function(res, rej){
			setTimeout(function(){ res('3 second Promise Resolved'); }, Math.random() * 3000);
		}), new Promise(function(res, rej){
			setTimeout(function(){ res('10 second Promise Resolved'); }, Math.random() * 10000);
		})]);
	}
}

var it = foo();
it.next().value.then(function(v){ console.log('%O',v) });