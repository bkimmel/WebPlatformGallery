
//(Unclaimed)
function generateKeyPair() {

    return crypto.subtle.generateKey({
            "name": "RSA-OAEP", 
            "modulusLength": 2048,
            "publicExponent": new Uint8Array([1,0,1]),
            "hash": {"name": "SHA-256"}
        }, true, ["encrypt","decrypt"]).then(function(RSAPair){
        console.log(RSAPair.publicKey);
        console.log(RSAPair.privateKey);
        return {
            publicKey: RSAPair.publicKey,
            privateKey: RSAPair.privateKey 
        }
    
    });

}

function generateRandomKey() {
    return window.crypto.subtle.generateKey(
       {name: "AES-CBC", length: 128}, //Algo
       true, //Can extract
       ["encrypt","decrypt"] //Can be used for
    )
}

//Claimed:
function importPrivateKey(pk_text) {

}

//Page Ops:
function setPrivateKey() {
    
}
function getPublicKeys() {

}
function requestServerPublicKey() {

}
function getSessionKey() {

}

//Posting Key:
//Subject's Public Key :: Server holds "Permission" :: Only exposes messages with valid Session key
//Asynchronous store of messages/keys - pre-encrypt with Subject's PubK

//Page Flow:
//Check Claim ->
//  (Claimed)
//      Show Public
//      Check Session ->
//          (Subject)
//              Message Reader
//              Message Sender
//          (Target)
//              Post Key
//              Post Whisper
//  (Unclaimed)
//      Show Claim Form
//          Generate Claim -> Confirm -> Send Public Key To Server -> Send Sample Message
//              Show Private Key


//Gen random key.  Encyrypt plaintext with random key.  Encrypt Random key with Receiver's public key.

generateKeyPair().then(function(keyPair){
    let pub = keyPair.publicKey;
    let plainText = "Hello World!";
    let ciph = generateRandomKey()
        .then(function(randomKey){
            var iv = window.crypto.getRandomValues(new Uint8Array(16));
            var cipher = window.crypto.subtle.encrypt({name: "AES-CBC", iv: iv}, randomKey, (new TextEncoder('utf-8')).encode(plainText));
            return Promise.resolve([iv,cipher]);
        })
    
    ciph.then(function(arr){
        debugger;
    });


})