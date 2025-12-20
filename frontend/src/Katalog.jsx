import { useState } from "react";
import Navbar from "./Navbar";
import "./Katalog.css";
import { Link } from "react-router-dom";

const BACKEND_URL = "http://localhost:8080";

const Katalog = ({ products }) => {
    const [activeFilter, setActiveFilter] = useState("alle");

    const filteredProducts =
        activeFilter === "alle"
            ? products
            : products.filter(
                (p) => p.category.name.toLowerCase() === activeFilter
            );

    return (
        <>
            <Navbar />

            <div className="page-wrapper">
                <div className="filter-bar">
                    <span
                        className={`filter-link ${activeFilter === "piercing" ? "active" : ""}`}
                        onClick={() => setActiveFilter("piercing")}
                    >
                        Piercing
                    </span>
                    <span
                        className={`filter-link ${activeFilter === "tattoo" ? "active" : ""}`}
                        onClick={() => setActiveFilter("tattoo")}
                    >
                        Tattoo
                    </span>
                    <span
                        className={`filter-link ${activeFilter === "schmuck" ? "active" : ""}`}
                        onClick={() => setActiveFilter("schmuck")}
                    >
                        Schmuck
                    </span>
                    <span
                        className={`filter-link ${activeFilter === "alle" ? "active" : ""}`}
                        onClick={() => setActiveFilter("alle")}
                    >
                        Alle
                    </span>
                </div>

                <h2>Katalog ({filteredProducts.length} Produkte)</h2>

                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link
                                to={`/produkt/${product.id}`}
                                state={product}
                            >
                            <div className="product-image-container">
                                {product.image ? (
                                    <img
                                        src={`${BACKEND_URL}/${product.image}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                ) : (
                                    <span className="no-image">Kein Bild</span>
                                )}
                            </div>
                            </Link>

                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-category">
                                    Kategorie: {product.category.name}
                                </p>

                                {product.price ? (
                                    <p className="product-price">
                                        {new Intl.NumberFormat("de-DE", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(product.price)}
                                    </p>
                                ) : (
                                    <p className="product-price-placeholder">
                                        Preis auf Anfrage
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Katalog;
