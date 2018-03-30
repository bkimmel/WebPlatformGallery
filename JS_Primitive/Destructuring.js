let src = {named1: 1, named2: 2};

//In a destructured declaration, named1 transfers to namedtgt
let {named1:namedtgt} = src;
//namedtgt == 1

//default values can be assigned and only used if the transfer value is not in the destructured object
let {named1:namedtgt2=0,namednone:namedtgtdefault=3} = src;
// namedtgtdefault == 3, namedtgt2 == 1

// Arrays can also be destructured, using missing/sparse elements to indicate which parameters should be used
const sourcearray = [4,5,6,7];
let [,secondelement,,fourthelement] = sourcearray;
// secondelement == 5, fourthelement == 7
 

function destructuredparams({x:xz=1}={x:2}){

    return xz;

}
//If no arguments are provided, the default parameter is activated (and transfered to xz and returned):
//destructuredparams() == 2
//If an argument *is* provided, but it doesn't have an x value, the inner default is used:
//destructuredparams({}) == 1
//If an argument is provided and has an x, that is used
//destructuredparams({x:3}) == 3


//In general when you get to a place where a var/let would be, you can sub a destructuring pattern in *at that point*
var src = {payload: [{data: {data: 333}}] };
var {payload: [data]}=src; //So here, *data* is what is declared... and here data would be {data: {data: 333}}
var {payload: [{data}]}=src; //But where the *first* data is, if we put an object desctructuring pattern like so, we get data=={data: 333}
var {payload: [{data: x}]}=src; //Which is the equivalent of data: data, but if we change it to x to make it more explicit... ( here x still =={data: 333}, we just changed from the shorthand on the previous line for clarity )
var {payload: [{data: {data: x}}]}=src; //And where the x was, we use *another* destructuring assignment, we get x==333 

//Example of deep destructuring:
//Deep destructuring
var deepObject = {a: {b: {c: [{d: 1, e: 2}]}}}

var {a: test} = deepObject;
console.assert(test.b);

var {a: {b: {c: [{d: var1, e: var2}]}}} = deepObject;
console.assert(var1 === 1 && var2 === 2);
