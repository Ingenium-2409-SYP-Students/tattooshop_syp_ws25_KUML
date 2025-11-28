import {useEffect, useState} from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";

function ProductManager({products}) {
    // initialize expenses as empty array
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto", fontFamily: "Arial" }}>

            <ProductTable products={products}  />
        </div>
    );

}

export default ProductManager;