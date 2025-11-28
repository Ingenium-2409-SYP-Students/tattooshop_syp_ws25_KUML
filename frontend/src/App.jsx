import React, { useState } from 'react';
import './index.css'; // Importiere das CSS

const MobileFriendlyNav = () => {
    // State, um zu verfolgen, ob das mobile Menü geöffnet ist oder nicht
    const [isOpen, setIsOpen] = useState(false);

    // Funktion, die den Status umschaltet, wenn der Burger-Button geklickt wird
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="main-nav">
                {/* Logo oder Name des Studios */}
                <a href="/App.jsx" id={"menuHome"}>Tattoo Studio</a>

                {/* Der Burger-Button (wird nur auf Mobile sichtbar) */}
                <button
                    className="burger-menu"
                    aria-label="Menü öffnen"
                    onClick={toggleMenu}
                >
                    &#9776; {/* Das Burger-Icon */}
                </button>

                {/* Die Navigationslinks */}
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>

                    <li><a href="/katalog">Katalog</a></li>
                    <li><a href="/kontakt">Kontakt</a></li>

                    {/* Der Warenkorb-Icon */}
                    <li><a href="/warenkorb" aria-label="Warenkorb" className="cart-icon-link">🛒</a></li>
                </ul>
            </nav>
        </header>

    );
};

export default MobileFriendlyNav;