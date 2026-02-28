const CART_STORAGE_KEY = "warenkorb";

export function getCartItems() {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
        return [];
    }

    try {
        return JSON.parse(storedCart);
    } catch (error) {
        console.error("Fehler beim Lesen des Warenkorbs:", error);
        return [];
    }
}

export function addToCart(product) {
    const currentCart = getCartItems();

    const existingProductIndex = currentCart.findIndex(
        (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
        updatedCart = currentCart.map((item, index) =>
            index === existingProductIndex
                ? {
                    ...item,
                    quantity: (item.quantity || 1) + (product.quantity || 1),
                }
                : item
        );
    } else {
        updatedCart = [
            ...currentCart,
            {
                ...product,
                quantity: product.quantity || 1,
            },
        ];
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
}

export function removeFromCart(productId) {
    const currentCart = getCartItems();
    const updatedCart = currentCart.filter((item) => item.id !== productId);

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
}