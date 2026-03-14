import Navbar from "./Navbar";
import "./Kontakt.css";
import { useState } from "react";



const Kontakt = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };
    return (
        <>
            <Navbar />

            <main className="contact-page">
                <div className="contact-container">
                    <h1 className="contact-title">
                        Haben Sie Fragen oder brauchen Hilfe?
                    </h1>

                    <p className="contact-subtitle">
                        Sie erreichen uns direkt per E-Mail oder Telefon
                        oder senden uns bequem eine Nachricht über das Formular.
                    </p>

                    <div className="contact-grid">
                        <section className="contact-info-card">
                            <h2>Kontaktinformationen</h2>
                            <p className="contact-info-text">
                                Wir helfen Ihnen gerne weiter und melden uns so schnell wie möglich.
                            </p>

                            <div className="contact-info-item">
                                <span className="contact-label">E-Mail</span>
                                <a
                                    className="contact-link"
                                    href="mailto:tattoo-shop@beemarked.at"
                                >
                                    tattoo-shop@beemarked.at
                                </a>
                            </div>

                            <div className="contact-info-item">
                                <span className="contact-label">Telefon</span>
                                <a
                                    className="contact-link"
                                    href="tel:06607260281"
                                >
                                    0660 72 60 281
                                </a>
                            </div>
                        </section>

                        <section className="contact-form-card">
                            <h2>Nachricht senden</h2>

                            {!sent ? (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" required />
                                    </div>

                                    <div className="form-group">
                                        <label>E-Mail</label>
                                        <input type="email" required />
                                    </div>

                                    <div className="form-group">
                                        <label>Telefonnummer (optional)</label>
                                        <input type="tel" />
                                    </div>

                                    <div className="form-group">
                                        <label>Nachricht</label>
                                        <textarea rows="5" required />
                                    </div>

                                    <button type="submit" className="contact-btn">
                                        Nachricht senden
                                    </button>
                                </form>
                            ) : (
                                <div className="contact-success">
                                    <h3>Vielen Dank!</h3>
                                    <p>
                                        Danke für Ihre Nachricht.
                                        Wir melden uns in Kürze bei Ihnen.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Kontakt;