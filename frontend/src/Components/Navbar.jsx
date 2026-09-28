function Navbar({ currentPage, setCurrentPage }) {

    return (

        <nav className="navbar">

            <div
                className="logo"
                onClick={() => setCurrentPage("home")}
            >
                <span className="logo-icon">F</span>

                <span>
                    FixPro
                </span>
            </div>


            <div className="nav-links">

                <button
                    className={
                        currentPage === "home"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        setCurrentPage("home")
                    }
                >
                    Home
                </button>


                <button
                    className={
                        currentPage === "booking"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        setCurrentPage("booking")
                    }
                >
                    Book Service
                </button>


                <button
                    className={
                        currentPage === "dashboard"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        setCurrentPage("dashboard")
                    }
                >
                    Contractor Dashboard
                </button>

            </div>

        </nav>
    );
}

export default Navbar;