// When Enter key is pressed, activate the button
/* var input = document.getElementById("keyword");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        console.log('Enter pressed');
        event.preventDefault();
        document.getElementById("btn-post").click();
    }
}); */

function clearResults() {
  var mainContainer = document.getElementById("results_container");
  if (mainContainer.innerHTML.trim().length > 0) {
    // console.log('results already exist');
    while (mainContainer.firstChild) {
      mainContainer.firstChild.remove();
    }
  }
}

function sendRequest() {
  var req = new XMLHttpRequest();
  var result = document.getElementById("result");
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // result.innerHTML = req.responseText;
      console.log("Got response");

      // JSON response
      results = JSON.parse(req.response);

      // if Show More Button is clicked, request sent, and response returned
      if (results.hasOwnProperty('is_detail')) {
        console.log('Show modal results:');
        console.log(results);

        // var item_id = results['id'];
        let modal_id = "modal-" + results['id'];
        let modal_box_id = "modal-box-" + results['id'];
        console.log(modal_id);
        console.log(modal_box_id);
        let modal = document.getElementById(modal_box_id);
        let modalContents = document.getElementById(modal_id);

        // Parse response and create HTML elements for modal
        var img_path = results['backdrop_path']
        var title = results["title"];
        var year = results["year"];
        var genres = results["genre_names"].join(", ");
        var rating = results["stars"];
        var rating2 = rating.toFixed(2);
        var vote_count = results["vote_count"];
        var desc = results["overview"];
        var langs = "Spoken languages: " + results["spoken_language_names"].join(", ");

        var title1 = document.createElement("h2");
        title1.innerHTML = title;
        title1.classList.add("result-title2");

        var year_genres = document.createElement("p");
        year_genres.innerHTML = year + " | " + genres;
        year_genres.classList.add("year-genre2");

        var rating3 = document.createElement("p");
        rating3.innerHTML = "&#9733; " + rating2 + "/5";
        rating3.classList.add("star-rating");

        var vote_count1 = document.createElement("p");
        vote_count1.innerHTML = vote_count + " votes";
        vote_count1.classList.add("votes2");

        var desc1 = document.createElement("p");
        desc1.innerHTML = desc;
        desc1.classList.add("desc-modal");

        var langs2 = document.createElement("p");
        langs2.innerHTML = langs;
        langs2.classList.add("langs");

        var backdrop = document.createElement("img");
        if (img_path == null) {
          backdrop.src = "/static/images/movie-placeholder.png";
        } else {
          backdrop.src = "https://image.tmdb.org/t/p/w780" + img_path;
        }

        
        // add close button to modal
        console.log('append close btn to modal');
        const closeModal = document.createElement("span");
        closeModal.classList.add("close");
        closeModal.innerHTML = "&times;";

        // modal.append(closeModal);
        
         // Show Modal
        modal.style.display = "block";
        console.log('append details to modal');
        modalContents.append(closeModal, backdrop, title1, year_genres, rating3, vote_count1, desc1, langs2);

        // When the user clicks, close the modal
        closeModal.onclick = function () {
          console.log('close btn clicked');
          // clear contents
          if (modalContents.innerHTML.trim().length > 0) {
            console.log('results in modal to be cleared');
            while (modalContents.firstChild) {
              modalContents.firstChild.remove();
            }
          }
          // hides modal
          modal.style.display = "none";
        };

      } else {
      // Populate results_container with search results
      var mainContainer = document.getElementById("results_container");
      // Delete existing results, if any
      clearResults();

      // If no results found
      if (results.hasOwnProperty("error")) {
        var result_box0 = document.createElement("div");
        result_box0.classList.add("result-box");
        var no_results = document.createElement("p");
        no_results.innerHTML = results["error"];
        result_box0.append(no_results);
        mainContainer.append(result_box0);
      } else {
        // otherwise populate results page
        var showing = document.createElement("h3");
        showing.innerHTML = "Showing results...";
        mainContainer.append(showing);

        for (let i = 0; i < Object.keys(results).length; i++) {
          var item_id = results[i]["id"];
          var item_type = results[i]["item_type"]
          var title = results[i]["title"];
          var year = results[i]["year"];
          var genres = results[i]["genre_names"].join(", ");
          var rating = results[i]["stars"];
          var rating2 = rating.toFixed(2);
          var vote_count = results[i]["vote_count"];
          var desc = results[i]["overview"];
          var img_path = results[i]["poster_path"];

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
          if (img_path == null) {
            poster.src = "/static/images/poster-placeholder.png";
          } else {
            poster.src = "https://image.tmdb.org/t/p/w500" + img_path;
          }
          poster.classList.add("poster-img");

          // Add Modal Box:

          // show more Button
          var showMore = document.createElement("btn");
          showMore.innerHTML = "Show More";
          showMore.classList.add("show-more");
          let showMoreId = item_id;
          // showMore.setAttribute("id", "show-more"); //add id
          showMore.setAttribute("id", showMoreId); //add id

          // background div for modal
          var modal = document.createElement("div");
          modal.classList.add("modal-box");
          var modal_box_id = "modal-box-" + item_id; 
          modal.setAttribute("id", modal_box_id); //add id

          // add inner contents to modal
          const modal_contents = document.createElement("div");
          modal_contents.classList.add("modal-content");
          var modal_id = "modal-" + item_id; 
          modal_contents.setAttribute("id", modal_id);
          // modal_contents.innerHTML = "Test!!!";

          // // add close button to modal
          // const closeModal = document.createElement("span");
          // closeModal.classList.add("close");
          // closeModal.innerHTML = "&times;";

          modal.append(modal_contents);

          // Modal box code logic:
          console.log("button loaded");

          // Add all to each result box
          result_box.append(
            title1,
            year_genres,
            rating3,
            vote_count1,
            poster,
            desc1,
            showMore,
            modal
          );
          mainContainer.append(result_box);

           // When the user clicks the button, open the modal
          // current Show More button
          var currentShowMore = document.getElementById(showMoreId);
          currentShowMore.onclick = function () {
            // send item_id to Python backend
            req.open("POST", "/", true);
            req.setRequestHeader(
              "content-type",
              "application/x-www-form-urlencoded;charset=UTF-8"
            );
            console.log("Sending item_id=" + showMoreId);
            req.send(
              "item_id=" + showMoreId + "&" + "item_type=" + item_type
            );
           
          };
          
        }
      }}
    } else {
      console.log("ready state " + this.readyState);
    }
  };
  req.open("POST", "/", true);
  req.setRequestHeader(
    "content-type",
    "application/x-www-form-urlencoded;charset=UTF-8"
  );

  // if search query entered
  req.send(
    "query=" +
      document.getElementById("keyword").value +
      "&" +
      "query2=" +
      document.getElementById("category").value
  );

}
