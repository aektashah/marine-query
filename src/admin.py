"""
    Provides the objects necessary to customize the administrative
    interface, and manipulate the database through a GUI
"""
from flask import request
from flask.ext.security import current_user, login_required
from flask.ext.superadmin import AdminIndexView, BaseView, model, expose
from werkzeug import secure_filename

from models import Device, Reading

class AuthMixin:
    """ Mixin which restricts a view to logged in users """
    def is_accessible(self):
        return True
        # return current_user.is_authenticated()


class HomeView(AdminIndexView):
    """ Home page """
    @expose("/")
    @login_required
    def index(self):
        return self.render("index.html")

class UploadView(AuthMixin, BaseView):
    @expose("/")
    def index(self):
        devices = Device.query.with_entities(Device.id).all()
        devices = map(lambda (arg,): arg, devices)
        return self.render("upload.html", uploader=self.upload, devs=devices)

    @expose("/upload_data/", methods=("GET", "POST"))
    def upload(self):
        if request.method == "POST":
            data = request.files["data"]
        return "hello" 

# Subclass of a model view which requires authentication
class AuthModelView(AuthMixin, model.ModelAdmin):

    @expose('/add/', methods=('GET', 'POST'))
    def add(self):
        return super(AuthModelView, self).add()

