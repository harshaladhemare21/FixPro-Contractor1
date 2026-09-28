from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime
)

from datetime import datetime

from database import Base


class Booking(Base):

    __tablename__ = "bookings"

    # -----------------------------------------------------
    # PRIMARY KEY
    # -----------------------------------------------------

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # -----------------------------------------------------
    # CUSTOMER INFORMATION
    # -----------------------------------------------------

    customer_name = Column(
        String,
        nullable=False
    )

    phone = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=True
    )

    # -----------------------------------------------------
    # SERVICE INFORMATION
    # -----------------------------------------------------

    service = Column(
        String,
        nullable=False
    )

    problem = Column(
        String,
        nullable=False
    )

    # AI-generated classification
    detected_service = Column(
        String,
        nullable=True
    )

    urgency = Column(
        String,
        default="Normal"
    )

    # -----------------------------------------------------
    # LOCATION
    # -----------------------------------------------------

    address = Column(
        String,
        nullable=False
    )

    # -----------------------------------------------------
    # APPOINTMENT
    # -----------------------------------------------------

    booking_date = Column(
        String,
        nullable=False
    )

    booking_time = Column(
        String,
        nullable=False
    )

    # -----------------------------------------------------
    # PRIORITY
    # -----------------------------------------------------

    emergency = Column(
        Boolean,
        default=False
    )

    priority = Column(
        String,
        default="Normal"
    )

    # -----------------------------------------------------
    # BOOKING STATUS
    # -----------------------------------------------------

    status = Column(
        String,
        default="Pending"
    )

    # -----------------------------------------------------
    # TIMESTAMP
    # -----------------------------------------------------

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )