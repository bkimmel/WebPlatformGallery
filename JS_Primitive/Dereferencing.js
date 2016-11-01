var obj = {
    a: 3,
    f: function(){ console.log('this.a: %s ', this.a) }
};

(0,obj.f)(); //undefined, because comma operater dereferences obj.f
(obj.f)();