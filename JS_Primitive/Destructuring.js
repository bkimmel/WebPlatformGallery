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
