from sqlalchemy.orm import Session

from sqlalchemy import func

from models import Booking

from schemas import BookingCreate

from ai_service import analyze_problem


# =========================================================
# CREATE BOOKING
# =========================================================

def create_booking(
    db: Session,
    booking_data: BookingCreate
):

    # -----------------------------------------------------
    # AI ANALYSIS
    # -----------------------------------------------------

    analysis = analyze_problem(
        booking_data.problem
    )

    detected_service = analysis["detected_service"]

    urgency = analysis["urgency"]

    # -----------------------------------------------------
    # DETERMINE PRIORITY
    # -----------------------------------------------------

    emergency = (
        booking_data.emergency
        or analysis["emergency"]
    )

    if emergency:

        priority = "High"

    elif urgency == "Urgent":

        priority = "High"

    else:

        priority = "Normal"

    # -----------------------------------------------------
    # DOUBLE BOOKING CHECK
    # -----------------------------------------------------

    existing_booking = (
        db.query(Booking)
        .filter(
            Booking.booking_date
            == booking_data.booking_date,

            Booking.booking_time
            == booking_data.booking_time,

            Booking.status.notin_([
                "Cancelled"
            ])
        )
        .first()
    )

    if existing_booking:

        return {
            "error": "TIME_SLOT_UNAVAILABLE"
        }

    # -----------------------------------------------------
    # CREATE BOOKING
    # -----------------------------------------------------

    booking = Booking(

        customer_name=booking_data.customer_name,

        phone=booking_data.phone,

        email=booking_data.email,

        service=booking_data.service,

        problem=booking_data.problem,

        detected_service=detected_service,

        urgency=urgency,

        address=booking_data.address,

        booking_date=booking_data.booking_date,

        booking_time=booking_data.booking_time,

        emergency=emergency,

        priority=priority,

        status="Pending"
    )

    db.add(booking)

    db.commit()

    db.refresh(booking)

    return booking


# =========================================================
# GET ALL BOOKINGS
# =========================================================

def get_all_bookings(
    db: Session
):

    return (
        db.query(Booking)
        .order_by(
            Booking.booking_date.asc(),
            Booking.booking_time.asc()
        )
        .all()
    )


# =========================================================
# GET SINGLE BOOKING
# =========================================================

def get_booking(
    db: Session,
    booking_id: int
):

    return (
        db.query(Booking)
        .filter(
            Booking.id == booking_id
        )
        .first()
    )


# =========================================================
# UPDATE STATUS
# =========================================================

def update_booking_status(
    db: Session,
    booking_id: int,
    status: str
):

    booking = get_booking(
        db,
        booking_id
    )

    if booking is None:

        return None

    allowed_statuses = [

        "Pending",

        "Confirmed",

        "In Progress",

        "Completed",

        "Cancelled"

    ]

    if status not in allowed_statuses:

        return "INVALID_STATUS"

    booking.status = status

    db.commit()

    db.refresh(booking)

    return booking


# =========================================================
# AVAILABLE TIME SLOTS
# =========================================================

def get_available_slots(
    db: Session,
    booking_date: str
):

    all_slots = [

        "10:00 AM",

        "12:00 PM",

        "03:00 PM",

        "05:00 PM"

    ]

    booked_slots = (

        db.query(
            Booking.booking_time
        )

        .filter(
            Booking.booking_date
            == booking_date,

            Booking.status.notin_([
                "Cancelled"
            ])
        )

        .all()
    )

    booked_times = {

        item[0]

        for item in booked_slots

    }

    available_slots = [

        slot

        for slot in all_slots

        if slot not in booked_times

    ]

    return available_slots


# =========================================================
# TODAY'S BOOKINGS
# =========================================================

def get_bookings_by_date(
    db: Session,
    booking_date: str
):

    return (

        db.query(Booking)

        .filter(
            Booking.booking_date
            == booking_date
        )

        .order_by(
            Booking.booking_time.asc()
        )

        .all()

    )


# =========================================================
# DASHBOARD STATISTICS
# =========================================================

def get_dashboard_stats(
    db: Session
):

    total = (
        db.query(Booking)
        .count()
    )

    pending = (
        db.query(Booking)
        .filter(
            Booking.status
            == "Pending"
        )
        .count()
    )

    confirmed = (
        db.query(Booking)
        .filter(
            Booking.status
            == "Confirmed"
        )
        .count()
    )

    in_progress = (
        db.query(Booking)
        .filter(
            Booking.status
            == "In Progress"
        )
        .count()
    )

    completed = (
        db.query(Booking)
        .filter(
            Booking.status
            == "Completed"
        )
        .count()
    )

    cancelled = (
        db.query(Booking)
        .filter(
            Booking.status
            == "Cancelled"
        )
        .count()
    )

    emergency = (
        db.query(Booking)
        .filter(
            Booking.emergency == True,
            Booking.status != "Cancelled"
        )
        .count()
    )

    return {

        "total_bookings": total,

        "pending": pending,

        "confirmed": confirmed,

        "in_progress": in_progress,

        "completed": completed,

        "cancelled": cancelled,

        "emergency_bookings": emergency,

        # Example business impact metrics
        "estimated_manual_hours_saved":
            round(total * 0.35, 1),

        "automated_booking_percentage":
            100 if total > 0 else 0

    }