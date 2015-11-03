'use strict';
var request = indexedDB.open("MyTestDatabase",9);
request.onerror = function(event) {
  alert("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  debugger;
  var db = event.target.result;
  var req = db.transaction(['contacts']).objectStore("contacts").get('bill@company.com');
  req.onsuccess = function(evt){
    console.log('Got contact...');
    window.contactObj = req.result;
  }
};
request.onupgradeneeded = function(event) {
   debugger;
  //upgradeneeded runs before onsucces...
  console.log('Upgrading DB...'); 
  var db = event.target.result;
  
  // Create an objectStore for this database
  db.deleteObjectStore("contacts");
  var objectStore = db.createObjectStore("contacts", { keyPath: "email" });

  objectStore.createIndex("firstname", "firstname", { unique: false });
  objectStore.createIndex("lastname", "lastname", { unique: false });

  objectStore.transaction.oncomplete = function(event) {
    //data can only be "clonable" objects (no functions, etc.)
    var customerData = [
      { ssn: "444-44-4444", firstname: "Bill", lastname:'Preston', age: 33, email: "bill@company.com" },
      { ssn: "555-55-5555", firstname: "Ted", lastname:'Logan', age: 32, email: "ted@home.org" },
      { ssn: "333-33-3333", firstname: "Tedsmom", lastname:'Logan', age: 37, email: "tedsmom@home.org" }
    ];
    var contactTransaction = db.transaction("contacts", "readwrite").objectStore("contacts");
    for(let i of customerData){
        console.log('adding...%o', i);
        contactTransaction.add(i);
    }
  };

};