from datetime import datetime
import json
import os
import unittest

from flask.ext.testing import LiveServerTestCase, TestCase
from selenium.webdriver import PhantomJS
from selenium.webdriver.common.keys import Keys

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

def json_to_unicode(json):
    for dev in json:
        for key, value in dev.iteritems():
            if isinstance(value, str):
                dev[key] = unicode(value)

class ApiTest(LiveServerTestCase):
    def create_app(self):
        app.config["testing"] = true
        app.config["liveserver_port"] = 3498
        return app

    def test_dev_api(self):
        devs = self.app.test_client().get(self.get_server_url() + "/api/dev/")
        devs = json.loads(devs.data)
        should_be = map(Device.to_json, Device.query.all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)


class IntegrationTesting(LiveServerTestCase):
    def create_app(self):
        app.config["testing"] = true
        app.config["liveserver_port"] = 3498
        self.client = PhantomJS()
        return app

    def test_generate(self):
        self.client.get(self.get_server_url())
        self.client.find_element_by_id("nav-expander").click()



if __name__ == "__main__":
    destroy_db()
    init_db()
    unittest.main()
    destroy_db()
