from flask import Blueprint, render_template, Flask, request, make_response, redirect, url_for
import requests
import json
from .api_calls import *
from .settings import api_key
from werkzeug.exceptions import Forbidden, HTTPException, NotFound, RequestTimeout, Unauthorized

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
# app.debug = True

# Main page


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        keyword = request.form.get("query", False)
        category = request.form.get("query2", False)
        item_id = request.form.get("item_id", False)
        item_type = request.form.get("item_type", False)

        # When search query is entered
        if keyword and category:  
            if category == "movies":
                # returns list of 20 results
                final_results = search_for_movies(api_key, keyword, 1)
            elif category == "tv-shows":
                final_results = search_for_tv_shows(api_key, keyword, 1)
            elif category == "movies-and-tv-shows":
                final_results = search_for_movies_and_shows(api_key, keyword, 1)
            return final_results

        ## Show Modal Box details when Show More is clicked
        if item_id and item_type: 
            if item_type == "movie":
                # print('movie with id', item_id)
                movie = get_movie_data(api_key, item_id)
                movie['cast_details'] = [get_actor_details(cast_dict) for cast_dict in movie['cast']]
                movie['review_details'] = [get_review_details(review_dict) for review_dict in movie['reviews']]
                movie['is_detail'] = True
                return movie

            elif item_type == "tv":
                show = get_tv_show_data(api_key, item_id)
                show['cast_details'] = [get_actor_details(cast_dict) for cast_dict in show['cast']]
                show['review_details'] = [get_review_details(review_dict) for review_dict in show['reviews']]
                show['is_detail'] = True
                return show

            

    ## Homepage display
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

@app.errorhandler(NotFound)
def page_not_found_handler(e: HTTPException):
    return render_template('404.html'), 404


@app.errorhandler(Unauthorized)
def unauthorized_handler(e: HTTPException):
    return render_template('401.html'), 401


@app.errorhandler(Forbidden)
def forbidden_handler(e: HTTPException):
    return render_template('403.html'), 403


@app.errorhandler(RequestTimeout)
def request_timeout_handler(e: HTTPException):
    return render_template('408.html'), 408

if __name__ == "__main__":
    app.run()
