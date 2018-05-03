var a = {
  b: ()=>{
    console.log(this);
  },
}

a.b();
a.b.bind(a)(); //'lexical this' overrides bindings and everything else

function b() {
  return ()=>{
    console.log(this);
  }
}
b()(); //window
b.bind({abc: 1})()(); //{abc: 1}

a.c = b.bind({abc: 1})();
a.c(); //{abc: 1} <-- from the context where it was declared rather than where it was called

function c(f) {
  f();
}
var d = () => { console.log(this); }
c(d); //window
c.bind({def: 456})(d); //window <-- still from where it was declared

var foo = {
  bar: 123,
  f: ()=> { 
    console.log(this.bar) //(A)
  }, 
  g: {
    bar: 456,
    h: ()=>{ console.log(this.bar) }
  },
  i: () => {
    let bar = 678;
    return ()=>{ console.log(this.bar) };
  },
  j: function(){
    return ()=>{ console.log(this.bar) }
  }
}
foo.f(); //undefined, because at (A) the lexical scope is 'window' (foo is not a function and object literals do not create scope)
foo.g.h(); //also undefined, same reason as above - no matter how many "layers" of object literal you create
foo.i()(); //also undefined, same as above -> wrapping arrow functions in arrow functions also does not create lexical scope
foo.j()(); //123 : a normal function *does* create lexical scope (in this case, the object "foo" of which it is a method) and this is what the arrow function uses
