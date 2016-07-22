var target = {};
var handler = {
    get: function(target, propKey, receiver){
        console.log('Intervening in GET %s for %O', propKey, target);
        return propKey in {'foo':1,'bar':1} ? 1 : target[propKey];
    },
    set: function(target, propKey, value, receiver) {
        console.log('Intervening in SET %s for %O', propKey, target);
        return propKey in {'foo':1,'bar':1} ? (target[propKey] = 2) : (target[propKey] = value);
    }
};
//Creating
var p = new Proxy(target, handler);
var revocable = Proxy.revocable(target, handler);
//Getting
console.log('p.foo:%s', p.foo);
console.log('revocable.proxy.bar:%s', revocable.proxy.bar);
//Setting
p.foo = 4;
console.log('p.foo was set to 4, but uderlying target receiced :%s', target.foo);
//Revoking
revocable.revoke();
try {
    console.log('revocable.proxy.bar:%s', revocable.proxy.bar);
}
catch(e){
    console.log('revocable.proxy.bar was revoked:%s', e);
}