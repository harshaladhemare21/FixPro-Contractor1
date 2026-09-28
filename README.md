# FixPro Contractor

AI-assisted home-service booking and contractor management platform.

## Overview

FixPro helps customers describe their home repair problems, identify the appropriate service and urgency, check available appointment slots, and book a service.

Contractors can manage bookings, update job status, and view dashboard statistics.

## Features

- AI-assisted problem analysis
- Service detection
- Urgency detection
- Emergency detection
- Appointment availability
- Booking management
- Contractor dashboard
- Booking status updates
- REST API
- SQLite database

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite

## Project Structure

```text
FixPro_Contractor/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   ├── ai_service.py
│   ├── migrate_db.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── package.json
    └── ...