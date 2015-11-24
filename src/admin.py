"""
    Provides the objects necessary to customize the administrative
    interface, and manipulate the database through a GUI
"""
from flask.ext.security import current_user, login_required
from flask.ext.superadmin import AdminIndexView, BaseView, model, expose

class AuthMixin:
    """ Mixin which restricts a view to logged in users """
    def is_accessible(self):
        return current_user.is_authenticated()


class HomeView(AdminIndexView):
    """ Home page """
    @expose("/")
    @login_required
    def index(self):
        return self.render("index.html")


# Subclass of a model view which requires authentication
AuthModelView = type('AuthModelView', (AuthMixin, model.ModelAdmin), {})
