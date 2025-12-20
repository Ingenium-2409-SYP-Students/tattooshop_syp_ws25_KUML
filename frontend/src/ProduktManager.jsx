import {useEffect, useState} from "react";
import Katalog from "./Katalog.jsx";

function ProductManager() {
    // initialize expenses as empty array
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                console.log(data)
            });
    }, []);

    return (
        <div style={{ fontFamily: "Arial" }}>

            <Katalog products={products}  />
        </div>
    );

}

export default ProductManager;