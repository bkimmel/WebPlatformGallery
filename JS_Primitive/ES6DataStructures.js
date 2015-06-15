var s = new Set();
var a = {some: 'property'}, b = {some: function(){}};
s.add(a).add(b).add(a);
//^The second add is ignored - sets keep a "unique set" of values
console.log(s.size); //=> 2
//^ Notice we use size and not length.
for(var i of s.values()){ console.log(i.some) }
//=> 'property'
//=> function(){}
console.log( s.has(a) ); //=> true
a.otherprop = 2;
//^ Mess with a, it doesn't matter
console.log( s.has(a) ); //=> true
s.clear();
console.log( s.has(a), s.size ); //=> false, 0

var s2 = new Set();
s2.add(1).add(3).add(3).add(2).add({valueOf: function(){ return 3; }});
//^Can add numbers, strings, whatev - they just keep the unique constraint... here 3 only gets added once.
//^ But the object with valueOf coerces to a number as usual.
var res = 0;
s2.forEach(function(v){ res += v * 2; }) //=> 18
console.log(res);

//Maps let you associate data
var m = new Map();
var a = {some: 'property'}, b = {some: function(){}};
m.set(a, 'other data');
console.log(m.get(a));

//WeakMaps are increidbly powerful - they do not allow enumeration or clearing of data, so you can only retrieve/change data if you have both the WeakMap and the 'key' object:
var priv = new WeakMap();
function assoc(k, v) {
	priv.set(k, v);
}
var obj = Object.create(null);
obj.oneproperty = 1;
assoc(obj, {bigheavy: 'data'});
//obj is still super lean...
for(var i in obj) {
	console.log(i, '#', obj[i]);
}
//But you can retrieve data associated with it from the "private store in public space"
console.log(priv.get(obj));





