from fastapi import Depends, Query, HTTPException
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