import ServiceCard from "../components/ServiceCard";


function Home({ setCurrentPage, setSelectedService }) {

    const services = [

        {
            icon: "🔧",
            title: "Plumbing",
            description:
                "Leaks, taps, pipes, drains and water issues"
        },

        {
            icon: "⚡",
            title: "Electrical",
            description:
                "Switches, wiring, sockets and electrical problems"
        },

        {
            icon: "❄️",
            title: "AC Repair",
            description:
                "Cooling problems, servicing and AC repairs"
        },

        {
            icon: "🪚",
            title: "Carpentry",
            description:
                "Doors, furniture, cabinets and woodwork"
        },

        {
            icon: "🎨",
            title: "Painting",
            description:
                "Wall painting, repainting and colour work"
        },

        {
            icon: "🛠️",
            title: "General Repair",
            description:
                "Other home maintenance and repair services"
        }

    ];


    function chooseService(service) {

        setSelectedService(service);

        setCurrentPage("booking");
    }


    return (

        <main>

            {/* HERO */}

            <section className="hero">

                <div className="hero-content">

                    <span className="hero-badge">
                        ⚡ Smart Contractor Management
                    </span>

                    <h1>
                        Home repairs,
                        <br />

                        <span>
                            made simple.
                        </span>
                    </h1>

                    <p>
                        Describe your problem, choose a
                        convenient time, and let FixPro
                        handle the rest.
                    </p>


                    <div className="hero-buttons">

                        <button
                            className="primary-button"
                            onClick={() =>
                                setCurrentPage("booking")
                            }
                        >
                            Book a Service →
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() =>
                                setCurrentPage("dashboard")
                            }
                        >
                            Contractor Dashboard
                        </button>

                    </div>

                </div>


                <div className="hero-card">

                    <div className="hero-card-top">

                        <span>
                            Today's Overview
                        </span>

                        <span className="live-dot">
                            ● Live
                        </span>

                    </div>

                    <div className="hero-stat">

                        <strong>
                            12
                        </strong>

                        <span>
                            Jobs scheduled today
                        </span>

                    </div>

                    <div className="hero-stat">

                        <strong>
                            3
                        </strong>

                        <span>
                            High priority requests
                        </span>

                    </div>

                    <div className="hero-stat">

                        <strong>
                            94%
                        </strong>

                        <span>
                            Booking efficiency
                        </span>

                    </div>

                </div>

            </section>


            {/* SERVICES */}

            <section className="services-section">

                <div className="section-heading">

                    <div>

                        <span className="eyebrow">
                            SERVICES
                        </span>

                        <h2>
                            What do you need help with?
                        </h2>

                    </div>

                    <p>
                        Select a service to get started.
                    </p>

                </div>


                <div className="services-grid">

                    {services.map(
                        (service) => (

                            <ServiceCard

                                key={service.title}

                                icon={service.icon}

                                title={service.title}

                                description={
                                    service.description
                                }

                                onClick={() =>
                                    chooseService(
                                        service.title
                                    )
                                }

                            />

                        )
                    )}

                </div>

            </section>


            {/* HOW IT WORKS */}

            <section className="how-section">

                <span className="eyebrow">
                    HOW IT WORKS
                </span>

                <h2>
                    From problem to solution
                </h2>


                <div className="steps">

                    <div className="step">

                        <div className="step-number">
                            1
                        </div>

                        <h3>
                            Describe
                        </h3>

                        <p>
                            Tell us what's wrong in
                            your own words.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            2
                        </div>

                        <h3>
                            Smart Analysis
                        </h3>

                        <p>
                            FixPro identifies the service
                            and urgency.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            3
                        </div>

                        <h3>
                            Book
                        </h3>

                        <p>
                            Choose an available time slot.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            4
                        </div>

                        <h3>
                            Get It Fixed
                        </h3>

                        <p>
                            Your contractor handles the job.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;