const fetch = require('node-fetch');

let dogs_url = "https://dog.ceo/api/breed/hound/afghan/images";

fetch(dogs_url)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                console.log(data);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
