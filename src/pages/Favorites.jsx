import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="glass-card dark:glass-card-dark rounded-xl p-12 max-w-md mx-auto">
                    <svg className="w-24 h-24 text-red-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        No favorites yet
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start adding products to your favorites to see them here.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold gradient-text">
                    Favorite Products
                </h1>
                <span className="text-gray-600 dark:text-gray-400">
                    {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
