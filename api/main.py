from fastapi import Depends, FastAPI, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from model.connectionDB import get_db
from model.entities.students import Users 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Accept requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/students")
async def get_students(
    page: int = Query(1, ge=1, description="Page number (1-based)"),
    size: int = Query(10, ge=1, le=100, description="Number of records per page"),
    db: Session = Depends(get_db)
):
    offset = (page - 1) * size

    # Query to fetch students with pagination
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
