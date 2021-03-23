/* The Blob object is a file-like object of raw data. Can be read as text or binary data */
// Create a blob using .blob()

let myimg = document.createElement('img');
myimg.setAttribute('id', 'my-img');

let img_path = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Arizona-sunset.jpg/1280px-Arizona-sunset.jpg';

(async function getImg() {
    image = document.getElementById('my-img');
    fetch(img, {})
        .then(response => response.blob())
        .then(blob => {
            // create DOMstring and assign to img
            const objectURL = URL.createObjectURL(blob);
            console.log('objectURL: ', objectURL);
            img.src = objectURL;
        });
}());

