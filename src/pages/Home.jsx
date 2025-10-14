import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/fakeStore';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log(data);
            setProducts(data);
            setLoading(false);
        }
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto py-8">
            {loading ? <Loader /> : <ProductList products={products} />}
        </div>
    );
}

export default Home;
