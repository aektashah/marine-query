"""
    Models contains the python representations for our database tables and 
    contains various utility methods for serializing the data for transfer
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from database import Base
from json import dumps

class Device(Base):
    """ Represents the metadata about a meter and its location"""
    __tablename__ = "devices"
    
    id = Column(String(50), unique=True, primary_key=True, index=True)
    site = Column(String(50))
    field_lat = Column(Float)
    field_lon = Column(Float)
    location = Column(String(50))
    state_province = Column(String(50))
    country = Column(String(50))
    biomimic = Column(String(50))
    zone = Column(String(50), nullable=True)
    sub_zone = Column(String(50), nullable=True)
    wave_exp = Column(String(50), nullable=True)
    tide_height = Column(Float, nullable=True)
	
    def to_json(self):
	return {"site": self.site,
		"field_lat": self.field_lat,
		"field_lon": self.field_lon,
		"location": self.location,
		"state_province": self.state_province,
		"country": self.country,
		"biomimic": self.biomimic,
		"zone": self.zone,
		"sub_zone": self.sub_zone,
		"wave_exp": self.wave_exp,
		"tide_height": self.tide_height}

    def __repr__(self):
        return "Device %s" % self.id

class Reading(Base):
    """ Represents a robomussell temperature entry """

    __tablename__ = "readings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    device = Column(ForeignKey("devices.id"))
    date = Column(DateTime)
    reading = Column(Float)

    def to_json(self):
        return {"device": self.device, 
                "date": self.date.strftime("%Y/%m/%d %H:%M"),
                "reading": self.reading}

    def __repr__(self):
        return "Reading %s %s %f" % (self.device, self.date, self.reading)
