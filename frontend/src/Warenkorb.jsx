import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import { getCartItems, removeFromCart } from "./cartStorage.jsx";
import "./Warenkorb.css";

const BACKEND_URL = "http://localhost:8080";

const formatPrice = (price) =>
    new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(price);

const Warenkorb = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(getCartItems());
    }, []);

    const totalPrice = useMemo(
        () =>
            cartItems.reduce(
                (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
                0
            ),
        [cartItems]
    );

    const totalQuantity = useMemo(
        () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
        [cartItems]
    );

    const handleRemove = (productId) => {
        const updatedCart = removeFromCart(productId);
        setCartItems(updatedCart);
    };

    return (
        <>
            <Navbar />

            <main className="warenkorb-page">
                <div className="warenkorb-header">
                    <h1>Warenkorb</h1>
                    <p>Hier findest du alle Produkte, die du hinzugefügt hast.</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="warenkorb-empty">
                        <h2>Dein Warenkorb ist leer</h2>
                        <p>Füge ein Produkt hinzu, um es hier zu sehen.</p>
                    </div>
                ) : (
                    <div className="warenkorb-layout">
                        <div className="warenkorb-list">
                            {cartItems.map((item) => (
                                <div className="warenkorb-card" key={item.id}>
                                    <div className="warenkorb-image-wrapper">
                                        {item.image && (
                                            <img
                                                src={`${BACKEND_URL}/${item.image}`}
                                                alt={item.name}
                                                className="warenkorb-image"
                                            />
                                        )}
                                    </div>

                                    <div className="warenkorb-info">
                                        <h3>{item.name}</h3>
                                        <p className="warenkorb-category">
                                            Kategorie: {item.category}
                                        </p>

                                        <div className="warenkorb-details">
                                            <span>Stückzahl: {item.quantity || 1}</span>
                                            <span>
                                                Einzelpreis: {formatPrice(item.price)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="warenkorb-side">
                                        <p className="warenkorb-item-total">
                                            {formatPrice(
                                                (item.price || 0) * (item.quantity || 1)
                                            )}
                                        </p>

                                        <button
                                            className="warenkorb-remove-btn"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Entfernen
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="warenkorb-summary">
                            <h2>Bestellübersicht</h2>

                            <div className="summary-row">
                                <span>Artikel</span>
                                <span>{cartItems.length}</span>
                            </div>

                            <div className="summary-row">
                                <span>Gesamtstücke</span>
                                <span>{totalQuantity}</span>
                            </div>

                            <div className="summary-total">
                                <span>Gesamtsumme</span>
                                <strong>{formatPrice(totalPrice)}</strong>
                            </div>

                            <button className="checkout-btn">
                                Zur Kassa
                            </button>
                        </aside>
                    </div>
                )}
            </main>
        </>
    );
};

export default Warenkorb;