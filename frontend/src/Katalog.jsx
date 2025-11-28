import { useState } from "react";
import Navbar from "./Navbar";

const Katalog = () => {

    const [activeFilter, setActiveFilter] = useState("alle");

    const handleFilter = (category) => {
        if (category === "piercing") {
            setActiveFilter("piercing");
        } else if (category === "tattoo") {
            setActiveFilter("tattoo");
        } else if (category === "schmuck") {
            setActiveFilter("schmuck");
        } else {
            setActiveFilter("alle");
        }
    };

    return (
        <>
            <Navbar />

            <div className="filter-bar">

                <span
                    className={`filter-link ${activeFilter === "piercing" ? "active" : ""}`}
                    onClick={() => handleFilter("piercing")}
                >
                    Piercing
                </span>

                <span
                    className={`filter-link ${activeFilter === "tattoo" ? "active" : ""}`}
                    onClick={() => handleFilter("tattoo")}
                >
                    Tattoo
                </span>

                <span
                    className={`filter-link ${activeFilter === "schmuck" ? "active" : ""}`}
                    onClick={() => handleFilter("schmuck")}
                >
                    Schmuck
                </span>

                <span
                    className={`filter-link ${activeFilter === "alle" ? "active" : ""}`}
                    onClick={() => handleFilter("alle")}
                >
                    Alle
                </span>
            </div>

            <main className="container">
                <h1>Produkte erscheinen hier</h1>
                <p>Aktiver Filter: <strong>{activeFilter}</strong></p>
            </main>
        </>
    );
};

export default Katalog;
