const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async () => {
    try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Fetch products error:', err);
        return [];
    }
};

// اضافه کردن getProductById
export const getProductById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Fetch product error:', err);
        return null;
    }
};
