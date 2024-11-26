from model.connectionDB import Base
from sqlalchemy import Column, Integer, String

class Users(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, nullable=False)
    surname = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    patronymic = Column(String(50), nullable=False)
    course = Column(Integer, nullable=False)
    group = Column(String(15), nullable=False)
    faculty = Column(String(100), nullable=False)
