from sqlalchemy import Column, Integer, VARCHAR
from . import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(VARCHAR(50), nullable=False, unique=True)
    password = Column(VARCHAR(50), nullable=False)
