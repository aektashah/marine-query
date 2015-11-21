""" 
    Runs the server and parsers API requests 
"""
from os import urandom

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.superadmin import Admin
from flask.ext.restful import Api

from models import Device, Reading
from database import db_session
from api import DeviceResource, ReadingResource 
from admin import HomeView

# App configuration
app = Flask(__name__, static_url_path='', static_folder='../static')
app.config["SECRET_KEY"] = urandom(24)

# API configuration
api = Api(app)
api.add_resource(ReadingResource, "/api/reading")
api.add_resource(DeviceResource, "/api/dev/<string:site_name>")

# Admin configuration
admin = Admin(index_view=HomeView("Helmuth"))
admin.register(Device, session=db_session)
admin.register(Reading, session=db_session)
admin.init_app(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
