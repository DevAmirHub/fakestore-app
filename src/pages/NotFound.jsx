import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
            <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-gray-800">404</h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link
                to="/"
                className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
