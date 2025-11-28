import Navbar from "./Navbar";

const Kontakt = () => {
    return (
        <>
            <Navbar />

            <main className="container">
                <h1>Haben Sie Fragen oder brauchen Hilfe?</h1>

                <p>Sie erreichen uns unter</p>

                <a href="mailto:tattoo-shop@beemarked.at">
                    tattoo-shop@beemarked.at
                </a>

                <p>oder per Telefon:</p>

                <a href="tel:06607260281">
                    0660 72 60 281
                </a>
            </main>

        </>
    );
};

export default Kontakt;
