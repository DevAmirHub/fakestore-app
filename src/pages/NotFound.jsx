import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="glass-card dark:glass-card-dark rounded-xl p-12 max-w-md mx-auto">
                <div className="text-8xl font-bold gradient-text mb-6">404</div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
