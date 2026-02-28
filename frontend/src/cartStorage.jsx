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
    const updatedCart = [...currentCart, product];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
}

export function removeFromCart(indexToRemove) {
    const currentCart = getCartItems();
    const updatedCart = currentCart.filter((_, index) => index !== indexToRemove);

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
}