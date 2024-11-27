from fastapi import Depends, Query, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from model.connectionDB import get_db
from model.entities.students import Users 

class DbService:
    def getStudents(self, page: int = Query(1, ge=1, description="Page number (1-based)"),
    size: int = Query(10, ge=1, le=100, description="Number of records per page"),
    db: Session = Depends(get_db)):
        offset = (page - 1) * size
        query = select(Users).offset(offset).limit(size)
        students = db.execute(query).scalars().all()
        total_records = db.execute(select(func.count()).select_from(Users)).scalar()
        if not students and page != 1:
            raise HTTPException(status_code=404, detail="Page not found")
        return {
            "data": students,
            "meta": {
                "total_records": total_records,
                "page": page,
                "size": size,
                "total_pages": (total_records + size - 1) // size  
            }
        } 

    
    def createStudent(self, student: BaseModel, db: Session):
        new_student = Users(
            surname=student.surname,
            name=student.name,
            patronymic=student.patronymic,
            course=student.course,
            group=student.group,
            faculty=student.faculty
            )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return {"message": "Student created successfully", "student": new_student}


    def deleteStudent(self, student_id: int, db: Session):
        student = db.query(Users).filter(Users.id == student_id).first()
        if not student:
            raise HTTPException(status_code=404, detail=f"Student with id {student_id} not found")
        db.delete(student)
        db.commit()
        return {"message": f"Student with id {student_id} deleted successfully"}


    def updateStudent(self, student_id: int, student: BaseModel, db: Session):
        existing_student = db.query(Users).filter(Users.id == student_id).first()
        if not existing_student:
            raise HTTPException(status_code=404, detail=f"Student with id {student_id} not found")
        update_data = student.model_dump(exclude_unset=True)  
        for key, value in update_data.items():
            setattr(existing_student, key, value)
        db.commit()
        db.refresh(existing_student)
        return {"message": f"Student with id {student_id} updated successfully", "student": existing_student}
