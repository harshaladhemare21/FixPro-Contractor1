function BookingCard({
    booking,
    onStatusChange
}) {

    return (

        <div className="job-card">

            <div className="job-top">

                <div>

                    <span className="booking-id">
                        #{booking.id}
                    </span>

                    <h3>
                        {booking.customer_name}
                    </h3>

                </div>


                <span
                    className={
                        booking.priority === "High"
                            ? "priority high"
                            : "priority normal"
                    }
                >
                    {booking.priority}
                </span>

            </div>


            <div className="job-service">

                <span>
                    🔧
                </span>

                <strong>
                    {booking.detected_service ||
                        booking.service}
                </strong>

            </div>


            <p className="job-problem">
                {booking.problem}
            </p>


            <div className="job-details">

                <span>
                    📅 {booking.booking_date}
                </span>

                <span>
                    🕐 {booking.booking_time}
                </span>

                <span>
                    📍 {booking.address}
                </span>

            </div>


            <div className="job-footer">

                <span
                    className="status-badge"
                >
                    {booking.status}
                </span>


                <select
                    value={booking.status}
                    onChange={(e) =>
                        onStatusChange(
                            booking.id,
                            e.target.value
                        )
                    }
                >

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Confirmed">
                        Confirmed
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                </select>

            </div>

        </div>
    );
}

export default BookingCard;