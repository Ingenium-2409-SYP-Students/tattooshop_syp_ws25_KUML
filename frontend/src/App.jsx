import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startseite from "./Startseite.jsx";
import Katalog from "./Katalog.jsx";

function App() {
    return (
        <Router>
            <Routes>

                {/* Startseite = dein früheres App.jsx */}
                <Route path="/" element={<Startseite />} />

                {/* Katalog-Seite */}
                <Route path="/katalog" element={<Katalog />} />

            </Routes>
        </Router>
    );
}

export default App;