"""
    Provides the connection primitives to communicate with the database
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Connection URL to communicate with the local database
SQLALCHEMY_DATABASE_URI = "postgresql://james:fishes@localhost/marine"

# Session utilities to instantiate and communicate with the above URI
engine = create_engine(SQLALCHEMY_DATABASE_URI)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

# Base class for models to subclass
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import models
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
