import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="glass-card dark:glass-card-dark rounded-xl p-12 max-w-md mx-auto">
                    <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold gradient-text">
                    Shopping Cart
                </h1>
                <button
                    onClick={clearCart}
                    className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="glass-card dark:glass-card-dark rounded-xl p-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-contain rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                    </p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                        ${item.price}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="w-8 text-center font-semibold text-gray-800 dark:text-white">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="glass-card dark:glass-card-dark rounded-xl p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                            Order Summary
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tax</span>
                                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                            </div>
                            <hr className="border-gray-300 dark:border-gray-600" />
                            <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white">
                                <span>Total</span>
                                <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300 mb-4">
                            Proceed to Checkout
                        </button>
                        
                        <Link
                            to="/"
                            className="block w-full py-3 text-center text-blue-600 hover:text-blue-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
