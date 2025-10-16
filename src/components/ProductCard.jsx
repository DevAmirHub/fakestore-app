import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { addToCart } = useCart();
    const { addToast } = useToast();
    
    const isFavorite = favorites.some(fav => fav.id === product.id);
    
    const handleFavoriteToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite(product.id);
            addToast('Removed from favorites', 'info');
        } else {
            addFavorite(product);
            addToast('Added to favorites', 'success');
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        addToast('Added to cart', 'success');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating.rate);
        const hasHalfStar = rating.rate % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        
        return stars;
    };

    return (
        <div className="glass-card dark:glass-card-dark rounded-xl p-4 flex flex-col h-full hover:shadow-glow transition-all duration-300 group">
            <div className="relative mb-4">
                <Link to={`/product/${product.id}`}>
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="h-48 w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <button
                    onClick={handleFavoriteToggle}
                    className="absolute top-2 right-2 p-2 rounded-full glass-card dark:glass-card-dark hover:shadow-glow transition-all duration-300"
                >
                    {isFavorite ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="flex-1 flex flex-col">
                <Link to={`/product/${product.id}`} className="flex-1">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                        {product.title}
                    </h2>
                    <span className="text-sm text-blue-600 dark:text-purple-400 font-medium mb-2 block">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                </Link>

                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        ({product.rating.count})
                    </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${product.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(ProductCard);
