from fastapi import (
    FastAPI,
    Depends,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from datetime import date

from database import (
    Base,
    engine,
    get_db
)

from schemas import (
    BookingCreate,
    BookingStatusUpdate,
    BookingResponse,
    ProblemAnalysisRequest,
    ProblemAnalysisResponse
)

import crud

from ai_service import analyze_problem


# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(
    bind=engine
)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(

    title="FixPro Contractor API",

    description="""
    Smart contractor booking and job management system.

    Features:
    - Customer bookings
    - Smart problem classification
    - Emergency prioritization
    - Availability management
    - Double-booking prevention
    - Contractor dashboard
    - Job status management
    """,

    version="2.0.0"

)


# =========================================================
# CORS
# =========================================================
#
# This allows our future React/Lovable frontend
# to communicate with the Python backend.
# =========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {

        "application": "FixPro",

        "message":
            "FixPro Contractor API is running",

        "version": "2.0.0",

        "status": "success"

    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health_check():

    return {

        "status": "healthy",

        "service": "FixPro API"

    }


# =========================================================
# AI PROBLEM ANALYSIS
# =========================================================

@app.post(
    "/ai/analyze",
    response_model=ProblemAnalysisResponse
)
def analyze_customer_problem(
    request: ProblemAnalysisRequest
):

    result = analyze_problem(
        request.problem
    )

    return result


# =========================================================
# CREATE BOOKING
# =========================================================

@app.post(
    "/bookings",
    response_model=BookingResponse
)
def create_booking(

    booking: BookingCreate,

    db: Session = Depends(get_db)

):

    result = crud.create_booking(
        db,
        booking
    )

    # -----------------------------------------------------
    # DOUBLE BOOKING
    # -----------------------------------------------------

    if isinstance(result, dict):

        if (
            result.get("error")
            == "TIME_SLOT_UNAVAILABLE"
        ):

            raise HTTPException(

                status_code=409,

                detail=(
                    "Selected time slot is "
                    "already booked. "
                    "Please select another time."
                )

            )

    return result


# =========================================================
# GET ALL BOOKINGS
# =========================================================

@app.get(
    "/bookings",
    response_model=list[BookingResponse]
)
def get_bookings(

    db: Session = Depends(get_db)

):

    return crud.get_all_bookings(db)


# =========================================================
# GET SINGLE BOOKING
# =========================================================

@app.get(
    "/bookings/{booking_id}",
    response_model=BookingResponse
)
def get_single_booking(

    booking_id: int,

    db: Session = Depends(get_db)

):

    booking = crud.get_booking(

        db,

        booking_id

    )

    if booking is None:

        raise HTTPException(

            status_code=404,

            detail="Booking not found"

        )

    return booking


# =========================================================
# UPDATE BOOKING STATUS
# =========================================================

@app.put(
    "/bookings/{booking_id}/status",
    response_model=BookingResponse
)
def update_status(

    booking_id: int,

    status_data: BookingStatusUpdate,

    db: Session = Depends(get_db)

):

    booking = crud.update_booking_status(

        db,

        booking_id,

        status_data.status

    )

    # -----------------------------------------------------
    # BOOKING NOT FOUND
    # -----------------------------------------------------

    if booking is None:

        raise HTTPException(

            status_code=404,

            detail="Booking not found"

        )

    # -----------------------------------------------------
    # INVALID STATUS
    # -----------------------------------------------------

    if booking == "INVALID_STATUS":

        raise HTTPException(

            status_code=400,

            detail=(
                "Invalid status. Allowed values: "
                "Pending, Confirmed, In Progress, "
                "Completed, Cancelled"
            )

        )

    return booking


# =========================================================
# AVAILABLE SLOTS
# =========================================================

@app.get(
    "/availability/{booking_date}"
)
def available_slots(

    booking_date: str,

    db: Session = Depends(get_db)

):

    slots = crud.get_available_slots(

        db,

        booking_date

    )

    return {

        "date": booking_date,

        "available_slots": slots,

        "total_available":
            len(slots)

    }


# =========================================================
# BOOKINGS BY DATE
# =========================================================

@app.get(
    "/bookings/date/{booking_date}",
    response_model=list[BookingResponse]
)
def bookings_by_date(

    booking_date: str,

    db: Session = Depends(get_db)

):

    return crud.get_bookings_by_date(

        db,

        booking_date

    )


# =========================================================
# TODAY'S BOOKINGS
# =========================================================

@app.get(
    "/dashboard/today",
    response_model=list[BookingResponse]
)
def today_bookings(

    db: Session = Depends(get_db)

):

    today = date.today().isoformat()

    return crud.get_bookings_by_date(

        db,

        today

    )


# =========================================================
# CONTRACTOR DASHBOARD
# =========================================================

@app.get(
    "/dashboard/stats"
)
def dashboard_statistics(

    db: Session = Depends(get_db)

):

    return crud.get_dashboard_stats(

        db

    )