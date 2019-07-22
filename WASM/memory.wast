;;doubles $scale number of i32 entries in supplied memory 
(module
  (memory $mem (import "js" "jsmem") 1)
  (func $doubler (param $scale i32)
    (local $currentoffset i32)
    (local $max i32)
    (block
     ;;4bytes = 1 i32 entry
      (set_local $max (i32.mul(get_local $scale)(i32.const 4)))
      (set_local $currentoffset (i32.const 0)) 
      (loop
        (br_if 1 (i32.ge_s (get_local $currentoffset) (get_local $max)))
        (i32.store
          (get_local $currentoffset)
          (i32.mul (i32.const 2) (i32.load (get_local $currentoffset)))
        )
        (set_local $currentoffset
          (i32.add (get_local $currentoffset) (i32.const 4))
        )
        (br 0)
      )
    )
  )
  (export "doubler" (func $doubler))
)
