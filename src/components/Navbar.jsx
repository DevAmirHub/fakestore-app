import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">FakeStore</Link>

            <div className="flex items-center gap-6">
                <Link to="/" className="hover:text-gray-200">Home</Link>
                <Link to="/favorites" className="relative hover:text-gray-200">
                    Favorites
                    {favorites.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favorites.length}
            </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
