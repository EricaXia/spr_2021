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
        final_results = {}

        if category == "movies":
            # returns list of 20 results
            results = search_for_movie(api_key, keyword, 1)
            for idx, r in enumerate(results):
                res_id = r['id']
                movie_dict = get_movie_data(api_key, res_id)
                final_results[idx] = movie_dict
            return final_results

        elif category == "tv-shows":
            results = search_for_tv_show(api_key, keyword, 1)

                
        elif category == "movies-and-tv-shows":
            results = search_for_movie_and_tv_show(api_key, keyword, 1)

                
        # res_string = "\n".join(res_str_l)
        # res_dict = json.dumps(results)
        return final_results

    # Get Trending Movie
    movie_text, movie_image_path = get_trending_movie(api_key=api_key, page=1)

    # Get TV Show Airing Today
    show_text, show_image_path = get_tv_show_airing_today(api_key=api_key)

    return render_template('index.html', movie_text=movie_text, movie_image_path=movie_image_path, show_text=show_text, show_image_path=show_image_path)


if __name__ == "__main__":
    app.run()
