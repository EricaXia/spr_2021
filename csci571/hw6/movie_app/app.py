from flask import Blueprint, render_template, Flask, request, make_response, redirect, url_for
import requests
import json

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.debug = True

# Main page


@app.route('/', methods=['GET', 'POST'])
def index():
    # if request.method == "POST":
    #     query = request.form.get("query", False)
    #     return "Hello from Flask! You typed " + str(query)

    

    return render_template('index.html')


if __name__ == "__main__":
    app.run()
