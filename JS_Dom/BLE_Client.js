window.ble = function(){
    console.log('handling click');
    navigator.bluetooth.requestDevice({
    filters:[
        {services: [0xffd0]}
    ]
    })
    .then(function(device){
        console.log('device');
        window.ble_id = device.id;
        return device.gatt.connect();
    })
    .then(function(server){
        console.log('server');
        return server.getPrimaryService(0xffd0);
    })
    .then(function(service){
        console.log('service');
        //return Promise.all([service.getCharacteristic(0xfff1), service.getCharacteristic(0xfff2)]);
        return service.getCharacteristic(0xfff1);
    })
    .then(function(gatt_char){
        debugger;
        window.gatt = gatt_char;
        gatt_char.readValue().then(function(buf){ alert( (new TextDecoder()).decode(buf) ) })
        //gatt_char.startNotifications
        //
    })
    .catch(function(e){ debugger; })

}

var dn = false;
if(!dn) {
    document.addEventListener('click', window.ble);
    dn = true;
}
