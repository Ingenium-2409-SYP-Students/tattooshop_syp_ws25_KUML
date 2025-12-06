import { useState } from "react";
import Navbar from "./Navbar";
import "./Katalog.css";

const Katalog = ({ products }) => {
    const [activeFilter, setActiveFilter] = useState("alle");

    const handleFilter = (category) => {
        setActiveFilter(category.toLowerCase());
    };

    // Produkte filtern
    const filteredProducts = products;
    /*
        activeFilter === "alle"
            ? products
            : products.filter(
                (p) => p.category.name.toLowerCase() === activeFilter
            );*/

    return (
        <>
            <Navbar />

            {/* Filter-Leiste */}
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

            <h2>Katalog</h2>

            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Kategorie</th>
                    <th>Beschreibung</th>
                    <th>Bild</th>
                </tr>
                </thead>

                <tbody>
                {filteredProducts?.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                        <td>{product.description}</td>
                        <td>
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            ) : (
                                <span>kein Bild</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Katalog;
