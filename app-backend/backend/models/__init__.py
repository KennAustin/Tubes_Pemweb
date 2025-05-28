from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
import zope.sqlalchemy

DBSession = scoped_session(sessionmaker())
zope.sqlalchemy.register(DBSession)
Base = declarative_base()

from .user import User
from .review import Review

def includeme(config):
    pass