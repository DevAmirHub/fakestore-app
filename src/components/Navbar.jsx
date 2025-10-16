import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);
    const { getCartItemsCount } = useCart();
    const { isDark, toggleTheme } = useTheme();

    return (
        <nav className="glass dark:glass-dark sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold gradient-text">
                FakeStore
            </Link>

            <div className="flex items-center gap-6">
                <Link 
                    to="/" 
                    className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                    Home
                </Link>
                
                <Link 
                    to="/favorites" 
                    className="relative hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                    Favorites
                    {favorites.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce-gentle">
                            {favorites.length}
                        </span>
                    )}
                </Link>

                <Link 
                    to="/cart" 
                    className="relative hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                    Cart
                    {getCartItemsCount() > 0 && (
                        <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce-gentle">
                            {getCartItemsCount()}
                        </span>
                    )}
                </Link>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg glass-card dark:glass-card-dark hover:shadow-glow transition-all duration-300"
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
