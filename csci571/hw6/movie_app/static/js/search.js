function send_request() {
    var req = new XMLHttpRequest();
    var result = document.getElementById('result');
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // result.innerHTML = req.responseText;

            // JSON response
            search_results = JSON.parse(req.response);
            console.log(search_results);

            // Populate results_container with search results
            var mainContainer = document.getElementById("results_container");

            // Delete existing results, if any
            if (mainContainer.innerHTML.trim().length > 0) {
                // console.log('results already exist');
                while (mainContainer.firstChild) {
                    mainContainer.firstChild.remove();
                }
            }

            var showing = document.createElement("h3");
            showing.innerHTML = "Showing results...";
            mainContainer.append(showing);

            for (let i = 0; i < Object.keys(search_results).length; i++) {
                var title = search_results[i]['title'];
                var year = search_results[i]['year'];
                var genres = search_results[i]['genre_names'].join(', ');
                var rating = search_results[i]['stars'];
                var rating2 = rating.toFixed(2);
                var vote_count = search_results[i]['vote_count'];
                var desc = search_results[i]['overview'];
                var img_path = search_results[i]['poster_path'];


                // add json elements to page dynamically
                // var br = document.createElement("br");
                var result_box = document.createElement("div");
                result_box.classList.add("result-box");

                var title1 = document.createElement("h2");
                title1.innerHTML = title;
                title1.classList.add("result-title");

                var year_genres = document.createElement("p");
                year_genres.innerHTML = year + " | " + genres;
                year_genres.classList.add("year-genre");

                var rating3 = document.createElement("p");
                rating3.innerHTML = "&#9733; " + rating2 + "/5";
                rating3.classList.add("star-rating");

                var vote_count1 = document.createElement("p");
                vote_count1.innerHTML = vote_count + " votes";
                vote_count1.classList.add("votes");

                var desc1 = document.createElement("p");
                desc1.innerHTML = desc;

                var poster = document.createElement("img");
                poster.src = "https://image.tmdb.org/t/p/w500" + img_path;
                poster.classList.add("poster-img");

                result_box.append(title1, year_genres, rating3, vote_count1, poster, desc1)
                mainContainer.append(result_box);
            }

        } else {
            console.log('ready state ' + this.readyState);
        }
    }
    req.open('POST', '/', true);
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');

    req.send("query=" + document.getElementById('keyword').value + "&" + "query2=" + document.getElementById('category').value);
}
