function addWabtToPage({version}) {
  if(window[Symbol.for('WABT')]){
    return Promise.resolve( window[Symbol.for('WABT')] );
  }
  const sc = document.createElement('script');
  sc.src = `https://cdn.jsdelivr.net/gh/AssemblyScript/wabt.js@${version}/index.js`
  return new Promise((res,rej)=>{
    sc.onload = () => {
      window[Symbol.for('WABT')] = sc;
      res(sc)
    };
    document.head.appendChild(sc);
  })
}

var wasmSource = 
`(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    get_local $lhs
    get_local $rhs
  i32.add)
  (export "add" (func $add))
)`;

async function parseWat() {
  await addWabtToPage({version: '1.0.11'})
  var parsedWat = WabtModule().parseWat('add.wasm', wasmSource);
  var { buffer } = parsedWat.toBinary({log: false, canonicalize_lebs: false, relocatable: false, write_debug_names: false})
  var wasmModule = await WebAssembly.compile(buffer)
  var wasmInstance = await WebAssembly.instantiate(wasmModule);
  return {add: wasmInstance.exports.add};
}

parseWat().then( wasmFuncs => { console.log( wasmFuncs.add(2,2) ) } )
