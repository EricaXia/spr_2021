""" 
API Tests
DOCS Here https://developers.themoviedb.org/3/getting-started
-----------
API Sample:
https://api.themoviedb.org/3/trending/{media_type}/{time_window}?api_key=<<api_key>>

This API endpoint has three parameters that we have to supply to construct the request URL:

1. media_type- this is the type of media for which we want trending items- use movie.

2. time_window- this is the time window within which we want trending items- use week.

3. api_key - this is the API KEY that you create 

-------

Types of API calls to make
1. Get trending movies
2. Get TV Shows on air showing now
3. Get movie or show full details

 """
import requests
import json
import pprint
from random import randint

## my TMDB api key
api_key = "a0f44b5888d8f94e608f47c1eb5575a4"

base_url = "https://api.themoviedb.org/3/"

## Part 1. Get Trending Movies this WEEK
def get_trending_movie(page=1): # always gets first page for now
    media_type = "movie"
    time_window = "week"
    url = f"https://api.themoviedb.org/3/trending/{media_type}/{time_window}?api_key={api_key}&page={page}"
    r1 = requests.get(url)
    r1_data = json.loads(r1.text)
    # print('Total Results:', r1_data['total_results'])
    # print(len(r1_data['results']))

    ## 'results' is an array of dicts, each dict is a movie's info
    # pprint.pprint(r1_data['results'])

    ## Try getting one 
    idx = randint(0, 20)
    movie = r1_data['results'][idx]
    # pprint.pprint(movie)

    movie_title = movie['title']
    movie_date = movie['release_date']
    movie_year = movie_date.split('-')[0]
    movie_image_endpath = movie['backdrop_path']

    movie_text = f"{movie_title} ({movie_year})"
    movie_image_path = f"https://image.tmdb.org/t/p/w500{movie_image_endpath}"

    return (movie_text, movie_image_path)
