from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

import os


# ---------------------------------------------------------
# DATABASE CONFIGURATION
# ---------------------------------------------------------

DATABASE_FOLDER = "database"

# Create database folder if it does not exist
os.makedirs(DATABASE_FOLDER, exist_ok=True)

DATABASE_URL = "sqlite:///./database/fixpro.db"


# ---------------------------------------------------------
# DATABASE ENGINE
# ---------------------------------------------------------

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


# ---------------------------------------------------------
# DATABASE SESSION
# ---------------------------------------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# ---------------------------------------------------------
# BASE CLASS
# ---------------------------------------------------------

Base = declarative_base()


# ---------------------------------------------------------
# DATABASE DEPENDENCY
# ---------------------------------------------------------

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()