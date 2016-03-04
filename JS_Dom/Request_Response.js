caches.open('v1').then(function(c){ 
    c.put(new Request('test.jpg'), new Response('test received'));
    caches.match(new Request('test.jpg')).then(function(v){
        //debugger;
        //can only be read once, so clone it
        v.clone().text().then(function(t){ console.log(t) });
        
        var reader = v.body.getReader();
        reader.read().then(function(readval){
            var t = new TextDecoder('utf-8').decode(readval.value);
            console.log(t);
        });
    }); 
});