
$(document).ready(function () {
    $('#txtSearch').on("keyup", function () {
        search();
    });
})

function search() {
    document.getElementById("viewSearch").innerHTML = "";
    var search = document.getElementById("txtSearch").value.toString().toLowerCase();

    var typeSearch = document.getElementById("typeSearch").value;
    if (search != "") {
        var objectStore = db.transaction('RestaurantDB').objectStore('RestaurantDB');
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var dataSearch = cursor.value[typeSearch];
                ///  Type search
                var serviceRating = parseInt(cursor.value.service);
                var cleanRating = parseInt(cursor.value.clean);
                var foodRating = parseInt(cursor.value.food);
                var totalRating = Math.round((cleanRating + foodRating + serviceRating) / 3);

                var imgStar = document.createElement('div');
                imgStar.setAttribute("class", "displayStar");
                imgStar.innerHTML = `<p class="pRating" style="margin-right: 5px">Total rating:</p>`;

                for (var i = 0; i < 5; i++) {
                    let temp = `<img class="star" />`
                    if (i >= totalRating) {
                        temp = `<img class="starNull" />`
                    }
                    imgStar.innerHTML += temp;
                }
                var img = document.createElement('img')
                img.setAttribute("id", "imageSearch" + cursor.key);
                img.setAttribute("style", "width:200px", "height:200px");

                if (typeSearch.toString() == "totalRating") {
                    var dataSearchByTotal = totalRating;

                    if (dataSearchByTotal == search) {

                        var liItems = document.createElement('li');
                        liItems.setAttribute("class", "liItem")
                        var deleteButton = document.createElement('button');
                        deleteButton.innerHTML = "Delete";
                        deleteButton.setAttribute("class", "deleteBtn");


                        var editButton = document.createElement('button')
                        editButton.innerHTML = "Edit";
                        editButton.setAttribute("class", "editBtn");


                        var viewDetailBtn = document.createElement('button');
                        viewDetailBtn.innerHTML = "Detail";
                        viewDetailBtn.setAttribute("class", "detailBtn");

                        liItems.innerHTML = `
                        <p class="pNameRestaurant">Restaurant name: ${cursor.value.name}</p><hr/>
                        <p class="pOther">Type: ${cursor.value.type}</p>
                        <p class="pOther">Average Price: $${cursor.value.price}</p>
                        <p class="pOther">Reporter: ${cursor.value.reporter}</p>`;

                        liItems.prepend(img);
                        liItems.append(imgStar);
                        liItems.appendChild(deleteButton);
                        liItems.appendChild(editButton);
                        liItems.appendChild(viewDetailBtn);

                        deleteButton.setAttribute('data-delete', cursor.key);
                        editButton.setAttribute('data-edit', cursor.key);
                        viewDetailBtn.setAttribute('data-view', cursor.key);
                        deleteButton.onclick = function (event) {
                            deleteItem(event);
                        }
                        editButton.onclick = function (event) {
                            editItem(event);
                        }
                        viewDetailBtn.onclick = function (event) {
                            viewDetail(event);
                        }

                        viewResult.append(liItems);
                        var ig = "#imageSearch" + cursor.key;
                        var imga = document.querySelector(ig);
                        imga.src = 'data:image/jpeg;base64,' + btoa(cursor.value.picture);

                    }
                }
                if (dataSearch && (dataSearch.toString().toLowerCase()).includes(search)) {

                    var liItems = document.createElement('li');
                    liItems.setAttribute("class", "liItem")
                    var deleteButton = document.createElement('button');
                    deleteButton.innerHTML = "Delete";
                    deleteButton.setAttribute("class", "deleteBtn");

                    var editButton = document.createElement('button')
                    editButton.innerHTML = "Edit";
                    editButton.setAttribute("class", "editBtn");

                    var viewDetailBtn = document.createElement('button');
                    viewDetailBtn.innerHTML = "Detail";
                    viewDetailBtn.setAttribute("class", "detailBtn");

                    liItems.innerHTML = `
                    <p class="pNameRestaurant">Restaurant name: ${cursor.value.name}</p><hr/>
                    <p class="pOther">Type: ${cursor.value.type}</p>
                    <p class="pOther">Average Price: $${cursor.value.price}</p>
                    <p class="pOther">Reporter: ${cursor.value.reporter}</p>`;

                    liItems.prepend(img);
                    liItems.append(imgStar);
                    liItems.appendChild(deleteButton);
                    liItems.appendChild(editButton);
                    liItems.appendChild(viewDetailBtn);

                    deleteButton.setAttribute('data-delete', cursor.key);
                    editButton.setAttribute('data-edit', cursor.key);
                    viewDetailBtn.setAttribute('data-view', cursor.key);
                    deleteButton.onclick = function (event) {
                        deleteItem(event);
                    }
                    editButton.onclick = function (event) {
                        editItem(event);
                    }
                    viewDetailBtn.onclick = function (event) {
                        viewDetail(event);
                    }

                    viewResult.append(liItems);
                    var ig = "#imageSearch" + cursor.key;
                    var imga = document.querySelector(ig);
                    imga.src = 'data:image/jpeg;base64,' + btoa(cursor.value.picture);
                }
                cursor.continue();

            }
        }
    }
}

function deleteItem(event) {
    var dataDelete = event.target.getAttribute('data-delete');
    var transaction = db.transaction(["RestaurantDB"], "readwrite");
    var request = transaction.objectStore("RestaurantDB").delete(Number(dataDelete));
    transaction.oncomplete = function () {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    };
};
function editItem(event) {
    var idEdit = event.target.getAttribute('data-edit');
    location.href = ('add.html?id=' + idEdit)
}
function viewDetail(event) {
    var idViewDetail = event.target.getAttribute('data-view');
    location.href = ('viewDetail.html?id=' + idViewDetail)
}


