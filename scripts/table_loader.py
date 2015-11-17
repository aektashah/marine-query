from models import Device, Reading
from database import db_session
from os.path import expanduser

def parse(txt, proc=lambda x: x):
    return proc(txt) if (txt != "N/A" and txt != "") else None


def load_devices():
    ids = set()
    for line in open(expanduser("~/device_data.csv")):
        row = line.strip().split("\t") 
        id = row[0]
        site = row[1]
        field_lat = float(row[2])
        field_lon = float(row[3])
        location = row[4]
        state_province = row[5]
        country = row[6]
        biomimic = row[7]
        zone = parse(row[8])
        sub_zone = parse(row[9])
        wave_exp = parse(row[10])
        try: 
            tide_height = parse(row[11], proc=float) 
        except IndexError:
            tide_height = None
        if id not in ids:
            d = Device(id, site, field_lat, field_lon, location, state_province,
                    country, biomimic, zone, sub_zone, wave_exp, tide_height)
            db_session.add(d)
            ids.add(id)

    db_session.commit()

def load_readings():
    ids = set()
    for line in open(expanduser("~/device_data.csv")):
        row = line.strip().split("\t") 
        ids.add(row[0])
    for line in open(expanduser("~/robomussel_raw/big_file.txt")): 
        dev_id, date, reading = line.strip().split(",")
        if dev_id in ids:
            r = Reading(dev_id, date, float(reading))
            db_session.add(r)
    db_session.commit()

load_readings()
