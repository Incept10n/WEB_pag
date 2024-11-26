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