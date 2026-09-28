import { useEffect, useState } from "react";

import {
    getBookings,
    getDashboardStats,
    updateBookingStatus
} from "../api";

import StatCard from "../components/StatCard";

import BookingCard from "../components/BookingCard";


function Dashboard() {

    const [stats, setStats] = useState(null);

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    async function loadDashboard() {

        try {

            setLoading(true);

            const [
                statsData,
                bookingsData
            ] = await Promise.all([

                getDashboardStats(),

                getBookings()

            ]);

            setStats(statsData);

            setBookings(bookingsData);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadDashboard();

    }, []);


    async function handleStatusChange(
        bookingId,
        status
    ) {

        try {

            await updateBookingStatus(
                bookingId,
                status
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message
            );

        }

    }


    if (loading) {

        return (

            <main className="dashboard-page">

                <div className="loading">
                    Loading dashboard...
                </div>

            </main>

        );

    }


    return (

        <main className="dashboard-page">

            <div className="dashboard-header">

                <div>

                    <span className="eyebrow">
                        CONTRACTOR WORKSPACE
                    </span>

                    <h1>
                        Good morning 👋
                    </h1>

                    <p>
                        Here's what's happening
                        with your jobs.
                    </p>

                </div>


                <button
                    className="secondary-button"
                    onClick={loadDashboard}
                >
                    ↻ Refresh
                </button>

            </div>


            {error && (

                <div className="error-message">
                    ⚠️ {error}
                </div>

            )}


            {/* STATS */}

            {stats && (

                <div className="stats-grid">

                    <StatCard
                        icon="📋"
                        label="Total Jobs"
                        value={
                            stats.total_bookings
                        }
                    />

                    <StatCard
                        icon="⏳"
                        label="Pending"
                        value={
                            stats.pending
                        }
                    />

                    <StatCard
                        icon="⚡"
                        label="Emergency"
                        value={
                            stats.emergency_bookings
                        }
                    />

                    <StatCard
                        icon="✓"
                        label="Completed"
                        value={
                            stats.completed
                        }
                    />

                </div>

            )}


            {/* IMPACT */}

            {stats && (

                <section className="impact-card">

                    <div>

                        <span className="eyebrow">
                            BUSINESS IMPACT
                        </span>

                        <h2>
                            FixPro reduces manual
                            coordination.
                        </h2>

                        <p>
                            Automated booking and
                            scheduling help contractors
                            spend less time managing
                            requests manually.
                        </p>

                    </div>


                    <div className="impact-number">

                        <strong>
                            {
                                stats.estimated_manual_hours_saved
                            }
                        </strong>

                        <span>
                            estimated hours saved
                        </span>

                    </div>


                    <div className="impact-number">

                        <strong>
                            {
                                stats.automated_booking_percentage
                            }%
                        </strong>

                        <span>
                            booking automation
                        </span>

                    </div>

                </section>

            )}


            {/* JOBS */}

            <section className="jobs-section">

                <div className="section-heading">

                    <div>

                        <span className="eyebrow">
                            JOB MANAGEMENT
                        </span>

                        <h2>
                            All service requests
                        </h2>

                    </div>

                </div>


                {bookings.length === 0 ? (

                    <div className="empty-state">

                        <div>
                            📋
                        </div>

                        <h3>
                            No bookings yet
                        </h3>

                        <p>
                            New customer requests
                            will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="jobs-grid">

                        {bookings.map(
                            (booking) => (

                                <BookingCard

                                    key={
                                        booking.id
                                    }

                                    booking={
                                        booking
                                    }

                                    onStatusChange={
                                        handleStatusChange
                                    }

                                />

                            )
                        )}

                    </div>

                )}

            </section>

        </main>
    );
}

export default Dashboard;