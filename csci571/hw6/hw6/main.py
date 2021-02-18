from flask import Blueprint, render_template, Flask, request, make_response, redirect, url_for

# main = Blueprint('main', __name__)

app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'


# Main page
# @main.route('/', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def index():
    # write any relevant py code here
    return render_template('index.html')
