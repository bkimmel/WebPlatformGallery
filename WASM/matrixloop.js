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
  (import "js" "mem" (memory 1))
  (func $skip (param $len i32)
    (result f32)
    (local $m11 f32) (local $m12 f32) (local $m13 f32) (local $m21 f32) (local $m22 f32) (local $m23 f32) (local $n i32)
    (local $x_add i32) (local $y_add i32) (local $x_val f32) (local $y_val f32)
    (local.set $m11 (f32.load (i32.const 0)))
    (local.set $m12 (f32.load (i32.const 4)))
    (local.set $m13 (f32.load (i32.const 8)))
    (local.set $m21 (f32.load (i32.const 12)))
    (local.set $m22 (f32.load (i32.const 16)))
    (local.set $m23 (f32.load (i32.const 20)))
    (local.set $n (i32.const 0))
    loop $loop
      ;;x and y addresses
      (local.set $x_add (i32.add (i32.const 24) (i32.mul (local.get $n) (i32.const 8))))
      (local.set $y_add (i32.add (i32.const 28) (i32.mul (local.get $n) (i32.const 8))))
      
      ;;set starting x & y values
      (local.set $x_val (f32.load (local.get $x_add)))
      (local.set $y_val (f32.load (local.get $y_add)))
      
      ;;calculate x and replace in mem
      (f32.store
        (local.get $x_add)
        (f32.add
          (f32.add
            (f32.mul
              (local.get $x_val)
              (local.get $m11)
            ) 
            (f32.mul
              (local.get $y_val)
              (local.get $m12)
            )
          )
          (local.get $m13)
        )
      )

      ;;calculate y and replace in mem
      (f32.store
        (local.get $y_add)
        (f32.add
          (f32.add
            (f32.mul
              (local.get $x_val)
              (local.get $m21)
            ) 
            (f32.mul
              (local.get $y_val)
              (local.get $m22)
            )
          )
          (local.get $m23)
        )
      )

      (local.set $n (i32.add (local.get $n) (i32.const 1)))
      (i32.le_u (local.get $n) (local.get $len))
      br_if 0
    end
    (f32.const 1)  
  )
  (export "skip" (func $skip))
)`;


var wasmemory = new WebAssembly.Memory({initial:10});

//wasm32Tuples.set(float32Tuples, 0);


async function parseWat() {
  await addWabtToPage({version: '1.0.13'})
  var parsedWat = WabtModule().parseWat('add.wasm', wasmSource);
  var { buffer } = parsedWat.toBinary({log: false, canonicalize_lebs: false, relocatable: false, write_debug_names: false})
  var wasmModule = await WebAssembly.compile(buffer);
  var importObject = { js: { mem: wasmemory } };
  var wasmInstance = await WebAssembly.instantiate(wasmModule, importObject);
  return {skip: wasmInstance.exports.skip};
}

function doAllTheMath(matrix, positions) {
  const res = [];
  function applyMatrix([x,y], [m11,m12,m13,m21,m22,m23]){
    return [x*m11 + y*m12 + m13, x*m21 + y*m22 + m23]
  }
  for (pos of positions){
    res.push(applyMatrix(pos, matrix))
  }
  return res;
}

window.testresults = [];

parseWat().then( wasmFuncs => {
 
  let totalrecs = 10000;
  
  function runHeat() {
    performance.clearMarks()
    function testWasm() {
      performance.mark('wasm-start')
      wasm32Tuples.set(float32Tuples, 0);
      wasmFuncs.skip(total - 1)
      for(i of wasm32Tuples.slice(6, 6 + total)){
        window.testresults.push(i);
      }
      performance.mark('wasm-end')
    }

    function testJS() {
      performance.mark('js-start')
      const conresults = doAllTheMath(projectionMatrix, positions);
      for(let i of conresults){
        window.testresults.push(i);
      }
      performance.mark('js-end')
    }

    var n = totalrecs;
    var total = n;
    var projectionMatrix = [ Number((Math.random() * 1000).toFixed(5)), Number((Math.random() * 1000).toFixed(5)), Number((Math.random() * 1000).toFixed(5)), Number((Math.random() * 1000).toFixed(5)), Number((Math.random() * 1000).toFixed(5)), Number((Math.random() * 1000).toFixed(5))];
    var positions = [];
    while(--n >= 0){
      positions.push([Number((Math.random() * 1000).toFixed(5)), Number((Math.random() * 1000).toFixed(5))])
    }
    var arrayOfTuples = [projectionMatrix, ...positions];
    var float32Tuples = Float32Array.from( arrayOfTuples.flat() );
    var wasm32Tuples = new Float32Array( wasmemory.buffer );

    if(Math.random * 100 < 50){
      testWasm();
      testJS();
    }
    else {
      testJS();
      testWasm();
    }
    performance.measure('js','js-start','js-end');
    performance.measure('wasm','wasm-start','wasm-end');
  }
  
  performance.clearMeasures();
  let numberOfHeats = 500;
  for(let i = 0; i < numberOfHeats; i++){
    console.log('numberOfHeats: ', i)
    runHeat();
  }
  
  console.log(`js over ${numberOfHeats} heats @ ${totalrecs} positions: `, performance.getEntriesByName('js').map(v=>v.duration).reduce((a,v)=>{return a + v},0) / numberOfHeats)
  console.log(`wasm over ${numberOfHeats} heats @ ${totalrecs} positions: `, performance.getEntriesByName('wasm').map(v=>v.duration).reduce((a,v)=>{return a + v},0) / numberOfHeats)
  
  /*
    js over 500 heats @ 100 positions:  0.025239991955459118
    wasm over 500 heats @ 100 positions:  0.008560005575418472
    
    js over 500 heats @ 1000 positions:  0.1296099852770567
    wasm over 500 heats @ 1000 positions:  0.03490000031888485

    js over 500 heats @ 10000 positions:  1.552590012550354
    wasm over 500 heats @ 10000 positions:  0.36521999817341566
  */
} )
