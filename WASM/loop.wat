(module
  (func $looper (param $limit i32) (result i32)
    (local $v i32)
    (set_local $v (i32.const 0))
    (block
      (loop
        (br_if 1 (i32.ge_u (get_local $v)(get_local $limit)))
        (set_local $v (i32.add (get_local $v) (i32.const 1)))
        (br 0)
      )
    )
    (get_local $v)
  )
  (export "looper" (func $looper))
)
