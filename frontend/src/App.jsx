import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startseite from "./Startseite.jsx";
import Katalog from "./Katalog.jsx";
import Kontakt from "./Kontakt.jsx";
import Warenkorb from "./Warenkorb.jsx";
import ProductManager from "./ProduktManager.jsx";
import DetailPage from "./DetailPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Startseite />} />
                <Route path="/katalog" element={<ProductManager />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/warenkorb" element={<Warenkorb />} />
                <Route path="/produkt/:id" element={<DetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
