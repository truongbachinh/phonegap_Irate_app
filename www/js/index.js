function load() {
    setTimeout(function () {
        window.location.href = "view.html";
    }, 1000);
}
function reload() {
    setTimeout(function () {
        location.reload();
    }, 1000);
}
var app = {

    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {

    }
};



