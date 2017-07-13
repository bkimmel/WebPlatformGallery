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

//It consumes scope of where it is declared:
var myname = 'Kimmel';

//Template strings use these backticks: ` and ${expression} to evaluate
var greet = `Hello ${myname}`
console.log(greet); //=> Hi Kimmel
myname = 'Brent';
console.log(greet); //=> Hi Kimmel, because that's how it was bound before...
console.log(`Hello ${myname}`); //=> Hi Brent

//String.raw called with template literals are the closest thing to "literal" strings, where even backslashes are evaluated 'as is'
String.raw`I can print \` `;
//But this will error: the ending literal tag can't be escaped:
String.raw`I can print \`
