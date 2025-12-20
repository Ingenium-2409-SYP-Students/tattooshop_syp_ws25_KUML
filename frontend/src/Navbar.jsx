import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="main-nav">
            <div className="nav-inner">
                <Link to="/">Tattoo Studio</Link>

                <button
                    className="burger-menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    &#9776;
                </button>

                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><Link to="/katalog">Katalog</Link></li>
                    <li><Link to="/kontakt">Kontakt</Link></li>
                    <li><Link to="/warenkorb">🛒</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
