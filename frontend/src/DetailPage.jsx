import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./DetailPage.css";
import"./App.css"

const BACKEND_URL = "http://localhost:8080";

const DetailPage = () => {
    const { id } = useParams();
    const { state: product } = useLocation();

    const [detailData, setDetailData] = useState(null);

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
                    {/* LINKS */}
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

                    {/* RECHTS */}
                    <div className="detail-image">
                        <img
                            src={`${BACKEND_URL}/${product.image}`}
                            alt={detailData.name}
                        />

                        <p>
                            <strong>Preis:</strong>{" "}
                            {detailData.price.toFixed(2).replace(".", ",")} €
                        </p>

                        <button>Zum Warenkorb hinzufügen</button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DetailPage;
