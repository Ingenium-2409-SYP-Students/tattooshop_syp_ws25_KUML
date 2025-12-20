import { useState } from "react";
import Navbar from "./Navbar";
import "./Katalog.css";

// Basis-URL des Backends für die Bildpfade
const BACKEND_URL = "http://localhost:8080";

const Katalog = ({ products }) => {
    const [activeFilter, setActiveFilter] = useState("alle");

    const handleFilter = (category) => {
        // Setzt den Filter auf Kleinbuchstaben für einen einfachen Vergleich
        setActiveFilter(category.toLowerCase());
    };

    // Produkte filtern: Die Logik ist jetzt AKTIVIERT und nutzt den Category-Namen
    const filteredProducts = activeFilter === "alle"
        ? products
        : products.filter(
            // Filtert die Produkte, deren Kategorie-Name (klein geschrieben) dem aktiven Filter entspricht
            (p) => p.category.name.toLowerCase() === activeFilter
        );

    // Funktion zur Weiterleitung auf eine Detailseite vorbereiten (Platzhalter)
    const handleProductClick = (productId) => {
        // Hier würde die Routing-Logik für die Detailseite eingefügt werden.
        console.log(`Produkt mit ID ${productId} wurde angeklickt.`);
        // Beispiel: navigate(`/products/${productId}`);
    };

    return (
        <>
            <Navbar />

            {/* Filter-Leiste */}
            <div className="filter-bar">
                {/* Die Filter-Links bleiben, die Kategorie-Namen entsprechen den Kategorien im Backend */}
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
                    // ACHTUNG: Der Filter muss dem Category-Namen im Backend entsprechen.
                    // Wenn die Produkte der Kategorie "Schmuck" zugeordnet sind, muss der Filter "schmuck" sein.
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

            <h2>Katalog ({filteredProducts?.length || 0} Produkte)</h2>

            {/* NEUE RESPONSIVE GRID-ANSICHT */}
            <div className="product-grid">
                {filteredProducts?.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleProductClick(product.id)}
                    >
                        {/* 1. Bild */}
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

                        {/* 2. Produktinformationen */}
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-category">
                                Kategorie: {product.category.name}
                            </p>

                            {/* Preis anzeigen (Annahme: Product hat ein price-Feld) */}
                            {/* Wenn Ihre Produkte keinen Preis haben, können Sie diesen Block entfernen */}
                            {product.price && (
                                <p className="product-price">
                                    {new Intl.NumberFormat('de-DE', {
                                        style: 'currency',
                                        currency: 'EUR'
                                    }).format(product.price)}
                                </p>
                            )}

                            {/* Falls kein Preis vorhanden ist, fügen wir einen Platzhalter-Preis ein */}
                            {!product.price && (
                                <p className="product-price-placeholder">Preis auf Anfrage</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Meldung, falls keine Produkte gefunden wurden */}
            {filteredProducts?.length === 0 && (
                <p className="no-products-message">
                    Es wurden keine Produkte für die Kategorie "{activeFilter}" gefunden.
                </p>
            )}
        </>
    );
};

export default Katalog;