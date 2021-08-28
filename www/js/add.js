var imageConvertBase;

request.onerror = function (event) {
    console.log('error: ');
};
request.onsuccess = function (event) {
    db = request.result;
    urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id')) {
        var logID = urlParams.get('id');
        var requester = db.transaction(["RestaurantDB"], "readonly").objectStore("RestaurantDB").get(Number(logID));
        requester.onsuccess = function (event) {
            var r = requester.result;
            if (r != null) {
                var image = document.querySelector('#img');
                imageConvertBase = 'data:image/jpge;base64,' + btoa(r.picture);
                image.src = imageConvertBase
                document.getElementById('img').style.display = "block";
                $('#r-id').val(r.id);
                $('#r-name').val(r.name);
                $('#r-type').val(r.type);
                $('#food-r').val(r.food);
                $('#service-r').val(r.service);
                $('#clean-r').val(r.clean);
                $('#r-date').val(r.date);
                $('#r-time').val(r.time);
                $('#note').val(r.note);
                $('#r-price').val(r.price);
                $('#reporter').val(r.reporter);
            } else {
                console.log('Record update does not exist');
            }
        };
    };
};

function updateResult() {
    var transaction = db.transaction(['RestaurantDB'], 'readwrite');
    var objectStore = transaction.objectStore('RestaurantDB');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.id.toString() === urlParams.get('id')) {
                var updateData = cursor.value;
                updateData.name = $('#r-name').val();
                updateData.picture = imageConvertBase;
                updateData.type = $('#r-type').val();
                updateData.date = $('#r-date').val();
                updateData.time = $('#r-time').val();
                updateData.price = $('#r-price').val();
                updateData.service = $('#service-r').val();
                updateData.clean = $('#clean-r').val();
                updateData.food = $('#food-r').val();
                updateData.note = $('#note').val();
                updateData.reporter = $('#reporter').val();
                const requestUpdate = cursor.update(updateData);
                requestUpdate.onsuccess = function () {
                    load();
                };
                return;
            };
            cursor.continue();
        } else {
            console.log('Entries displayed.');
        }
    };
};



$(document).ready(function () {
    $('#reviewRestaurant').validate({
        rules: {
            rName: {
                required: true,
                minlength: 3,
                maxlength: 25,
            },
            rPicture:
            {
                required: true,
            },
            rType:
            {
                required: true,

            },
            rDate:
            {
                required: true,
            },
            rTime:
            {
                required: true,
            },
            rPrice:
            {
                required: true,
                number: true,
            },
            rService:
            {
                required: true,

            },
            rClean:
            {
                required: true,
            },
            rFood:
            {
                required: true,

            },
            // rNote: {
            //     required: true,
            //     maxlength: 1000,
            // },
            rReporter: {
                required: true,
            },
        },
        messages:
        {
            rName: {
                required: "Enter the name of restaurant.",
                minlength: "Please enter at least 3 characters for the restaurant name.",
                maxlength: "Please enter no more than 25 characters for the restaurant name."
            },
            rType: {
                required: "Select type restaurant."
            },
            rPicture: {
                required: "Select restaurant picture."
            },
            rDate: {
                required: "Enter the date visited the restaurant.",
            },
            rTime: {
                required: "Enter the time visited the restaurant.",
            },
            rPrice: {
                required: "Enter price for restaurant.",
                number: "Enter number for price."
            },
            rService: {
                required: "Rating service restaurant.",
            },
            rClean: {
                required: "Rating clean restaurant."
            },
            rFood: {
                required: "Rating food restaurant."
            },
            // rNote: {
            //     required: "Enter note.(Optional)"
            // },
            rReporter: {
                required: "Enter the name of reporter."
            },
        },
        submitHandler: function (form) {
            var name = $('#r-name').val();
            var picture = $('#r-picture')[0].files[0];
            var type = $('#r-type').val();
            var date = $('#r-date').val();
            var time = $('#r-time').val();
            var price = $('#r-price').val();
            var service = $('#service-r').val();
            var clean = $('#clean-r').val();
            var food = $('#food-r').val();
            var note = $('#note').val();
            var reporter = $('#reporter').val();
            if (urlParams.get('id')) {
                updateResult()
            } else {

                add(name, picture, type, date, time, price, service, clean, food, note, reporter);
            }
        }
    });

    $('#reviewRestaurant').change(function () {
        var serviceRating = document.getElementById("service-r").value;
        var foodRating = document.getElementById("food-r").value;
        var cleanRating = document.getElementById("clean-r").value;
        if (serviceRating == 5) {
            document.getElementById('rServiceSp').style.display = 'block';
        }
        else {
            document.getElementById('rServiceSp').style.display = 'none';
        }
        if (cleanRating == 5) {
            document.getElementById('rCleanSp').style.display = 'block';
        }
        else {
            document.getElementById('rCleanSp').style.display = 'none';
        }
        if (foodRating == 5) {
            document.getElementById('rFoodSp').style.display = 'block';
        }
        else {
            document.getElementById('rFoodSp').style.display = 'none';
        }

    });


    Webcam.set({
        width: 200,
        height: 109,
        // image_format: 'jpeg',
        // jpeg_quality: 90
        quality: 50,
        allowEdit: true,
    });
    Webcam.attach('#camera');


    image = document.querySelector('#img');
    $('#takePicture').change(function () {
        document.getElementById('camera').style.display = "block";
    });

    $('#takePicture').click(function () {
        Webcam.snap(function (data_uri) {
            // var takeImage = document.querySelector('#img');
            image.src = data_uri;
            imageConvertBase = data_uri;
            document.getElementById('img').style.display = "block";
        });
    });

    // navigator.camera.getPicture(onSuccess, onFail, {
    //     quality: 50,
    //     allowEdit: true,
    //     destinationType: Camera.DestinationType.FILE_URI
    // })
    $('#r-picture').change(function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            var bit = e.target.result;
            imageConvertBase = bit;
            image.src = 'data:image/jpge;base64,' + btoa(imageConvertBase);
            document.getElementById('img').style.display = "block";

        }
    });


    function add(nameRestaurant, pictureRestaurant, typeRestaurant, dateVisit, timeVisit, pricePerOne,
        serviceRating, cleanRating, foodRating, Note, Reporter) {
        var request = db
            .transaction(['RestaurantDB'], 'readwrite')
            .objectStore('RestaurantDB')
            .add({
                name: nameRestaurant, picture: imageConvertBase, type: typeRestaurant, date: dateVisit, time: timeVisit, price: pricePerOne,
                service: serviceRating, clean: cleanRating, food: foodRating, note: Note, reporter: Reporter
            });
        request.onsuccess = function (event) {
            alert(`${nameRestaurant}  has been rating.`);
            load();
        };

    }
})

