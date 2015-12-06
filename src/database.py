"""
    Provides the connection primitives to communicate with the database
"""
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Session utilities to instantiate and communicate with the above URI
def make_db_utils():
    engine = create_engine(os.environ["SQLALCHEMY_DATABASE_URI"])
    db_session = scoped_session(sessionmaker(autocommit=False,
                                             autoflush=False,
                                             bind=engine))
    Base = declarative_base()
    Base.query = db_session.query_property()
    return engine, db_session, Base

def init_db(Base, engine):
    import models
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
