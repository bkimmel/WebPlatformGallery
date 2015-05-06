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