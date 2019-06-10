function addWabtToPage({version}) {
  if(window[Symbol.for('WABT')]){
    return Promise.resolve( window[Symbol.for('WABT')] );
  }
  const sc = document.createElement('script');
  sc.src = `https://cdn.jsdelivr.net/gh/AssemblyScript/wabt.js@${version}/index.js`
  document.head.appendChild(sc);
  window[Symbol.for('WABT')] = sc;
  return Promise.resolve( window[Symbol.for('WABT')] );
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
  var parsedWat = WabtModule().parseWat('add.wasm', wasmSource);
  var { buffer } = parsedWat.toBinary({log: false, canonicalize_lebs: false, relocatable: false, write_debug_names: false})
  var wasmModule = await WebAssembly.compile(buffer)
  var wasmInstance = await WebAssembly.instantiate(wasmModule);
  return {add: wasmInstance.exports.add};
}

parseWat().then( wasmFuncs => { console.log( wasmFuncs.add(2,2) ) } )
