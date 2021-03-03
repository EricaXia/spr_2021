import requests
import json
import pprint
from random import randint
from .settings import api_key
# from settings import api_key
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
    movie_image_endpath = movie['backdrop_path']
    movie_text = f"{movie_title} ({movie_year})"
    # movie_image_path = f"https://image.tmdb.org/t/p/w500{movie_image_endpath}"
    movie_image_path = f"https://image.tmdb.org/t/p/w780{movie_image_endpath}"

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
    show_image_endpath = show['backdrop_path']
    # show_image_path = f"https://image.tmdb.org/t/p/w500{show_image_endpath}"
    show_image_path = f"https://image.tmdb.org/t/p/w780{show_image_endpath}"
    return (show_text, show_image_path)

## Part 2: Search Feature
def search_for_movie(api_key, search_query, page=1):
    search_query_f = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&language=en-US&query={search_query_f}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    # array of movie dicts
    movie_results = r_data['results']
    if movie_results:
        return movie_results  # returns a dict of movie details
    else:
        return "No results found."


def search_for_tv_show(api_key, search_query, page=1):
    search_query = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/tv?api_key={api_key}&language=en-US&query={search_query}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    tv_show_results = r_data['results']
    if tv_show_results:
        return tv_show_results
    else:
        return "No results found."


def search_for_movie_and_tv_show(api_key, search_query, page=1):
    search_query = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/multi?api_key={api_key}&language=en-US&query={search_query}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    all_results = r_data['results']
    if all_results:
        return all_results
    else:
        return "No results found."

def get_movie_data(api_key, movie_id, page=1):
    # details of movie
    url_details = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)  # dict of movie details
    ## get tmdb url
    movie_name = r1_data['title'].lower().replace(' ', '-')
    r1_data['tmdb_url'] = f"https://www.themoviedb.org/movie/{movie_id}-{movie_name}"
    ## get genres
    r1_data['genre_names'] = [g['name'] for g in r1_data['genres']]
    # get lang names
    r1_data['spoken_language_names'] = [l['english_name'] for l in r1_data['spoken_languages']]

    ## credits (cast)
    url_credits = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}&language=en-US"
    r2 = requests.get(url_credits)
    r2_data = json.loads(r2.text)
    # cast_details = r2_data['cast']  # list of cast members
    r1_data['cast_details'] = r2_data['cast']

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
    r1_data['spoken_language_names'] = [l['english_name'] for l in r1_data['spoken_languages']]

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

    # return details dict, cast members list, and reviews list
    return r1_data

# return info for one cast member
def get_actor_details(cast_dict):
    actor = {
        'real_name': cast_dict['name'],
        'role_name': cast_dict['character'],
        'image_path': f"https://image.tmdb.org/t/p/w500{cast_dict['profile_path']}"
    }
    return actor

# return info for one review

def get_review_details(review_dict):
    # use created_at for the review date
    review_date1 = datetime.strptime(review_dict['created_at'], "%Y-%m-%dT%H:%M:%S.%f%z")
    review_date2 = review_date1.strftime("%m/%d/%Y")
    # convert to rating out of 5
    rating = round(review_dict['author_details']['rating'] / 2, 1)
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
    # print(res)


    print("Search for a movie")
    # movie1 = search_for_movie(api_key, 'the dark knight')[0]
    # movie1 = search_for_movie(api_key, 'toy story 4')[0]
    movie1 = search_for_movie(api_key, 'the shawshank redemption')[0]
    # movie1 = search_for_movie(api_key, 'asdsafasgdfhfd')
    pprint.pprint(movie1)
    movie1details = get_movie_data(api_key, movie1['id'])
    pprint.pprint(movie1details)
    # pprint.pprint(movie1reviews)
    # actor1 = movie1cast[0]
    # print(get_actor_details(actor1))
    # review1 = get_review_details(movie1reviews[2])
    # pprint.pprint(review1)

    # print("Search for a TV Show")
    # res1 = search_for_tv_show(api_key, 'riverdale')[0]
    # res1_details, res1_cast, res1_reviews = get_tv_show_data(api_key, res1['id'])
    # pprint.pprint(res1_details)
    # actor1 = res1_cast[1]
    # print(get_actor_details(actor1))

