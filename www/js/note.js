$(document).ready(function () {
    request.onerror = function (event) {
        console.log('error: ');
    };
    request.onsuccess = function (event) {
        db = request.result;
    };

    $('#addNote').click(function () {
        addNote();
    })

});
function addNote() {
    var urlParam = new URLSearchParams(window.location.search);
    var transaction = db.transaction(['RestaurantDB'], 'readwrite');
    var objectStore = transaction.objectStore('RestaurantDB');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.id.toString() === urlParam.get('id')) {
                var updateData = cursor.value;
                var array = [...(updateData.tags || [])];
                var param = {
                    title: $('#rTitleNote').val(),
                    content: $('#rContentNote').val(),
                    tag: $('#rTagNote').val()
                }
                array.push(param)
                updateData.tags = array
                const requestUpdate = cursor.update(updateData);
                requestUpdate.onsuccess = function () {
                    console.log("update success");
                    setTimeout(function () {
                        location.href = ("viewDetail.html?" + urlParam);
                    }, 1000);
                };
                return;
            };
            cursor.continue();
        } else {
            console.log('Entries displayed.');
        }
    };
};