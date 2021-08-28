//
// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
//     window.msIndexedDB;
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
//     window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange ||
//     window.webkitIDBKeyRange || window.msIDBKeyRange;
//
// if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB.");
// }

var restaurantData;
var db;
var request = window.indexedDB.open('RestaurantDB', 1);
var ulItem = document.getElementById('ulItem');
var viewResult = document.getElementById("viewSearch");
var viewNote = document.getElementById("viewNote");
var showNoteDetail = document.getElementById("showNoteDetail");

request.onerror = function (event) {
    console.log('error: ');
};
request.onsuccess = function (event) {
    db = request.result;

};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('RestaurantDB', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("type", "type", { unique: false });
    objectStore.createIndex("picture", "picture", { unique: false });
    objectStore.createIndex("date", "date", { unique: false });
    objectStore.createIndex("time", "time", { unique: false });
    objectStore.createIndex("price", "price", { unique: false });
    objectStore.createIndex("service", "service", { unique: false });
    objectStore.createIndex("clean", "clean", { unique: false });
    objectStore.createIndex("food", "food", { unique: false });
    objectStore.createIndex("note", "note", { unique: false });
    objectStore.createIndex("reporter", "reporter", { unique: false });
    for (var i in restaurantData) {
        objectStore.add(restaurantData[i]);
    }
};









