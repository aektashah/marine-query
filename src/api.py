""" 
    Class based approach to RESTful API endpoints
"""
from flask.ext.restful import Resource
from flask_restful.reqparse import RequestParser

from models import Reading, Device

from StringIO import StringIO

import csv

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

class ReadingResource(Resource):
    """
        The reading resources handles API requests relating to robomussel data
        it additionally supports facilities to filter datasets based on query
        string parameters
    """
    def get(self):
        """
            Filters the database by the given device id, and returns a JSON
            string to the requester
        """
	readings, download = self.filter(Reading.query)
	readings = map(Reading.to_json, readings)
	if download:
            readings = self.to_csv(readings)
            print readings
            return readings, 200, {"Content-Disposition":"attachment; filename=download.csv", "Content-Type":"text/csv"}
	else:
       	    return readings

    def filter(self, readings):
        """
            Filters the given readings by the parameters encoded in the query
            string
        """
        args = self.query_parse()
        
        if args["start_date"] and args["end_date"]:
            readings = readings.filter(Reading.date.between(args["start_date"], 
                                                            args["end_date"]))

        # http://159.203.111.95:port/api/reading?country=<country>
        if args["country"]:
            readings = readings.join(Device).filter(Device.country == args["country"])
       
        # http://159.203.111.95:port/api/reading?state_province=<state_province>&country=<country>
        if args["state_province"] and args["country"]:
            readings = readings.join(Device).filter(Device.state_province == args["state_province"]).filter(Device.country == args["country"])
       
        # http://159.203.111.95:port/api/reading?location=<location>
        if args["location"]:
            readings = readings.join(Device).filter(Device.location == args["location"])        
        
        # http://159.203.111.95:port/api/reading?country=<country>&wave_exp=<wave_exp>
        # for layering queries (country and wave_exp) does this make the most sense?
        if args["country"] and args["wave_exp"]:
           readings = readings.join(Device).filter(Device.country == args["country"]).filter(Device.wave_exp == args["wave_exp"])
        
        # http://159.203.111.95:port/api/reading?device=<device>&zone=<zone>
        if args["device"] and args["zone"]:
           readings = readings.join(Device).filter(Reading.device == args["device"]).filter(Device.zone == args["zone"]) 
        
        # http://159.203.111.95:port/api/reading?device=<device>&sub_zone=<sub_zone>
        if args["device"] and args["sub_zone"]:
           readings = readings.join(Device).filter(Reading.device == args["device"]).filter(Device.sub_zone == args["sub_zone"])

        # allow user to download csv files of data
        return readings, args["download"]

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
        return parser.parse_args()
    
    # http://159.203.111.95:6969/api/reading/?location=Colins%20Cove&download=True     
    def to_csv(self, json):
        """Converts json to csv"""
        """
        string_buffer = StringIO()
        json = json.replace("\r", "").replace("\n", "")
        convert = csv.writer(string_buffer)
        convert.writerow(["device", "date", "reading"])

        for x in json:
            convert.writerow([x["device"],
                              x["date"],
                              x["reading"]])
        return string_buffer.getvalue()
        """
        csv = "device,date,reading\n"
        for x in json:
            csv += (
            str(x["device"])+ "," +
            str(x["date"]) + "," +
            str(x["reading"]) + "\n")
        return csv
