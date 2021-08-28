$(document).ready(function () {
    request.onerror = function (event) {
        console.log('error: ');
    };
    request.onsuccess = function (event) {
        db = request.result;
        displayData();
    };
});

function displayData() {
    var objectStore = db.transaction('RestaurantDB').objectStore('RestaurantDB');
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
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

            var viewDetailBtn = document.createElement('button');
            viewDetailBtn.innerHTML = "Detail";
            viewDetailBtn.setAttribute("class", "detailBtn");

            deleteButton.setAttribute('data-delete', cursor.key);
            editButton.setAttribute('data-edit', cursor.key);
            viewDetailBtn.setAttribute('data-detail', cursor.key);

            deleteButton.onclick = function (event) {
                deleteItem(event);
            }
            editButton.onclick = function (event) {
                editItem(event);
            }
            viewDetailBtn.onclick = function (event) {
                viewDetail(event);
            }

            liItem.innerHTML = `
            <p class="pNameRestaurant">Restaurant name: ${cursor.value.name}</p><hr/>
            <p class="pOther">Type: ${cursor.value.type}</p>
            <p class="pOther">Average Price: $${cursor.value.price}</p>
            <p class="pOther">Reporter: ${cursor.value.reporter}</p>`;

            liItem.prepend(img);
            liItem.append(imgStar);
            liItem.appendChild(deleteButton);
            liItem.appendChild(editButton);
            liItem.appendChild(viewDetailBtn);
            viewResult.append(liItem);

            var ig = "#imageView" + cursor.key;
            var imga = document.querySelector(ig);

            imga.src = 'data:image/jpeg;base64,' + btoa(cursor.value.picture);

            cursor.continue();

        }
        else {
            console.log("error");
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
function viewDetail(event) {
    var idViewDetail = event.target.getAttribute('data-detail');
    location.href = ('viewDetail.html?id=' + idViewDetail)
}




