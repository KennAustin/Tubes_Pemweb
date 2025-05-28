from sqlalchemy import Column, Integer, BigInteger, Text, String, TIMESTAMP, CheckConstraint, ForeignKey
from sqlalchemy.sql import func
from . import Base

class Review(Base):
    __tablename__ = 'reviews'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    song_id = Column(Text, nullable=False)
    song_name = Column(Text, nullable=False)
    artist_name = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    album_image_url = Column(String)

    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
    )