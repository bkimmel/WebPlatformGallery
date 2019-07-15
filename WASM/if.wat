(module
  (func $iffer (param $target i32) (result i32)
    (local $ret i32)
    (if
      (i32.eq (get_local $target) (i32.const 42))
      (then (set_local $ret (i32.const 1)))
      (else (set_local $ret (i32.const 0)))
    )
    (get_local $ret)
  )
  (export "iffer" (func $iffer))
)
