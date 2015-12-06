from datetime import datetime
import os
import unittest

from flask.ext.testing import LiveServerTestCase, TestCase
from requests import get, post

os.environ["TESTING"] = "true"
print "about to import"
from server import app
from models import Device, Reading
from database import make_db_utils, init_db
print "finished importing"

engine, db_session, Base = make_db_utils()

class ApiTest(LiveServerTestCase):
    def create_app(self):
        app.config["TESTING"] = True
        app.config["LIVESERVER_PORT"] = 3498
        return app

    def setUp(self):
        Device.metadata.create_all(bind=engine)
        Reading.metadata.create_all(bind=engine)
        d = Device(id="TESTDEV", site="Test", field_lat=10, field_lon=5, location="TestLand")
        rs = [Reading(device=d.id, date=datetime.now(), reading=i) for i in range(100)]
        db_session.add(d)
        db_session.commit()
        for r in rs:
            db_session.add(r)
        db_session.commit()


    def tearDown(self):
        Reading.__table__.drop(engine)
        Device.__table__.drop(engine)

    def test_dev_api(self):
        devs = get(self.get_server_url() + "/api/dev").json()
        self.assertEqual(devs, map(Device.to_json, Device.query.all()))

if __name__ == "__main__":
    unittest.main()
