from flask import Blueprint, render_template, Flask, request, make_response, redirect, url_for
import requests

# main = Blueprint('main', __name__)

app = Flask(__name__)

# Main page
# @main.route('/', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def index():
    api_key = 'a0f44b5888d8f94e608f47c1eb5575a4' 
    # write any relevant py code here
    url = f'https://api.themoviedb.org/3/movie/550?api_key={api_key}'
    r = requests.get(url)
    return render_template('index.html', content=r.content)
