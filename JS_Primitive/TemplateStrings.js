var myname = 'Kimmel';

//Template strings use these backticks: ` and ${expression} to evaluate
var greet = `Hello ${myname}`
console.log(greet); //=> Hi Kimmel

//Tenplate literals can be complicated and span multiple lines (like C# string literals)
function message_a() {
	return Math.random();
}

function message_b(v) {
	return Math.random() + '#' + v;
}

var mymessage = `Line One
Line two ${message_a()}
Line 3 ${message_b(`${message_a()}`)}`;

console.log(mymessage);