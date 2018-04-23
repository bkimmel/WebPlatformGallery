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
