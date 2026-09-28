import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Booking from "./pages/Booking";

import Confirmation from "./pages/Confirmation";

import Dashboard from "./pages/Dashboard";


function App() {

    const [currentPage, setCurrentPage] =
        useState("home");


    const [selectedService, setSelectedService] =
        useState("");


    const [bookingResult, setBookingResult] =
        useState(null);


    function renderPage() {

        switch (currentPage) {

            case "booking":

                return (

                    <Booking

                        selectedService={
                            selectedService
                        }

                        setCurrentPage={
                            setCurrentPage
                        }

                        setBookingResult={
                            setBookingResult
                        }

                    />

                );


            case "confirmation":

                return (

                    <Confirmation

                        booking={
                            bookingResult
                        }

                        setCurrentPage={
                            setCurrentPage
                        }

                    />

                );


            case "dashboard":

                return (
                    <Dashboard />
                );


            case "home":

            default:

                return (

                    <Home

                        setCurrentPage={
                            setCurrentPage
                        }

                        setSelectedService={
                            setSelectedService
                        }

                    />

                );

        }

    }


    return (

        <div className="app">

            <Navbar

                currentPage={
                    currentPage
                }

                setCurrentPage={
                    setCurrentPage
                }

            />

            {renderPage()}


            <footer className="footer">

                <strong>
                    FixPro
                </strong>

                <span>
                    Smart contractor management
                    made simple.
                </span>

            </footer>

        </div>

    );
}

export default App;