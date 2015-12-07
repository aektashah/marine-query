from datetime import datetime
import json
import os
import unittest

from flask.ext.testing import LiveServerTestCase, TestCase
from requests import get, post

os.environ["TESTING"] = "true"

from server import app
from models import Device, Reading
from database import make_db_utils, init_db

engine, db_session, Base = make_db_utils()

def init_db():
    Device.metadata.create_all(bind=engine)
    Reading.metadata.create_all(bind=engine)
    d = Device(id="TESTDEV", site="Test", field_lat=10, field_lon=5, location="TestLand")
    rs = [Reading(device=d.id, date=datetime.now(), reading=i) for i in range(100)]
    db_session.add(d)
    db_session.commit()
    for r in rs:
        db_session.add(r)
    db_session.commit()

def destroy_db():
    Reading.__table__.drop(engine)
    Device.__table__.drop(engine)

class ApiTest(LiveServerTestCase):
    def create_app(self):
        app.config["TESTING"] = True
        app.config["LIVESERVER_PORT"] = 3498
        return app

    def test_dev_api(self):
        devs = self.app.test_client().get(self.get_server_url() + "/api/dev/")
        devs = json.loads(devs.data)
        should_be = map(Device.to_json, Device.query.all())
        for dev in should_be:
            for key, value in dev.iteritems():
                if isinstance(value, str):
                    dev[key] = unicode(value)
        self.assertEqual(devs, should_be)

if __name__ == "__main__":
    destroy_db()
    init_db()
    unittest.main()
    destroy_db()
