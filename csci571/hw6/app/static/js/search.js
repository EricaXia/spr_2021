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

function addBlank() {
  var mainContainer = document.getElementById("results_container");
  var blank = document.createElement("div");
  blank.classList.add("blank");
  mainContainer.append(blank);
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
      if (results.hasOwnProperty("is_detail")) {
        console.log("Show modal results:");
        console.log(results);

        // var item_id = results['id'];
        let modal_id = "modal-" + results["id"];
        let modal_box_id = "modal-box-" + results["id"];
        // console.log(modal_id);
        // console.log(modal_box_id);
        let modal = document.getElementById(modal_box_id);
        let modalContents = document.getElementById(modal_id);

        // Parse response and create HTML elements for modal
        var img_path = results["backdrop_path"];
        var title = results["title"];
        var year = results["year"];
        var genres = results["genre_names"].join(", ");
        var rating = results["stars"];
        var rating2 = rating.toFixed(2);
        var vote_count = results["vote_count"];
        var desc = results["overview"];
        var langs =
          "Spoken languages: " + results["spoken_language_names"].join(", ");

        var title1 = document.createElement("h2");
        title1.innerHTML = title;
        title1.classList.add("result-title2");

        var weblink = document.createElement("a");
        weblink.innerHTML = "&#x24d8;";
        weblink.href = results["tmdb_url"];
        weblink.classList.add("info-sym");
        weblink.setAttribute("target", "_blank");

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
          backdrop.src = "/static/images/movie-placeholder.jpg";
        } else {
          backdrop.src = "https://image.tmdb.org/t/p/w780" + img_path;
        }
        backdrop.classList.add("modal-backdrop");

        // add close button to modal
        console.log("append close btn to modal");
        const closeModal = document.createElement("span");
        closeModal.classList.add("close");
        closeModal.innerHTML = "&times;";
        // Show Modal
        modal.style.display = "block";
        console.log("append details to modal");
        modalContents.append(
          closeModal,
          backdrop,
          title1,
          weblink,
          year_genres,
          rating3,
          vote_count1,
          desc1,
          langs2
        );

        // Append cast details (8)
        var cast_details = results["cast_details"];
        var cast_box = document.createElement("div");
        cast_box.classList.add("cast-box");
        const cast_heading = document.createElement("h2");
        cast_heading.innerHTML = "Cast";
        cast_heading.classList.add("cast-heading");

        for (i = 0; i < 8; i++) {
          //cast_details.length
          let cast_item = document.createElement("div");
          cast_item.classList.add("cast-item");

          if (cast_details[i]["image_path"] == null) {
            var cast_img_path = "/static/images/person-placeholder.png";
          } else {
            var cast_img_path = cast_details[i]["image_path"];
          }
          let real_name = cast_details[i]["real_name"];
          let role_name = cast_details[i]["role_name"];
          let cast_img = document.createElement("img");
          cast_img.src = cast_img_path;
          cast_img.classList.add("cast-img");

          let real_name2 = document.createElement("p");
          real_name2.innerText = real_name;
          real_name2.classList.add("cast-text", "real-name");
          let cast_text = document.createElement("p");
          cast_text.innerText = "AS";
          cast_text.classList.add("cast-text");
          let role_name2 = document.createElement("p");
          role_name2.innerText = role_name;
          role_name2.classList.add("cast-text");
          cast_item.append(cast_img, real_name2, cast_text, role_name2);
          cast_box.append(cast_item);
        }
        modalContents.append(cast_heading, cast_box);

        const rev_heading = document.createElement("h2");
        rev_heading.innerHTML = "Reviews";
        rev_heading.classList.add("cast-heading");
        // console.log('rev_headling');

        // Append reviews
        var review_container = document.createElement("div");
        review_container.classList.add("review-container");
        var review_details = results["review_details"];

        for (i = 0; i < review_details.length; i++) {
          let review_item = document.createElement("div");
          review_item.classList.add("review-item");

          let reviewer = review_details[i]["reviewer"];
          let review_date = review_details[i]["review_date"];
          let reviewer_info = document.createElement("p");
          reviewer_info.classList.add("reviewer-info");
          reviewer_info.innerHTML =
            "<b>" + reviewer + "</b>" + " on " + review_date;

          let rating = review_details[i]["rating"];
          let rating3 = document.createElement("p");
          if (rating == null) {
            // var rating3 = document.createElement("p");
            rating3.innerHTML = "";
          } else {
            let rating2 = rating.toFixed(2);
            rating3.innerHTML = "&#9733; " + rating2 + "/5";
            rating3.classList.add("star-rating");
          }

          let review_text = review_details[i]["review_text"];
          let review_text2 = document.createElement("p");
          review_text2.classList.add("review-text");
          review_text2.innerText = review_text;

          let border = document.createElement("HR");
          border.classList.add("review-border");

          review_item.append(reviewer_info, rating3, review_text2, border);
          review_container.append(review_item);
          console.log("review added");
        }
        modalContents.append(
          cast_heading,
          cast_box,
          rev_heading,
          review_container
        );

        // When the user clicks, close the modal
        closeModal.onclick = function () {
          console.log("close btn clicked");
          // clear contents
          if (modalContents.innerHTML.trim().length > 0) {
            console.log("results in modal to be cleared");
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

        // // Delete blank space
        // document.getElementById("blank").remove();


        // Delete existing results, if any
        clearResults();

        // If no results found
        if (results.hasOwnProperty("error")) {
          var result_box0 = document.createElement("div");
          result_box0.classList.add("result-box");
          var no_results = document.createElement("p");
          no_results.innerHTML = results["error"];
          no_results.classList.add("no-results");
          result_box0.append(no_results);
          mainContainer.append(result_box0);
        } else {
          // otherwise populate results page
          var showing = document.createElement("h3");
          showing.innerHTML = "Showing results...";
          mainContainer.append(showing);

          for (let i = 0; i < Object.keys(results).length; i++) {
            var item_id = results[i]["id"];
            var item_type = results[i]["item_type"];
            var title = results[i]["title"];
            var year = results[i]["year"];
            var genres = results[i]["genre_names"].join(", ");
            var rating = results[i]["stars"];
            var rating2 = rating.toFixed(2);
            var vote_count = results[i]["vote_count"];
            var desc = results[i]["overview"];
            var img_path = results[i]["poster_path"];

            // add json elements to page dynamically
            // const br_tag = document.createElement("br");
            var result_box = document.createElement("div");
            result_box.classList.add("result-box");

            var result_details = document.createElement("div");
            result_details.classList.add("result-details");

            var title1 = document.createElement("h2");
            title1.innerHTML = title;
            title1.classList.add("result-title");

            var year_genres = document.createElement("p");
            year_genres.innerHTML = year + " | " + genres;
            year_genres.classList.add("year-genre");

            var rating3 = document.createElement("p");
            rating3.innerHTML = '<span style="color:red">' + '&#9733; ' + rating2 + '/5' + "</span>" + " &nbsp;" + vote_count + " votes";
            rating3.classList.add("votes");

            // var vote_count1 = document.createElement("p");
            // vote_count1.innerHTML = vote_count + " votes";
            // vote_count1.classList.add("votes");

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
            result_details.append(
              title1,
              year_genres,
              rating3,
              // vote_count1,
              desc1,
              showMore
            );

            result_box.append(poster, result_details, modal);
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
        }
      }
    } else {
      console.log("ready state " + this.readyState);
    }
  };
  req.open("POST", "/", true);
  console.log("Sending request");
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
