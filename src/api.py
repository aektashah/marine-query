""" 
    Class based approach to RESTful API endpoints
"""
from datetime import datetime, timedelta

from flask import make_response
from flask.ext.restful import Api, Resource
from flask_restful.reqparse import RequestParser
from sqlalchemy import and_

from models import Reading, Device


class MultiApi(Api):
    """ restful.Api only supports JSON, so we subclass to handle CSV downloads """
    def __init__(self, *args, **kwargs):
        super(MultiApi, self).__init__(*args, **kwargs)
        self.representations["text/csv"] = MultiApi.output_csv

    @staticmethod
    def output_csv(csv, status, headers):
        resp = make_response(csv, status)
        resp.headers.extend(headers)
        return resp


class DeviceResource(Resource):
    """
        The device resource handles API requests relating to robomussel data.
        Will output all device information.
    """
    def get(self):
        """
            Returns all information about each device 
        """
        return map(Device.to_json, Device.query.all()) 


def avg(collection, key=lambda x: x):
    """ Averages a collection using the given getter, and constructs a 
        bogus reading for the aggregated value """
    first = collection[0]
    return Reading(device=first.device, date=first.date, 
            reading=sum(map(key, collection)) / len(collection))

    
def func_by_date(func):
    """ Higher order function that consumes an iterator consumer function,
        and wraps it in a consumer that keys off a reading's reading field
    """
    def wrapped(readings):
        return func(readings, key=lambda reading: reading.reading)
    return wrapped


class ReadingResource(Resource):
    """
        The reading resources handles API requests relating to robomussel data
        it additionally supports facilities to filter datasets based on query
        string parameters
    """
    INTERVAL_MAP = {"10min": timedelta(minutes=10), 
            "hourly": timedelta(hours=1), 
            "daily": timedelta(days=1),
            "weekly": timedelta(weeks=1), 
            "monthly": timedelta(weeks=4), 
            "yearly": timedelta(weeks=52)}

    AGG_MAP = {"min": func_by_date(min),
            "max": func_by_date(max),
            "average": func_by_date(avg)}

    def get(self):
        """
            Filters the database by the given device id, and returns a JSON
            string to the requester
        """
        readings, download = self.filter(Reading.query)
        readings = map(Reading.to_json, readings)
        if download:
            readings = self.to_csv(readings)
            return readings, 200, {"Content-Disposition":"attachment; filename=download.csv", "Content-Type":"text/csv"}
        else:
            return readings

    def filter(self, readings):
        """
            Filters the given readings by the parameters encoded in the query
            string
        """
        args = self.query_parse()
        readings = readings.join(Device)
        # http://159.203.111.95:port/api/reading/?start_date=<start_date>&end_date=<end_date>
        if args["start_date"] and args["end_date"]:
            readings = readings.filter(Reading.date.between(args["start_date"], 
                                                            args["end_date"]))

        # http://159.203.111.95:port/api/reading/?country=<country>
        if args["country"]:
            readings = readings.filter(Device.country == args["country"])
       
        # http://159.203.111.95:port/api/reading/?state_province=<state_province>
        if args["state_province"]:
            readings = readings.filter(Device.state_province == args["state_province"])
       
        # http://159.203.111.95:port/api/reading/?location=<location>
        if args["location"]:
            readings = readings.filter(Device.location == args["location"])        
        
        # http://159.203.111.95:port/api/reading/?wave_exp=<wave_exp>
        if args["wave_exp"]:
           readings = readings.filter(Device.wave_exp == args["wave_exp"])
        
        # http://159.203.111.95:port/api/reading/?device=<device>
        if args["device"]:# and args["zone"]:
           readings = readings.filter(Reading.device == args["device"]) 

        # http://159.203.111.95:port/api/reading?zone=<zone>
        if args["zone"]:
           readings = readings.filter(Device.zone == args["zone"])

        # http://159.203.111.95:port/api/reading?sub_zone=<sub_zone>
        if args["sub_zone"]:
           readings = readings.filter(Device.sub_zone == args["sub_zone"])
        
        if args["interval"] and args["aggregation"]:
            readings = self.bin_readings(readings, args["interval"], args["aggregation"])

        # allow user to download csv files of data
        return readings, args["download"]

    def bin_readings(self, readings, interval, agg):
        """ Consumes a collection of readings, an interval to sort by, and an
            aggregation function, and combines the readings
        """
        start_date = readings[0].date 
        interval_len = self.INTERVAL_MAP[interval.lower()]
        agg_func = self.AGG_MAP[agg.lower()]

        current_bin, bins = [], []
        for reading in readings:
            if reading.date - start_date >= interval_len:
                start_date = reading.date
                bins.append(current_bin)
                current_bin = []
            current_bin.append(reading)
        if not bins or bins[-1] != current_bin:
            bins.append(current_bin)

        return map(agg_func, bins) 

    def query_parse(self):
        """ Parses dates from the query string """
        parser = RequestParser()
        parser.add_argument('start_date', type=str, location='args')
        parser.add_argument('end_date', type=str, location='args')
        parser.add_argument('country', type=str, location='args')
        parser.add_argument('state_province', type=str, location='args')
        parser.add_argument('location', type=str, location='args')
        parser.add_argument('wave_exp', type=str, location='args')
        parser.add_argument('zone', type=str, location='args')
        parser.add_argument('sub_zone', type=str, location='args')
        parser.add_argument('device', type=str, location='args')
        parser.add_argument('download', type=bool, location='args')
        parser.add_argument('interval', type=str, location='args')
        parser.add_argument('aggregation', type=str, location='args')
        return parser.parse_args()
    
    # http://159.203.111.95:port/api/reading/?location=Colins%20Cove&download=True     
    def to_csv(self, json):
        """Converts json to csv"""
        csv = "device,date,reading\n"
        for x in json:
            csv += (",".join([str(x[arg]) for arg in ("device", "date", "reading")]) + "\n")
        return csv
