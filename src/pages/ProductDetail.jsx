import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/fakeStore';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { addToCart } = useCart();
    const isFavorite = favorites.some(p => p.id === Number(id));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating.rate);
        const hasHalfStar = rating.rate % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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

    if (loading) return <Loader />;

    if (!product) {
        return (
            <div className="text-center py-20">
                <div className="glass-card dark:glass-card-dark rounded-xl p-12 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        Product not found!
                    </h2>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors duration-300"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="glass-card dark:glass-card-dark rounded-xl p-8">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-96 object-contain rounded-lg" 
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            {product.title}
                        </h1>
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-purple-900 text-blue-800 dark:text-purple-200 rounded-full text-sm font-medium">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            {renderStars(product.rating)}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                            {product.rating.rate} ({product.rating.count} reviews)
                        </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                        ${product.price}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-800 dark:text-white text-lg">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            <span>Add to Cart</span>
                        </button>

                        <button
                            onClick={() => isFavorite ? removeFavorite(product.id) : addFavorite(product)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 ${
                                isFavorite 
                                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                            }`}
                        >
                            {isFavorite ? (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span>Remove from Favorites</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>Add to Favorites</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
