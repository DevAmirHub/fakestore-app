import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/fakeStore';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import Loader from '../components/Loader';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log(data);
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
        }
        fetchProducts();
    }, []);

    const handleFilterChange = (filters) => {
        let filtered = [...products];

        // Search filter
        if (filters.search) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Category filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Price range filter
        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => {
                if (max) {
                    return product.price >= min && product.price <= max;
                } else {
                    return product.price >= min;
                }
            });
        }

        // Rating filter
        if (filters.rating !== 'all') {
            const minRating = parseFloat(filters.rating.replace('+', ''));
            filtered = filtered.filter(product => product.rating.rate >= minRating);
        }

        setFilteredProducts(filtered);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold gradient-text mb-4">
                    Welcome to FakeStore
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Discover amazing products with our modern shopping experience
                </p>
            </div>

            <ProductFilter 
                products={products} 
                onFilterChange={handleFilterChange} 
            />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Products ({filteredProducts.length})
                </h2>
            </div>

            <ProductList products={filteredProducts} />
        </div>
    );
}

export default Home;
