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
    def get(self, dev_name):
        """
            Filters the database by the given device id, and returns a JSON
            string to the requester
        """
        return map(Reading.to_json, 
                self.filter(Reading.query.filter(Reading.device == dev_name)).all())

    def filter(self, readings):
        """
            Filters the given readings by the parameters encoded in the query
            ()string
        """
        args = self.query_parse()
        if args["start_date"] and args["end_date"]:
            readings = readings.filter(Reading.date.between(args["start_date"], 
                                                            args["end_date"]))
        return readings

    def query_parse(self):
        """ Parses dates from the query string """
        parser = RequestParser()
        parser.add_argument('start_date', type=str, location='args')
        parser.add_argument('end_date', type=str, location='args')
        return parser.parse_args()

