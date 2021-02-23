function do_ajax() {

    var req = new XMLHttpRequest();
    var result = document.getElementById('result');
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            // result.innerHTML = req.responseText;
        } else {
            console.log("Somethings happened");
        }
    }

    req.open('POST', '/', true);
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    req.send("query=" + document.getElementById('query').value);

}
