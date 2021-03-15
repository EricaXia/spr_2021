import requests
import json
import pprint
from random import randint
from .settings import api_key
# from settings import api_key  # use this to test if name == __main__
from datetime import datetime

# base_url = "https://api.themoviedb.org/3/"

# Part 1. Get Trending Movies this WEEK


def get_trending_movie(api_key=api_key, page=1):  # always gets first page for now
    media_type = "movie"
    time_window = "week"
    url = f"https://api.themoviedb.org/3/trending/{media_type}/{time_window}?api_key={api_key}&page={page}"
    r1 = requests.get(url)
    r1_data = json.loads(r1.text)
    idx = randint(0, 19)
    movie = r1_data['results'][idx]
    movie_title = movie['title']
    movie_date = movie['release_date']
    movie_year = movie_date.split('-')[0]
    if movie['backdrop_path'] == None:
        movie_image_path = "/static/images/movie-placeholder.jpg"
    else:
        # movie_image_endpath = movie['backdrop_path']
        movie_image_path = f"https://image.tmdb.org/t/p/w780{movie['backdrop_path']}"

    movie_text = f"{movie_title} ({movie_year})"

    return (movie_text, movie_image_path)


def get_tv_show_airing_today(api_key=api_key, page=1):
    url = f"https://api.themoviedb.org/3/tv/airing_today?api_key={api_key}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    idx = randint(0, 19)
    show = r_data['results'][idx]
    show_title = show['name']
    show_year = show['first_air_date'].split('-')[0]
    show_text = f"{show_title} ({show_year})"
    if show['backdrop_path'] == None:
        show_image_path = "/static/images/movie-placeholder.jpg"
    else:
        show_image_path = f"https://image.tmdb.org/t/p/w780{show['backdrop_path']}"
    return (show_text, show_image_path)

# Part 2: Search Feature

# display search result details of one movie


def display_one_movie_result(api_key, movie_id):
    url_details = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)  # dict of movie details
    # get genres
    r1_data['genre_names'] = [g['name'] for g in r1_data['genres']]
    # get lang names
    r1_data['spoken_language_names'] = [l['english_name']
                                        for l in r1_data['spoken_languages']]
    if r1_data['release_date']:
        # year of release
        r1_data['year'] = r1_data['release_date'].split('-')[0]
    # rating out of 5 stars
    r1_data['stars'] = round(r1_data['vote_average'] / 2, 2)
    r1_data['item_type'] = "movie"
    return r1_data


def display_one_show_result(api_key, tv_id):
    # details of show (e.g. seasons)
    url_details = f"https://api.themoviedb.org/3/tv/{tv_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)  # dict of show details
    # get genres
    r1_data['genre_names'] = [g['name'] for g in r1_data['genres']]
    # get lang names
    r1_data['spoken_language_names'] = [l['english_name']
                                        for l in r1_data['spoken_languages']]
    if r1_data['first_air_date']:
        # year of release
        r1_data['year'] = r1_data['first_air_date'].split('-')[0]
    # rating out of 5
    r1_data['stars'] = round(r1_data['vote_average'] / 2, 2)
    # r1_data['title'] = r1_data['name']
    r1_data['title'] = r1_data.pop('name')
    r1_data['item_type'] = "tv-show"
    return r1_data


# search for movies and return dict of details for each result
def search_for_movies(api_key, search_query, page=1):
    search_query_f = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&language=en-US&query={search_query_f}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    # array of movie dicts
    if r_data['results']:
        results = r_data['results']
        final_results = {idx: display_one_movie_result(
            api_key, r['id']) for idx, r in enumerate(results)}
    else:
        final_results = {"error": "No results found."}
    return final_results


def search_for_tv_shows(api_key, search_query, page=1):
    search_query = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/tv?api_key={api_key}&language=en-US&query={search_query}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    results = r_data['results']
    if results:
        final_results = {idx: display_one_show_result(
            api_key, r['id']) for idx, r in enumerate(results)}
    else:
        final_results = {"error": "No results found."}
    return final_results


## TODO: fix "AttributeError: 'NoneType' object has no attribute 'split'"
def search_for_movies_and_shows(api_key, search_query, page=1):
    search_query = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/multi?api_key={api_key}&language=en-US&query={search_query}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    final_results = {}
    if r_data['results']:
        results = r_data['results']
        for idx, r in enumerate(results):
            if r['media_type'] == 'movie':
                movie_dict = display_one_movie_result(api_key, r['id'])
                final_results[idx] = movie_dict
            elif r['media_type'] == 'tv':
                tv_dict = display_one_show_result(api_key, r['id'])
                final_results[idx] = tv_dict
    else:
        final_results = {"error": "No results found."}
    return final_results


def get_movie_data(api_key, movie_id, page=1):
    # details of one movie
    url_details = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)  # dict of movie details
    # get tmdb url
    movie_name = r1_data['title'].lower().replace(' ', '-')
    r1_data['tmdb_url'] = f"https://www.themoviedb.org/movie/{movie_id}-{movie_name}"
    # get genres
    r1_data['genre_names'] = [g['name'] for g in r1_data['genres']]
    # get lang names
    r1_data['spoken_language_names'] = [l['english_name']
                                        for l in r1_data['spoken_languages']]
    # year of release
    r1_data['year'] = r1_data['release_date'].split('-')[0]
    # rating out of 5 stars
    r1_data['stars'] = round(r1_data['vote_average']/2, 2)

    ## credits (cast)
    url_credits = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}&language=en-US"
    r2 = requests.get(url_credits)
    r2_data = json.loads(r2.text)
    # cast_details = r2_data['cast']  # list of cast members
    r1_data['cast'] = r2_data['cast']

    # reviews
    url_reviews = f"https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={api_key}&language=en-US&page={page}"
    r3 = requests.get(url_reviews)
    r3_data = json.loads(r3.text)
    # reviews = r3_data['results']  # list of reviews
    r1_data['reviews'] = r3_data['results']

    # return details dict
    return r1_data


def get_tv_show_data(api_key, tv_id, page=1):
    # details of show (e.g. seasons)
    url_details = f"https://api.themoviedb.org/3/tv/{tv_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)  # dict of show details
    # get tmdb url
    tv_name = r1_data['name'].lower().replace(' ', '-')
    r1_data['tmdb_url'] = f"https://www.themoviedb.org/tv/{tv_id}-{tv_name}"
    # get genres
    r1_data['genre_names'] = [g['name'] for g in r1_data['genres']]
    # get lang names
    r1_data['spoken_language_names'] = [l['english_name']
                                        for l in r1_data['spoken_languages']]
    # year of release
    r1_data['year'] = r1_data['first_air_date'].split('-')[0]
    # rating out of 5
    r1_data['stars'] = round(r1_data['vote_average']/2, 2)

    ## credits (cast)
    url_credits = f"https://api.themoviedb.org/3/tv/{tv_id}/credits?api_key={api_key}&language=en-US"
    r2 = requests.get(url_credits)
    r2_data = json.loads(r2.text)
    # cast_details = r2_data['cast']  # list of cast members
    r1_data['cast_details'] = r2_data['cast']

    # reviews
    url_reviews = f"https://api.themoviedb.org/3/tv/{tv_id}/reviews?api_key={api_key}&language=en-US&page={page}"
    r3 = requests.get(url_reviews)
    r3_data = json.loads(r3.text)
    # reviews = r3_data['results']  # list of reviews
    r1_data['reviews'] = r3_data['results']

    # rename 'name' key to 'title' so search results display consistently
    r1_data['title'] = r1_data.pop('name')
    # return details dict, cast members list, and reviews list
    return r1_data

# return info for one cast member


def get_actor_details(cast_dict):
    if cast_dict['profile_path']:
        image_path = f"https://image.tmdb.org/t/p/w500{cast_dict['profile_path']}"
    else:
        image_path = None
    actor = {
        'real_name': cast_dict['name'],
        'role_name': cast_dict['character'],
        'image_path': image_path
    }
    return actor

# return info for one review


def get_review_details(review_dict):
    # use created_at for the review date
    review_date1 = datetime.strptime(
        review_dict['created_at'], "%Y-%m-%dT%H:%M:%S.%f%z")
    review_date2 = review_date1.strftime("%m/%d/%Y")
    # convert to rating out of 5
    if review_dict['author_details']['rating']:
        rating = round(review_dict['author_details']['rating'] / 2, 1)
    else:
        rating = None
    review = {
        'reviewer': review_dict['author'],
        'review_date': review_date2,
        'rating': rating,
        'review_text': review_dict['content']
    }
    return review


if __name__ == "__main__":
    # movie_text, movie_image_path = get_trending_movie()
    # res = get_tv_show_airing_today(api_key=api_key, page=1)
    # print(res)
    # pprint.pprint(search_for_movie(api_key=api_key, search_query='batman'))
    # search_for_tv_show(api_key, 'the office')
    # pprint.pprint(search_for_movie_and_tv_show(api_key, 'the office'))
    # res = search_for_movie(api_key, 'dawsfsergertdshgrtfh')

    # # Get Trending Movie
    # movies = {}
    # for i in range(5):
    #     text, img_path = get_trending_movie(
    #         api_key=api_key, page=1)
    #     movies[i] = [text, img_path]
    # # Get TV Show Airing Today
    # tv_texts = []
    # tv_image_paths = []
    # for i in range(5):
    #     text, img_path = get_tv_show_airing_today(api_key=api_key)
    #     tv_texts.append(text)
    #     tv_image_paths.append(img_path)

    # # print(movie_image_paths[0])
    # # print(tv_texts[0])

    # item_id = 615643
    # res = get_movie_data(api_key, item_id, 1)
    # pprint.pprint(res)
    # res = search_for_movies(api_key, "the dark knight", page=1)
    # pprint.pprint(res)

    # q = "minari"
    # res = search_for_movies(api_key, q)
    # res1 = res[0]
    # # pprint.pprint(res1.keys())
    # pprint.pprint(res1)
    
    res = get_tv_show_data(api_key, 2316)
    pprint.pprint(res)
    res2 = get_actor_details(res['cast_details'])
    pprint.pprint(res2)