import React, { useState } from 'react';
import './App.css';

const Startseite = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="main-nav">
                <a href="/" id="menuHome">Tattoo Studio</a>

                <button
                    className="burger-menu"
                    aria-label="Menü öffnen"
                    onClick={toggleMenu}
                >
                    &#9776;
                </button>

                <ul>

                    <li><a href="/katalog">Katalog</a></li>
                    <li><a href="/kontakt">Kontakt</a></li>

                    <li>
                        <a href="/warenkorb" aria-label="Warenkorb" className="cart-icon-link">🛒</a>
                    </li>
                </ul>
            </nav>

            <main className="container">
                <h1>Ihr Professioneller Tattoo Shop</h1>
                <img src="src/assets/img.png" alt="Tattoo" id="tattooImg" />
                <p>I'm baby kinfolk hoodie chartreuse austin, franzen food truck iPhone.</p>
                <p>Twee waistcoat tofu crucifix meditation, direct trade yr mixtape next level actually.</p>
            </main>
        </header>
    );
};

export default Startseite;