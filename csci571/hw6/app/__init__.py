from flask import Flask 
from .app import app

def create_app(config_object='app.settings'):
    ## initialize Flask app
    app = Flask(__name__)
    ## load config file
    app.config.from_object(config_object)

    return app