""" 
    Class based approach to RESTful API endpoints
"""
from flask.ext.restful import Resource
from flask_restful.reqparse import RequestParser

from models import Reading, Device

class DeviceResource(Resource):
    """
        The device resource handles API requests relating to robomussel data.
	Will output all device information.
    """
    def get(self, site_name):
   	"""
            Returns all information about each device 
   	"""
	return map(Device.to_json, Device.query.all()) #self.filter(Device.query.filter(Device.site == site_name)).all())

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
        return map(Reading.to_json, 
                self.filter(Reading.query))#query.filter(Reading.device == dev_name)).all())

    def filter(self, readings):
        """
            Filters the given readings by the parameters encoded in the query
            ()string
        """
        args = self.query_parse()
        if args["start_date"] and args["end_date"]:
            readings = readings.filter(Reading.date.between(args["start_date"], 
                                                            args["end_date"]))
	if args["country"]:
	    print("country is %s" % args["country"])
	    readings = readings.join(Device).filter(Device.country == args["country"])
            #readings = readings.filter(Reading.dev_pointer.country(args["country"]))

        return readings

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
       # parser.add_argument('time_interval', type=str, location='args')
        return parser.parse_args()

