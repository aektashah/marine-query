""" 
    Runs the server and parsers API requests 
"""
import os

from flask import Flask
from flask.ext.security import Security, SQLAlchemyUserDatastore, login_required
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.superadmin import Admin

from models import Device, Reading, User, Role
from database import db_session, SQLALCHEMY_DATABASE_URI
from api import MultiApi, DeviceResource, ReadingResource 
from admin import HomeView, AuthModelView, UploadView

# App configuration
app = Flask(__name__, static_url_path='', static_folder='../static')
app.config["SECRET_KEY"] = os.urandom(24)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.add_url_rule("/", "root", lambda: app.send_static_file("index.html"))

# API configuration
api = MultiApi(app)
api.add_resource(ReadingResource, "/api/reading/")
api.add_resource(DeviceResource, "/api/dev/")

# Admin and Security configuration
admin = Admin(index_view=HomeView("Helmuth"))
admin.register(Device, AuthModelView, session=db_session)
admin.register(Reading, AuthModelView, session=db_session)
admin.register(User, AuthModelView, session=db_session)
admin.add_view(UploadView(name="upload"))
admin.init_app(app)
db = SQLAlchemy(app)
user_datastore = SQLAlchemyUserDatastore(db, User, Role) 
security = Security(app, user_datastore)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6969, debug=True)
