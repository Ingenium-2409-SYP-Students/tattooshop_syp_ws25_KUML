import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import { getCartItems, removeFromCart } from "./cartStorage.jsx";

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
        () => cartItems.reduce((sum, item) => sum + (item.price || 0), 0),
        [cartItems]
    );

    const handleRemove = (index) => {
        const updatedCart = removeFromCart(index);
        setCartItems(updatedCart);
    };

    return (
        <>
            <Navbar />

            <main className="container">
                <h1>Warenkorb</h1>

                {cartItems.length === 0 ? (
                    <p>Dein Warenkorb ist leer.</p>
                ) : (
                    <>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {cartItems.map((item, index) => (
                                <li
                                    key={`${item.id}-${index}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        borderBottom: "1px solid #ddd",
                                        padding: "1rem 0",
                                    }}
                                >
                                    {item.image && (
                                        <img
                                            src={`${BACKEND_URL}/${item.image}`}
                                            alt={item.name}
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    )}

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0 }}>{item.name}</h3>
                                        <p style={{ margin: "0.25rem 0" }}>
                                            Kategorie: {item.category}
                                        </p>
                                        <p style={{ margin: 0 }}>
                                            Preis: {formatPrice(item.price)}
                                        </p>
                                    </div>

                                    <button onClick={() => handleRemove(index)}>
                                        Entfernen
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <h2>Gesamtsumme: {formatPrice(totalPrice)}</h2>
                    </>
                )}
            </main>
        </>
    );
};

export default Warenkorb;