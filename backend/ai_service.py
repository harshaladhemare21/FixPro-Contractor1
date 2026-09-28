# =========================================================
# FIXPRO AI SERVICE
# =========================================================
#
# This is the first version of the AI layer.
#
# It does not require an API key.
#
# Later we can replace this function with Google Gemini
# without changing the booking architecture.
# =========================================================


def analyze_problem(problem: str):

    text = problem.lower()

    # -----------------------------------------------------
    # DEFAULT VALUES
    # -----------------------------------------------------

    detected_service = "General Home Repair"

    urgency = "Normal"

    emergency = False

    recommendation = (
        "Standard contractor appointment recommended."
    )

    # -----------------------------------------------------
    # PLUMBING
    # -----------------------------------------------------

    plumbing_words = [

        "tap",

        "faucet",

        "pipe",

        "water",

        "leak",

        "leaking",

        "drain",

        "toilet",

        "sink"

    ]

    if any(
        word in text
        for word in plumbing_words
    ):

        detected_service = "Plumbing"

    # -----------------------------------------------------
    # ELECTRICAL
    # -----------------------------------------------------

    electrical_words = [

        "electric",

        "electricity",

        "switch",

        "socket",

        "wire",

        "wiring",

        "power",

        "spark",

        "short circuit",

        "fan"

    ]

    if any(
        word in text
        for word in electrical_words
    ):

        detected_service = "Electrical"

    # -----------------------------------------------------
    # AC
    # -----------------------------------------------------

    ac_words = [

        "ac",

        "air conditioner",

        "cooling",

        "not cooling",

        "compressor",

        "air conditioning"

    ]

    if any(
        word in text
        for word in ac_words
    ):

        detected_service = "AC Repair"

    # -----------------------------------------------------
    # CARPENTRY
    # -----------------------------------------------------

    carpentry_words = [

        "door",

        "wood",

        "furniture",

        "cabinet",

        "drawer",

        "table",

        "chair"

    ]

    if any(
        word in text
        for word in carpentry_words
    ):

        detected_service = "Carpentry"

    # -----------------------------------------------------
    # PAINTING
    # -----------------------------------------------------

    painting_words = [

        "paint",

        "painting",

        "wall",

        "colour",

        "color",

        "repaint"

    ]

    if any(
        word in text
        for word in painting_words
    ):

        detected_service = "Painting"

    # -----------------------------------------------------
    # EMERGENCY DETECTION
    # -----------------------------------------------------

    emergency_words = [

        "emergency",

        "urgent",

        "sparking",

        "spark",

        "fire",

        "flood",

        "burst pipe",

        "gas leak",

        "danger",

        "short circuit"

    ]

    if any(
        word in text
        for word in emergency_words
    ):

        urgency = "Urgent"

        emergency = True

        recommendation = (
            "Priority contractor response recommended."
        )

    # -----------------------------------------------------
    # NORMAL CASE
    # -----------------------------------------------------

    if not emergency:

        recommendation = (
            f"Schedule a standard "
            f"{detected_service} appointment."
        )

    # -----------------------------------------------------
    # RETURN AI RESULT
    # -----------------------------------------------------

    return {

        "detected_service":
            detected_service,

        "urgency":
            urgency,

        "emergency":
            emergency,

        "recommendation":
            recommendation

    }