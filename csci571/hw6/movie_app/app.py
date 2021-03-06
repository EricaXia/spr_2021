from flask import Blueprint, render_template, Flask, request, make_response, redirect, url_for
import requests
import json
from .api_calls import *
from .settings import api_key

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.debug = True

# Main page


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        keyword = request.form.get("query", False)
        category = request.form.get("query2", False)

    # TODO: call get movie/show details for the modal boxes
        if category == "movies":
            # returns list of 20 results
            final_results = search_for_movies(api_key, keyword, 1)

        elif category == "tv-shows":
            final_results = search_for_tv_shows(api_key, keyword, 1)

        elif category == "movies-and-tv-shows":
            final_results = search_for_movies_and_shows(api_key, keyword, 1)

        return final_results

    # Get Trending Movie
    movies = {}
    for i in range(5):
        text, img_path = get_trending_movie(
            api_key=api_key, page=1)
        movies[i] = [text, img_path]

    # # Get TV Show Airing Today
    tv_shows = {}
    for i in range(5):
        text, img_path = get_tv_show_airing_today(api_key=api_key)
        tv_shows[i] = [text, img_path]

    return render_template('index.html', movies=movies, tv_shows=tv_shows)


if __name__ == "__main__":
    app.run()
