import { useEffect, useState } from "react";

import {
    analyzeProblem,
    getAvailableSlots,
    createBooking
} from "../api";


function Booking({
    selectedService,
    setCurrentPage,
    setBookingResult
}) {

    const [problem, setProblem] = useState("");

    const [analysis, setAnalysis] = useState(null);

    const [loadingAI, setLoadingAI] = useState(false);

    const [date, setDate] = useState("");

    const [time, setTime] = useState("");

    const [slots, setSlots] = useState([]);

    const [loadingSlots, setLoadingSlots] =
        useState(false);

    const [form, setForm] = useState({

        customer_name: "",

        phone: "",

        email: "",

        address: ""

    });

    const [error, setError] = useState("");

    const [submitting, setSubmitting] =
        useState(false);


    // -------------------------------------------------
    // UPDATE FORM
    // -------------------------------------------------

    function updateForm(event) {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value

        });
    }


    // -------------------------------------------------
    // AI ANALYSIS
    // -------------------------------------------------

    async function handleAnalyze() {

        if (!problem.trim()) {

            setError(
                "Please describe your problem first."
            );

            return;
        }

        setError("");

        setLoadingAI(true);

        try {

            const result =
                await analyzeProblem(problem);

            setAnalysis(result);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoadingAI(false);

        }
    }


    // -------------------------------------------------
    // GET AVAILABLE SLOTS
    // -------------------------------------------------

    useEffect(() => {

        if (!date) {

            setSlots([]);

            return;

        }


        async function loadSlots() {

            setLoadingSlots(true);

            try {

                const result =
                    await getAvailableSlots(date);

                setSlots(
                    result.available_slots
                );

                setTime("");

            } catch (err) {

                setError(
                    "Unable to load available slots."
                );

            } finally {

                setLoadingSlots(false);

            }
        }


        loadSlots();

    }, [date]);


    // -------------------------------------------------
    // SUBMIT BOOKING
    // -------------------------------------------------

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");


        if (!analysis) {

            setError(
                "Please analyze the problem first."
            );

            return;
        }


        if (!time) {

            setError(
                "Please select a time slot."
            );

            return;
        }


        setSubmitting(true);


        try {

            const booking =
                await createBooking({

                    customer_name:
                        form.customer_name,

                    phone:
                        form.phone,

                    email:
                        form.email || null,

                    service:
                        selectedService ||
                        analysis.detected_service,

                    problem:
                        problem,

                    address:
                        form.address,

                    booking_date:
                        date,

                    booking_time:
                        time,

                    emergency:
                        analysis.emergency

                });


            setBookingResult(booking);

            setCurrentPage(
                "confirmation"
            );


        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setSubmitting(false);

        }

    }


    return (

        <main className="booking-page">

            <div className="booking-header">

                <span className="eyebrow">
                    BOOK A SERVICE
                </span>

                <h1>
                    Tell us what needs fixing
                </h1>

                <p>
                    Describe the problem in your
                    own words. FixPro will analyze
                    it and help you choose a slot.
                </p>

            </div>


            <div className="booking-layout">

                {/* LEFT SIDE */}

                <section className="booking-card">

                    <div className="form-section">

                        <label>
                            What is the problem?
                        </label>

                        <textarea
                            value={problem}
                            onChange={(e) =>
                                setProblem(
                                    e.target.value
                                )
                            }
                            placeholder="Example: My kitchen tap is leaking continuously..."
                            rows="5"
                        />

                        <button
                            type="button"
                            className="ai-button"
                            onClick={
                                handleAnalyze
                            }
                            disabled={loadingAI}
                        >

                            {loadingAI
                                ? "Analyzing..."
                                : "✨ Analyze with FixPro AI"}

                        </button>

                    </div>


                    {/* AI RESULT */}

                    {analysis && (

                        <div
                            className={
                                analysis.emergency
                                    ? "ai-result emergency"
                                    : "ai-result"
                            }
                        >

                            <div className="ai-result-title">

                                <span>
                                    ✨ Smart Analysis
                                </span>

                                {analysis.emergency && (
                                    <span className="emergency-badge">
                                        URGENT
                                    </span>
                                )}

                            </div>


                            <div className="analysis-grid">

                                <div>

                                    <small>
                                        Detected Service
                                    </small>

                                    <strong>
                                        {analysis.detected_service}
                                    </strong>

                                </div>


                                <div>

                                    <small>
                                        Urgency
                                    </small>

                                    <strong>
                                        {analysis.urgency}
                                    </strong>

                                </div>


                                <div>

                                    <small>
                                        Priority
                                    </small>

                                    <strong>
                                        {analysis.emergency
                                            ? "High"
                                            : "Normal"}
                                    </strong>

                                </div>

                            </div>


                            <p>
                                {analysis.recommendation}
                            </p>

                        </div>

                    )}


                    {/* CUSTOMER DETAILS */}

                    <div className="form-section">

                        <h3>
                            Your details
                        </h3>


                        <div className="form-grid">

                            <div>

                                <label>
                                    Full Name
                                </label>

                                <input
                                    name="customer_name"
                                    value={
                                        form.customer_name
                                    }
                                    onChange={
                                        updateForm
                                    }
                                    placeholder="Your name"
                                    required
                                />

                            </div>


                            <div>

                                <label>
                                    Phone
                                </label>

                                <input
                                    name="phone"
                                    value={
                                        form.phone
                                    }
                                    onChange={
                                        updateForm
                                    }
                                    placeholder="9876543210"
                                    required
                                />

                            </div>

                        </div>


                        <div>

                            <label>
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={
                                    form.email
                                }
                                onChange={
                                    updateForm
                                }
                                placeholder="you@example.com"
                            />

                        </div>


                        <div>

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={
                                    form.address
                                }
                                onChange={
                                    updateForm
                                }
                                placeholder="Where should the contractor visit?"
                                rows="3"
                                required
                            />

                        </div>

                    </div>


                    {/* DATE AND TIME */}

                    <div className="form-section">

                        <h3>
                            Choose a time
                        </h3>


                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                )
                            }
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            required
                        />


                        {date && (

                            <div className="slot-area">

                                <label>
                                    Available slots
                                </label>


                                {loadingSlots ? (

                                    <p>
                                        Loading available
                                        slots...
                                    </p>

                                ) : slots.length === 0 ? (

                                    <p className="no-slots">
                                        No slots available
                                        for this date.
                                    </p>

                                ) : (

                                    <div className="slot-grid">

                                        {slots.map(
                                            (slot) => (

                                                <button
                                                    type="button"
                                                    key={slot}
                                                    className={
                                                        time === slot
                                                            ? "slot selected"
                                                            : "slot"
                                                    }
                                                    onClick={() =>
                                                        setTime(
                                                            slot
                                                        )
                                                    }
                                                >
                                                    {slot}
                                                </button>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                        )}

                    </div>


                    {error && (

                        <div className="error-message">
                            ⚠️ {error}
                        </div>

                    )}


                    <button
                        className="primary-button full-width"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >

                        {submitting
                            ? "Creating Booking..."
                            : "Confirm Booking →"}

                    </button>

                </section>


                {/* RIGHT SIDE */}

                <aside className="booking-summary">

                    <div className="summary-card">

                        <span className="eyebrow">
                            YOUR REQUEST
                        </span>

                        <h3>
                            {selectedService ||
                                analysis?.detected_service ||
                                "Home Service"}
                        </h3>


                        <div className="summary-row">

                            <span>
                                Service
                            </span>

                            <strong>
                                {analysis?.detected_service ||
                                    selectedService ||
                                    "—"}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Urgency
                            </span>

                            <strong>
                                {analysis?.urgency ||
                                    "Not analyzed"}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Date
                            </span>

                            <strong>
                                {date || "Not selected"}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Time
                            </span>

                            <strong>
                                {time || "Not selected"}
                            </strong>

                        </div>

                    </div>


                    <div className="trust-card">

                        <strong>
                            Why FixPro?
                        </strong>

                        <p>
                            Smart problem classification,
                            real-time availability and
                            a simple contractor workflow.
                        </p>

                    </div>

                </aside>

            </div>

        </main>
    );
}

export default Booking;