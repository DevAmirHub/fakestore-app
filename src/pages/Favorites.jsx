import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">No products in favorites</h2>
                <p className="text-gray-600">To add, click the favorite button on the products.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-7">Favorite Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
