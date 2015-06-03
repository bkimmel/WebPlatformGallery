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



