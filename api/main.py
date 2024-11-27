from typing import Optional
from schema import CreateStudentRequest, UpdateStudentRequest
from service.services.DbService import DbService
from fastapi import Depends, FastAPI, Query
from sqlalchemy.orm import Session
from model.connectionDB import get_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
dbService = DbService()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/students")
async def get_students(
    page: int = Query(1, ge=1, description="Page number (1-based)"),
    size: int = Query(10, ge=1, le=100, description="Number of records per page"),
    db: Session = Depends(get_db)
):
    return dbService.getStudents(page, size, db)

@app.post("/students/add")
async def create_student(student: CreateStudentRequest, db: Session = Depends(get_db)):
    return dbService.createStudent(student, db)

@app.delete("/students/delete/{student_id}")
async def delete_student(student_id: int, db: Session = Depends(get_db)):
    return dbService.deleteStudent(student_id, db)

@app.patch("/students/update/{student_id}")
async def update_student(student_id: int, student: UpdateStudentRequest, db: Session = Depends(get_db)):
    return dbService.updateStudent(student_id, student, db) 
    
@app.get("/students/filter")
async def get_students(
    page: int = Query(1, ge=1, description="Page number (1-based)"),
    size: int = Query(10, ge=1, le=100, description="Number of records per page"),
    sort_by: Optional[str] = Query(None, description="Field to sort by (e.g., 'surname', 'course')"),
    order: Optional[str] = Query("asc", regex="^(asc|desc)$", description="Sort order: 'asc' or 'desc'"),
    db: Session = Depends(get_db),
):
    return dbService.getFilteredStudents(page, size, sort_by, order, db)