from pydantic import BaseModel, Field

from typing import Optional


# =========================================================
# CREATE BOOKING
# =========================================================

class BookingCreate(BaseModel):

    customer_name: str = Field(
        min_length=2,
        max_length=100
    )

    phone: str = Field(
        min_length=10,
        max_length=15
    )

    email: Optional[str] = None

    service: str

    problem: str = Field(
        min_length=5,
        max_length=1000
    )

    address: str = Field(
        min_length=5,
        max_length=500
    )

    booking_date: str

    booking_time: str

    emergency: bool = False


# =========================================================
# UPDATE STATUS
# =========================================================

class BookingStatusUpdate(BaseModel):

    status: str


# =========================================================
# BOOKING RESPONSE
# =========================================================

class BookingResponse(BaseModel):

    id: int

    customer_name: str

    phone: str

    email: Optional[str]

    service: str

    problem: str

    detected_service: Optional[str]

    urgency: str

    address: str

    booking_date: str

    booking_time: str

    emergency: bool

    priority: str

    status: str

    class Config:

        from_attributes = True


# =========================================================
# AI PROBLEM ANALYSIS
# =========================================================

class ProblemAnalysisRequest(BaseModel):

    problem: str


class ProblemAnalysisResponse(BaseModel):

    detected_service: str

    urgency: str

    emergency: bool

    recommendation: str