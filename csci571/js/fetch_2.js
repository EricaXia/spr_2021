const fetch = require('node-fetch');

let dogs_url = "https://dog.ceo/api/breed/hound/afghan/images";

/* Fetch response metadata */
fetch(dogs_url).then(function(response) {
    console.log(response.headers.get('Content-Type'));
    console.log(response.headers.get('Date'));
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.type);
    console.log(response.url);
});

/* Fetch response data */
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


