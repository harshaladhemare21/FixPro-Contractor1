const API_BASE_URL = "http://127.0.0.1:8000";

// =====================================================
// HELPER - HANDLE API RESPONSE
// =====================================================

async function handleResponse(response) {

    const contentType =
        response.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {

        if (typeof data === "object" && data?.detail) {
            throw new Error(
                `API Error ${response.status}: ${data.detail}`
            );
        }

        throw new Error(
            `API Error ${response.status}: ${data || "Request failed"}`
        );
    }

    return data;
}


// =====================================================
// GET ALL BOOKINGS
// =====================================================

export async function getBookings() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/bookings`
        );

        return await handleResponse(response);

    } catch (error) {

        console.error("getBookings error:", error);

        throw new Error(
            `Failed to fetch bookings: ${error.message}`
        );
    }
}


// =====================================================
// ANALYZE CUSTOMER PROBLEM
// =====================================================

export async function analyzeProblem(problem) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/ai/analyze`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    problem: problem
                })
            }
        );

        return await handleResponse(response);

    } catch (error) {

        console.error("analyzeProblem error:", error);

        throw new Error(
            `AI analysis failed: ${error.message}`
        );
    }
}


// =====================================================
// GET AVAILABLE SLOTS
// =====================================================

export async function getAvailableSlots(date) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/availability/${date}`
        );

        return await handleResponse(response);

    } catch (error) {

        console.error("getAvailableSlots error:", error);

        throw new Error(
            `Failed to fetch available slots: ${error.message}`
        );
    }
}


// =====================================================
// CREATE BOOKING
// =====================================================

export async function createBooking(booking) {

    console.log("Creating booking...");
    console.log("Booking data:", booking);
    console.log(
        "POST URL:",
        `${API_BASE_URL}/bookings`
    );

    try {

        const response = await fetch(
            `${API_BASE_URL}/bookings`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(booking)
            }
        );

        console.log(
            "Booking response status:",
            response.status
        );

        return await handleResponse(response);

    } catch (error) {

        console.error(
            "createBooking error:",
            error
        );

        if (error instanceof TypeError) {

            throw new Error(
                "Cannot connect to FixPro backend. Make sure FastAPI is running at http://127.0.0.1:8000"
            );
        }

        throw error;
    }
}


// =====================================================
// UPDATE BOOKING STATUS
// =====================================================

export async function updateBookingStatus(
    bookingId,
    status
) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/bookings/${bookingId}/status`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: status
                })
            }
        );

        return await handleResponse(response);

    } catch (error) {

        console.error(
            "updateBookingStatus error:",
            error
        );

        throw new Error(
            `Failed to update booking: ${error.message}`
        );
    }
}


// =====================================================
// DASHBOARD STATISTICS
// =====================================================

export async function getDashboardStats() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/dashboard/stats`
        );

        return await handleResponse(response);

    } catch (error) {

        console.error(
            "getDashboardStats error:",
            error
        );

        throw new Error(
            `Failed to fetch dashboard statistics: ${error.message}`
        );
    }
}


// =====================================================
// TODAY'S BOOKINGS
// =====================================================

export async function getTodayBookings() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/dashboard/today`
        );

        return await handleResponse(response);

    } catch (error) {

        console.error(
            "getTodayBookings error:",
            error
        );

        throw new Error(
            `Failed to fetch today's bookings: ${error.message}`
        );
    }
}