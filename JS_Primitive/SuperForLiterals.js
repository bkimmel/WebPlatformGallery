var myObj = {
  testMethod() {
    return super.toString()
  }
}

console.log( myObj.testMethod() ) //prototype is Object so [object Object]

var c = {toString(){ return 'c' }}

Object.setPrototypeOf(myObj, c)

console.log( myObj.testMethod() ) //'c' - it calls super
