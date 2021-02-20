from flask import Flask 
from .main import main

def create_app(config_object='movie_app.settings'):
    ## initialize Flask app
    app = Flask(__name__)
    ## load config file
    app.config.from_object(config_object)

    app.register_blueprint(main)
    return app