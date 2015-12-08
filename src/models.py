"""
    Models contains the python representations for our database tables and 
    contains various utility methods for serializing the data for transfer
"""
import os

from flask.ext.security import UserMixin, RoleMixin
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, BigInteger
from sqlalchemy.orm import relationship, backref
from database import make_db_utils 
from json import dumps

_, db_session, Base = make_db_utils()

class Device(Base):
    """ Represents the metadata about a meter and its location"""
    __tablename__ = "devices"
    
    id = Column(String(50), unique=True, index=True)
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
    dev_id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    def to_json(self):
        return {"site": self.site,
            "microsite_id": self.id,
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

    @staticmethod
    def add_from_file(upload, device_name):
        values = [line.split("\t") for line in upload.split("\n")]
        for date, reading in values[1:]:
            r = Reading(device=device_name,date=date,reading=float(reading))
            db_session.add(r)
        db_session.commit()
        return True


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


class User(Base, UserMixin):
    """ Represents admin users of the system """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True)
    password = Column(String(255))
    active = Column(Boolean())
    roles = relationship('Role', secondary="user_roles",
            backref=backref('users', lazy='dynamic'))


    def __repr__(self):
        return "User %s" % (self.email)

class Role(Base, RoleMixin):
    """ Represents te different permissions a user can have in the system """

    __tablename__ = "roles"
    id = Column(Integer(), primary_key=True)
    name = Column(String(80), unique=True)
    description = Column(String(255))

    def __repr__(self):
        return "Role %s" % self.name

class UserRoles(Base):
    """ Roles for a user, such as admin-read-write or admin-read"""
    __tablename__ = "user_roles"
    user_id = Column(ForeignKey("users.id"), primary_key=True)
    role_id = Column(ForeignKey("roles.id"), primary_key=True)

