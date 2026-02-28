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

    useEffect(() => {
        fetch("/product-details.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find(
                    (entry) => entry.productId === Number(id)
                );
                setDetailData(found);
            })
            .catch((err) => console.error("Fehler beim Laden der JSON:", err));
    }, [id]);

    const handleAddToCart = () => {
        if (!product || !detailData) {
            return;
        }

        addToCart({
            id: product.id,
            name: detailData.name,
            price: detailData.price,
            image: product.image,
            category: product.category?.name ?? "Unbekannt",
        });

        setAddedMessage("Produkt wurde zum Warenkorb hinzugefügt.");
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

            <main className="container">
                <h1>{detailData.name}</h1>

                <div className="detail-layout">
                    <div className="detail-text">
                        <p>{detailData.longDescription}</p>

                        <ul>
                            {Object.entries(detailData.details).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="detail-image">
                        <img
                            src={`${BACKEND_URL}/${product.image}`}
                            alt={detailData.name}
                        />

                        <p>
                            <strong>Preis:</strong>{" "}
                            {detailData.price.toFixed(2).replace(".", ",")} €
                        </p>

                        <button onClick={handleAddToCart}>
                            Zum Warenkorb hinzufügen
                        </button>

                        {addedMessage && <p>{addedMessage}</p>}
                    </div>
                </div>
            </main>
        </>
    );
};

export default DetailPage;