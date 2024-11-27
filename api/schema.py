from pydantic import BaseModel

class CreateStudentRequest(BaseModel):
    surname: str
    name: str 
    patronymic: str
    course: int
    group: str 
    faculty: str 

class UpdateStudentRequest(BaseModel):
    surname: str 
    name: str
    patronymic: str
    course: int
    group: str
    faculty: str
