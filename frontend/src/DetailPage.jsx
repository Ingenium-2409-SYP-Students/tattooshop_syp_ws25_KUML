import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./DetailPage.css";
import "./App.css";
import { addToCart } from "./cartStorage.jsx";

const BACKEND_URL = "http://localhost:8080";

const DetailPage = () => {
    const { id } = useParams();
    const { state: product } = useLocation();

    const [detailData, setDetailData] = useState(null);
    const [addedMessage, setAddedMessage] = useState("");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        fetch("/product-details.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((entry) => entry.productId === Number(id));
                setDetailData(found);
            })
            .catch((err) => console.error("Fehler beim Laden der JSON:", err));
    }, [id]);

    const handleAddToCart = () => {
        if (!product || !detailData) return;

        addToCart({
            id: product.id,
            name: detailData.name,
            price: detailData.price,
            image: product.image,
            category: product.category?.name ?? "Unbekannt",
            quantity: qty, // <-- NEU
        });

        setAddedMessage(`Produkt wurde ${qty}× zum Warenkorb hinzugefügt.`);
        setTimeout(() => setAddedMessage(""), 2500);
    };

    const decQty = () => setQty((q) => Math.max(1, q - 1));
    const incQty = () => setQty((q) => Math.min(99, q + 1));
    const onQtyInput = (e) => {
        const v = Number(e.target.value);
        if (Number.isNaN(v)) return;
        setQty(Math.max(1, Math.min(99, v)));
    };

    if (!product || !detailData) {
        return (
            <>
                <Navbar />
                <main className="container">
                    <p>Lade Produktdetails…</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container detail-page">
                <div className="detail-card">
                    <div className="detail-grid">
                        {/* LINKS: Großes Bild */}
                        <section className="detail-left">
                            <div className="detail-imageWrap">
                                <img
                                    className="detail-image"
                                    src={`${BACKEND_URL}/${product.image}`}
                                    alt={detailData.name}
                                />
                            </div>
                        </section>

                        {/* RECHTS: Preis + Menge + Button + Accordions */}
                        <section className="detail-right">
                            <h1 className="detail-title">{detailData.name}</h1>

                            <div className="detail-priceRow">
                                <span className="detail-priceLabel">Preis</span>
                                <span className="detail-priceValue">
                  {detailData.price.toFixed(2).replace(".", ",")} €
                </span>
                            </div>

                            <div className="detail-buyRow">
                                <div className="qty">
                                    <button type="button" className="qty-btn" onClick={decQty} aria-label="Minus">
                                        –
                                    </button>
                                    <input
                                        className="qty-input"
                                        type="number"
                                        min="1"
                                        max="99"
                                        value={qty}
                                        onChange={onQtyInput}
                                    />
                                    <button type="button" className="qty-btn" onClick={incQty} aria-label="Plus">
                                        +
                                    </button>
                                </div>

                                <button className="add-btn" onClick={handleAddToCart}>
                                    In den Warenkorb
                                </button>
                            </div>

                            {addedMessage && <p className="added-msg">{addedMessage}</p>}

                            {/* AUSKLAPPBAR: Beschreibung */}
                            <details className="accordion" open>
                                <summary>Beschreibung</summary>
                                <div className="accordion-content">
                                    <p className="detail-desc">{detailData.longDescription}</p>
                                </div>
                            </details>

                            {/* AUSKLAPPBAR: Details */}
                            <details className="accordion">
                                <summary>Produktdetails</summary>
                                <div className="accordion-content">
                                    <ul className="detail-list">
                                        {Object.entries(detailData.details).map(([key, value]) => (
                                            <li key={key} className="detail-listItem">
                                                <span className="detail-key">{key}</span>
                                                <span className="detail-val">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DetailPage;