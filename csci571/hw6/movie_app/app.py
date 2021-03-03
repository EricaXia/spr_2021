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
        # print(keyword)
        category = request.form.get("query2", False)
        # return "Hello from Flask! You typed " + str(keyword) + " with category " + str(category)
        if category == "movies":
            results = search_for_movie(api_key, keyword, 1)
        elif category == "tv-shows":
            results = search_for_tv_show(api_key, keyword, 1)
        elif category == "movies-and-tv-shows":
            results = search_for_movie_and_tv_show(api_key, keyword, 1)
        res_str_l = [json.dumps(res) for res in results]
        res_string = "\n".join(res_str_l)
        # return results[0]  # returns first result 
        return res_string


    # Get Trending Movie
    movie_text, movie_image_path = get_trending_movie(api_key=api_key, page=1)

    # Get TV Show Airing Today
    show_text, show_image_path = get_tv_show_airing_today(api_key=api_key)

    return render_template('index.html', movie_text=movie_text, movie_image_path=movie_image_path, show_text=show_text, show_image_path=show_image_path)


if __name__ == "__main__":
    app.run()
