var pubkey = null;
var devKey = null;
crypto.subtle.generateKey({"name": "ECDH", "namedCurve": "P-256"}, true, ["deriveKey"]).then(function(ECDHPair){
    console.log(ECDHPair.publicKey);
    console.log(ECDHPair.privateKey);
    return {
        publicKey: ECDHPair.publicKey,
        privateKey: ECDHPair.privateKey 
    }
    /*
    encoder = new TextEncoder('utf-8'); 
    var enc = crypto.subtle.encrypt({"name": "ECDH", "namedCurve": "P-256"}, ECDHPair.publicKey, encoder.encode("Hello"));
    enc.then(function(v){
        console.log(v);
    });
    */
})
.then(function(O_keys){
    pubkey = O_keys.publicKey;
    return crypto.subtle.deriveKey(
        {
            name: O_keys.publicKey.algorithm.name,
            namedCurve: O_keys.publicKey.algorithm.namedCurve, //can be "P-256", "P-384", or "P-521"
            public: O_keys.publicKey, //an ECDH public key from generateKey or importKey
        },
        O_keys.privateKey, //your ECDH private key from generateKey or importKey
        { //the key type you want to create based on the derived bits
            name: "AES-CTR", //can be any AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH", or "HMAC")
            //the generateKey parameters for that type of algorithm
            length: 128, //can be  128, 192, or 256
        },
        false, //whether the derived key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //limited to the options in that algorithm's importKey
    )
})
.then(function(derivedKey){
    devKey = derivedKey;
    encoder = new TextEncoder('utf-8');
    var enc = crypto.subtle.encrypt( { //the key type you want to create based on the derived bits
            name: "AES-CTR", //can be any AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH", or "HMAC")
            //the generateKey parameters for that type of algorithm
            length: 128, //can be  128, 192, or 256
            counter: new Uint8Array(16)
        }, derivedKey, encoder.encode("Hello"));
    //enc.then(function(ciphtext_buffer){ debugger; })
    return enc;
})
.then(function(ciph_buffer){
    var dec = window.crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: new Uint8Array(16), //The same counter you used to encrypt
            length: 128, //The same length you used to encrypt
        },
        devKey, //from generateKey or importKey above
        ciph_buffer //ArrayBuffer of the data
    );
    dec.then(function(dc){ console.log( (new TextDecoder('utf-8')).decode(dc) ); });

})