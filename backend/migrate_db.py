import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "database" / "fixpro.db"

print("Database:", DB_PATH)

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(bookings)")
existing_columns = {row[1] for row in cursor.fetchall()}

print("\nExisting columns:")
for column in existing_columns:
    print(" -", column)

required_columns = {
    "detected_service": "TEXT",
    "urgency": "TEXT DEFAULT 'Normal'",
    "emergency": "BOOLEAN DEFAULT 0",
    "priority": "TEXT DEFAULT 'Normal'",
    "created_at": "DATETIME",
}

for column, column_type in required_columns.items():

    if column not in existing_columns:

        print(f"\nAdding missing column: {column}")

        cursor.execute(
            f"ALTER TABLE bookings ADD COLUMN {column} {column_type}"
        )

    else:

        print(f"\nAlready exists: {column}")

conn.commit()

print("\nUpdated bookings table:")

cursor.execute("PRAGMA table_info(bookings)")

for row in cursor.fetchall():
    print(f" - {row[1]}")

conn.close()

print("\n✅ Database migration completed successfully!")