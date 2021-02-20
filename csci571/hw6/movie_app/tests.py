import requests
import json

api_key = 'a0f44b5888d8f94e608f47c1eb5575a4' 
# write any relevant py code here
url = f'https://api.themoviedb.org/3/movie/550?api_key={api_key}'
r = requests.get(url)
r_data = json.loads(r.text)

print(r_data)
print(type(r_data))
print(r_data.keys())