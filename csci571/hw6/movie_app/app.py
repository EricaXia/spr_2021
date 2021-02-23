from flask import Blueprint, render_template, Flask, request, make_response, redirect, url_for
import requests
import json

app = Flask(__name__)
app.debug = True

# Main page


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        query = request.form["query"]
        return "Hello from Flask! You typed " + query

    # api_key = 'a0f44b5888d8f94e608f47c1eb5575a4'
    # url = f'https://api.themoviedb.org/3/movie/550?api_key={api_key}'
    # r = requests.get(url)
    # r_data = json.loads(r.text)
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
