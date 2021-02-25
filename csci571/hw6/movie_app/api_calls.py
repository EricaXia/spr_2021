import requests
import json
import pprint
from random import randint
from settings import api_key

# base_url = "https://api.themoviedb.org/3/"


## Part 1. Get Trending Movies this WEEK
def get_trending_movie(api_key=api_key, page=1): # always gets first page for now
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
    movie_image_path = f"https://image.tmdb.org/t/p/w500{movie_image_endpath}"
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
    show_image_path = f"https://image.tmdb.org/t/p/w500{show_image_endpath}"
    return (show_text, show_image_path)

def search_for_movie(api_key, search_query, page=1):
    search_query_f = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&language=en-US&query={search_query_f}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    # array of movie dicts
    movie_results = r_data['results']
    return movie_results

def search_for_tv_show(api_key, search_query, page=1):
    search_query = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/tv?api_key={api_key}&language=en-US&query={search_query}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    tv_show_results = r_data['results']
    return tv_show_results

def search_for_movie_and_tv_show(api_key, search_query, page=1):
    search_query = search_query.replace(' ', '%20')
    url = f"https://api.themoviedb.org/3/search/multi?api_key={api_key}&language=en-US&query={search_query}&page={page}"
    r = requests.get(url)
    r_data = json.loads(r.text)
    # print(r_data.keys())
    # print(r_data['errors'])
    all_results = r_data['results']
    return all_results


## TODO: implement getting details
def get_movie_data(api_key, movie_id, page=1):
    ## details
    url_details = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)
    pprint.pprint(r1_data)
    ## credits (cast)
    # url_credits = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}&language=en-US"
    ## reviews
    # url_reviews = f"https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={api_key}&language=en-US&page=1"



def get_tv_show_data(api_key, tv_id, page=1):
    ## details
    url_details = f"https://api.themoviedb.org/3/tv/{tv_id}?api_key={api_key}&language=en-US"
    r1 = requests.get(url_details)
    r1_data = json.loads(r1.text)
    # pprint.pprint(r1_data)

    # pprint.pprint(r1_data.keys())

    ## credits (cast)
    url_credits = f"https://api.themoviedb.org/3/tv/{tv_id}/credits?api_key={api_key}&language=en-US"
    r2 = requests.get(url_credits)
    r2_data = json.loads(r2.text)

    ## reviews
    url_reviews = f"https://api.themoviedb.org/3/tv/{tv_id}/reviews?api_key={api_key}&language=en-US&page={page}"
    r3 = requests.get(url_reviews)
    r3_data = json.loads(r3.text)
    pprint.pprint(r3_data.keys())
    pprint.pprint(r3_data['results'])
    # details, credits, and reviews


    

    


def get_cast_member(api_key, person_id):
    url = f"https://api.themoviedb.org/3/person/{person_id}?api_key={api_key}&language=en-US"

    # returns image / other details of cast member



if __name__ == "__main__":
    # print(api_key)
    # movie_text, movie_image_path = get_trending_movie()
    # print(movie_text)
    # print(movie_image_path)
    # res = get_tv_show_airing_today(api_key=api_key, page=1)
    # print(res)
    # pprint.pprint(search_for_movie(api_key=api_key, search_query='batman'))
    # search_for_tv_show(api_key, 'the office')
    # pprint.pprint(search_for_movie_and_tv_show(api_key, 'the office'))
    res1 = search_for_tv_show(api_key, 'the office')[0]
    print(res1)
    get_tv_show_data(api_key, res1['id'])
