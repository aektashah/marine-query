"""
    Provides the objects necessary to customize the administrative
    interface, and manipulate the database through a GUI
"""
from flask.ext.superadmin import AdminIndexView, expose

class HomeView(AdminIndexView):
    @expose("/")
    def index(self):
        return self.render("index.html")
