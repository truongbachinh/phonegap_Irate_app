$(document).ready(function () {
    request.onerror = function (event) {
        console.log('error: ');
    };
    request.onsuccess = function (event) {
        db = request.result;
        displayData();
    };

    $('#addNote').click(function () {
        addNote();
    })

});

function displayData() {
    var urlParam = new URLSearchParams(window.location.search);
    if (urlParam.get('id')) {
        var logID = urlParam.get('id');
        var requester = db.transaction(["RestaurantDB"], "readonly").objectStore("RestaurantDB").get(Number(logID));
        requester.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor != null) {
                var serviceRating = parseInt(cursor.service);
                var cleanRating = parseInt(cursor.clean);
                var foodRating = parseInt(cursor.food);
                var totalRating = Math.round((cleanRating + foodRating + serviceRating) / 3);

                var imgStarTotal = document.createElement('div');
                imgStarTotal.setAttribute("class", "displayStar");
                imgStarTotal.innerHTML = `<p class="pRating" style="margin-right: 5px">Total rating:</p>`;
                for (var i = 0; i < 5; i++) {
                    let temp = `<img class="star" />`
                    if (i >= totalRating) {
                        temp = `<img class="starNull" />`
                    }
                    imgStarTotal.innerHTML += temp;
                }

                var imgStarService = document.createElement('div');
                imgStarService.setAttribute("class", "displayStar");
                imgStarService.innerHTML = `<p class="pOther" style="margin-right: 0px">Service rating:</p>`;
                // for (var i = 0; i < 5; i++) {
                //     let temp = `<img width="27" height="27" src="../img/star.png" />`
                //     if (i >= totalRating) {
                //         temp = `<img width="27" height="27" src="../img/starR.png" />`
                //     }
                //     imgStarService.innerHTML += temp;
                // }
                for (var i = 0; i < 5; i++) {
                    let temp = `<img class="star" />`
                    if (i >= serviceRating) {
                        temp = `<img class="starNull" />`
                    }
                    imgStarService.innerHTML += temp;
                }


                var imgStarClean = document.createElement('div');
                imgStarClean.setAttribute("class", "displayStar");
                imgStarClean.innerHTML = `<p class="pOther" style="margin-right: 10px">Clean rating:</p>`;

                for (var i = 0; i < 5; i++) {
                    let temp = `<img class="star" />`
                    if (i >= cleanRating) {
                        temp = `<img class="starNull" />`
                    }
                    imgStarClean.innerHTML += temp;
                }

                var imgStarFood = document.createElement('div');
                imgStarFood.setAttribute("class", "displayStar");
                imgStarFood.innerHTML = `<p class="pOther" style="margin-right: 14px">Food rating:</p>`;
                for (var i = 0; i < 5; i++) {
                    let temp = `<img class="star" />`
                    if (i >= foodRating) {
                        temp = `<img class="starNull" />`
                    }
                    imgStarFood.innerHTML += temp;
                }

                var liItem = document.createElement('li');
                liItem.setAttribute("class", "liItem")




                var img = document.createElement('img')
                img.setAttribute("id", "imageView" + cursor.key);
                img.setAttribute("style", "width:200px", "height:200px");

                var deleteButton = document.createElement('button');
                deleteButton.innerHTML = "Delete";
                deleteButton.setAttribute("class", "deleteBtn");


                var editButton = document.createElement('button')
                editButton.innerHTML = "Edit";
                editButton.setAttribute("class", "editBtn");

                var addNoteButton = document.createElement('button')
                addNoteButton.innerHTML = "Add Note";
                addNoteButton.setAttribute("class", "addNoteBtn");

                deleteButton.setAttribute('data-delete', cursor.id);
                editButton.setAttribute('data-edit', cursor.id);
                addNoteButton.setAttribute('data-note', cursor.id);

                deleteButton.onclick = function (event) {
                    deleteItem(event);
                }
                editButton.onclick = function (event) {
                    editItem(event);
                }
                addNoteButton.onclick = function (event) {
                    addNoteItem(event);
                }


                liItem.innerHTML = `<p class="pNameRestaurant">Restaurant name: ${cursor.name}</p><hr/>
                <p class="pOtherDetail">Restaurant Type: ${cursor.type}</p>
                <p class="pOtherDetail">Date to visit: ${cursor.date}</p>
                <p class="pOtherDetail">Time to visit: ${cursor.time}</p>
                <p class="pOtherDetail">Average Price: $${cursor.price}</p>
                <p class="pOtherDetail">Note: ${cursor.note}</p>
                <p class="pOtherDetail">Reporter: ${cursor.reporter}</p>`;

                liItem.prepend(img);
                liItem.appendChild(imgStarTotal);
                liItem.appendChild(imgStarService);
                liItem.appendChild(imgStarClean);
                liItem.appendChild(imgStarFood);
                liItem.appendChild(deleteButton);
                liItem.appendChild(editButton);
                liItem.appendChild(addNoteButton);



                (cursor.tags || []).forEach((element, index) => {
                    const { title, content, tag } = element
                    var liItemNote = document.createElement('li');
                    liItemNote.setAttribute("class", "liItem")


                    var noteDetail = document.createElement('div')
                    noteDetail.setAttribute("class", "nameTopRes");
                    noteDetail.setAttribute("style", "margin-left: -15px;margin-bottom: 37px; display: table-row;    font-size: 20px !important;")
                    noteDetail.innerHTML = `Note Detail`

                    var titleNote = document.createElement('div');
                    titleNote.setAttribute("class", "pOther")
                    titleNote.innerHTML = `<hr><p class="pOther" style="margin-right: 14px">Title note: ${title || ""}</p>`;

                    var contentNote = document.createElement('div');
                    contentNote.setAttribute("class", "pOther")
                    contentNote.innerHTML = `<p class="pOther" style="margin-right: 14px">Content note: ${content || ""}</p>`;

                    var urlNote = document.createElement('div');
                    urlNote.setAttribute("class", "pOther")
                    urlNote.innerHTML = `<p class="pOther" style="margin-right: 14px">URL note: <a>${tag || ""}</a></p>`;

                    var deleteNoteButton = document.createElement('button');
                    deleteNoteButton.innerHTML = "X";
                    deleteNoteButton.setAttribute("class", "deleteNoteBtn");

                    deleteNoteButton.setAttribute('data-delete', index);
                    deleteNoteButton.onclick = function (event) {
                        deleteNoteItem(event);
                    }
                    liItemNote.appendChild(noteDetail);
                    liItemNote.appendChild(titleNote);
                    liItemNote.appendChild(contentNote);
                    liItemNote.appendChild(urlNote);
                    liItemNote.prepend(deleteNoteButton);
                    // liItemNote.appendChild(deleteButton);
                    viewNote.append(liItemNote);
                });


                viewResult.append(liItem);

                var ig = "#imageView" + cursor.key;
                var imga = document.querySelector(ig);
                imga.src = 'data:image/jpeg;base64,' + btoa(cursor.picture);
            }
        }
    }
    function deleteItem(event) {
        var dataDelete = event.target.getAttribute('data-delete');
        var transaction = db.transaction(["RestaurantDB"], "readwrite");
        var request = transaction.objectStore("RestaurantDB").delete(Number(dataDelete));
        console.log(request);
        console.log(dataDelete);
        request.onsuccess = function () {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        };
    };

    function editItem(event) {
        var idEdit = event.target.getAttribute('data-edit');
        location.href = ('add.html?id=' + idEdit)
    }

    function addNoteItem(event) {
        var idNote = event.target.getAttribute('data-note');
        location.href = ('note.html?id=' + idNote)
        // document.getElementById('addNoteRestaurant').style.display = "block";


    }

}
function deleteNoteItem(event) {
    var dataDelete = event.target.getAttribute('data-delete');

    var urlParam = new URLSearchParams(window.location.search);
    var transaction = db.transaction(['RestaurantDB'], 'readwrite');
    var objectStore = transaction.objectStore('RestaurantDB');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.key.toString() === urlParam.get('id').toString()) {
                var updateData = cursor.value;
                let array = [...(updateData.tags || [])].filter((el, idx) => idx.toString() !== dataDelete);
                updateData.tags = array
                const requestUpdate = cursor.update(updateData);
                requestUpdate.onsuccess = function () {
                    console.log("update success");
                    reload();
                };
                return;
            };
            cursor.continue();
        } else {
            console.log('Entries displayed.');
        }

    };

};
function addNote() {
    var urlParam = new URLSearchParams(window.location.search);
    var transaction = db.transaction(['RestaurantDB'], 'readwrite');
    var objectStore = transaction.objectStore('RestaurantDB');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.id.toString() === urlParam.get('id')) {
                var updateData = cursor.value;
                let array = [...(updateData.tags || [])];
                let param = {
                    title: $('#rTitleNote').val(),
                    content: $('#rContentNote').val(),
                    tag: $('#rTagNote').val()
                }
                array.push(param)
                updateData.tags = array
                const requestUpdate = cursor.update(updateData);
                requestUpdate.onsuccess = function () {
                    console.log("update success");
                    reload();
                };
                return;
            };
            cursor.continue();
        } else {
            console.log('Entries displayed.');
        }
    };
};





