function Confirmation({
    booking,
    setCurrentPage
}) {

    if (!booking) {

        return (

            <main className="confirmation-page">

                <h1>
                    No booking found
                </h1>

                <button
                    className="primary-button"
                    onClick={() =>
                        setCurrentPage("booking")
                    }
                >
                    Book a Service
                </button>

            </main>

        );
    }


    return (

        <main className="confirmation-page">

            <div className="success-icon">
                ✓
            </div>

            <span className="eyebrow">
                BOOKING CONFIRMED
            </span>

            <h1>
                Your service request is in!
            </h1>

            <p>
                We'll use the details below to
                coordinate your contractor visit.
            </p>


            <div className="confirmation-card">

                <div className="confirmation-id">

                    <span>
                        Booking ID
                    </span>

                    <strong>
                        #{booking.id}
                    </strong>

                </div>


                <div className="confirmation-details">

                    <div>
                        <small>
                            Customer
                        </small>

                        <strong>
                            {booking.customer_name}
                        </strong>
                    </div>


                    <div>
                        <small>
                            Service
                        </small>

                        <strong>
                            {booking.detected_service ||
                                booking.service}
                        </strong>
                    </div>


                    <div>
                        <small>
                            Date
                        </small>

                        <strong>
                            {booking.booking_date}
                        </strong>
                    </div>


                    <div>
                        <small>
                            Time
                        </small>

                        <strong>
                            {booking.booking_time}
                        </strong>
                    </div>


                    <div>
                        <small>
                            Priority
                        </small>

                        <strong>
                            {booking.priority}
                        </strong>
                    </div>


                    <div>
                        <small>
                            Status
                        </small>

                        <strong className="status-pill">
                            {booking.status}
                        </strong>
                    </div>

                </div>

            </div>


            <div className="confirmation-actions">

                <button
                    className="primary-button"
                    onClick={() =>
                        setCurrentPage("home")
                    }
                >
                    Back to Home
                </button>

                <button
                    className="secondary-button"
                    onClick={() =>
                        setCurrentPage("dashboard")
                    }
                >
                    View Contractor Dashboard
                </button>

            </div>

        </main>
    );
}

export default Confirmation;