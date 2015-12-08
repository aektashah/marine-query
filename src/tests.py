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
    # device for testing all specific fields
    d = Device(id="TESTDEV", site="Test", field_lat=10, field_lon=5, location="TestLand")
    rs = [Reading(device=d.id, date=datetime.now(), reading=i) for i in range(100)]
    # device for testing country filter
    d2 = Device(id="TESTDEV2", site="Test2", field_lat=2, field_lon=2, location="TestLand2", state_province="Test2", country="UnitedTestsOfAmerica")
    rs2 = [Reading(device=d2.id, date=datetime.now(), reading=2)]
    d21 = Device(id="TESTDEV21", site="Test21", field_lat=21, field_lon=21, location="TestLand21", state_province="Test21", country="UnitedTestsOfAmericaLOL")
    rs21 = [Reading(device=d21.id, date=datetime.now(), reading=21)]
    # device for testing state_province filter
    d3 = Device(id="TESTDEV3", site="Test3", field_lat=3, field_lon=3, location="TestLand3", state_province="Test3")
    rs3 = [Reading(device=d3.id, date=datetime.now(), reading=3)]
    d31 = Device(id="TESTDEV31", site="Test31", field_lat=31, field_lon=31, location="TestLand31", state_province="Test31")
    rs31 = [Reading(device=d31.id, date=datetime.now(), reading=31)]
    # device for testing location filter
    d4 = Device(id="TESTDEV4", site="Test4", field_lat=4, field_lon=4, location="TestLand4", state_province="Test4")
    rs4 = [Reading(device=d4.id, date=datetime.now(), reading=4)]
    d41 = Device(id="TESTDEV41", site="Test41", field_lat=41, field_lon=41, location="TestLand41", state_province="Test41")
    rs41 = [Reading(device=d41.id, date=datetime.now(), reading=41)]
    # device for testing wave_exp filter
    d5 = Device(id="TESTDEV5", site="Test5", field_lat=5, field_lon=5, location="TestLand5", state_province="Test5", wave_exp="10")
    rs5 = [Reading(device=d5.id, date=datetime.now(), reading=5)]
    d51 = Device(id="TESTDEV51", site="Test51", field_lat=51, field_lon=51, location="TestLand51", state_province="Test51", wave_exp="1000")
    rs51 = [Reading(device=d51.id, date=datetime.now(), reading=51)]
    # device for testing device filter
    d6 = Device(id="TESTDEV6", site="Test6", field_lat=6, field_lon=6, location="TestLand6")
    rs6 = [Reading(device=d6.id, date=datetime.now(), reading=6)]
    d61 = Device(id="TESTDEV61", site="Test61", field_lat=61, field_lon=61, location="TestLand61")
    rs61 = [Reading(device=d61.id, date=datetime.now(), reading=61)]
    # device for testing zone filter
    d7 = Device(id="TESTDEV7", site="Test7", field_lat=7, field_lon=7, location="TestLand7", zone="TestZone")
    rs7 = [Reading(device=d7.id, date=datetime.now(), reading=7)]
    d71 = Device(id="TESTDEV71", site="Test71", field_lat=71, field_lon=71, location="TestLand71", zone="TwilightTestZone")
    rs71 = [Reading(device=d71.id, date=datetime.now(), reading=71)]
    # device for testing sub_zone filter
    d8 = Device(id="TESTDEV8", site="Test8", field_lat=8, field_lon=8, location="TestLand8", sub_zone="TestSubzone")
    rs8 = [Reading(device=d8.id, date=datetime.now(), reading=8)]
    d81 = Device(id="TESTDEV81", site="Test81", field_lat=81, field_lon=81, location="TestLand81", sub_zone="TwilightTestSubzone")
    rs81 = [Reading(device=d81.id, date=datetime.now(), reading=81)]

    db_session.add(d)
    db_session.add(d2)
    db_session.add(d21)
    db_session.add(d3)
    db_session.add(d31)
    db_session.add(d4)
    db_session.add(d41)
    db_session.add(d5)
    db_session.add(d51)
    db_session.add(d6)
    db_session.add(d61)
    db_session.add(d7)
    db_session.add(d71)
    db_session.add(d8)
    db_session.add(d81)

    db_session.commit()
    for r in rs:
        db_session.add(r)
    for r in rs2:
        db_session.add(r)
    for r in rs21:
        db_session.add(r)
    for r in rs3:
        db_session.add(r)
    for r in rs31:
        db_session.add(r)
    for r in rs4:
        db_session.add(r)
    for r in rs41:
        db_session.add(r)
    for r in rs5:
        db_session.add(r)
    for r in rs51:
        db_session.add(r)
    for r in rs6:
        db_session.add(r)
    for r in rs61:
        db_session.add(r)
    for r in rs7:
        db_session.add(r)
    for r in rs71:
        db_session.add(r)
    for r in rs8:
        db_session.add(r)
    for r in rs81:
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
        app.config["TESTING"] = True
        app.config["LIVESERVER_PORT"] = 3498
        return app
    # test ensuring all specified fields are the same
    def test_dev_api(self):
        devs = self.app.test_client().get(self.get_server_url() + "/api/dev/")
        devs = json.loads(devs.data)
        should_be = map(Device.to_json, Device.query.all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    # tests for country filter
    def test_dev_api2(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?country=UnitedTestsOfAmerica')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.country=="UnitedTestsOfAmerica").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api21(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?country=UnitedTestsOfAmericaLOL')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.country=="UnitedTestsOfAmericaLOL").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)    
    # tests for state_province filter
    def test_dev_api3(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?state_province=Test3')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.state_province=="Test3").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api31(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?state_province=Test31')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.state_province=="Test31").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)    
    # tests for location filter
    def test_dev_api4(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?location=TestLand4')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.location=="TestLand4").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api41(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?location=TestLand41')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.location=="TestLand41").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    # tests for wave_exp filter
    def test_dev_api5(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?wave_exp=10')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.wave_exp=="10").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api51(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?wave_exp=1000')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.wave_exp=="1000").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    # tests for device filter
    def test_dev_api6(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/dev/?device=TESTDEV6')
        devs = json.loads(devs.data)
        should_be = map(Device.to_json, Device.query.filter(Reading.device=="TESTDEV6").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api61(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/dev/?device=TESTDEV61')
        devs = json.loads(devs.data)
        should_be = map(Device.to_json, Device.query.filter(Reading.device=="TESTDEV61").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    # tests for zone filter
    def test_dev_api7(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?zone=TestZone')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.zone=="TestZone").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api71(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?zone=TwilightTestZone')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.zone=="TwilightTestZone").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    # tests for sub_zone filter
    def test_dev_api8(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?sub_zone=TestSubzone')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.sub_zone=="TestSubzone").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)
    def test_dev_api81(self):
        devs = self.app.test_client().get(self.get_server_url() + '/api/reading/?sub_zone=TwilightTestSubzone')
        devs = json.loads(devs.data)
        should_be = map(Reading.to_json, Reading.query.filter(Device.sub_zone=="TwilightTestSubzone").all())
        json_to_unicode(should_be)
        self.assertEqual(devs, should_be)

if __name__ == "__main__":
    destroy_db()
    init_db()
    unittest.main()
    destroy_db()
