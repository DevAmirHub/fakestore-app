import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="glass-card dark:glass-card-dark rounded-xl p-8 flex flex-col items-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                    Loading products...
                </p>
            </div>
        </div>
    );
}

export default Loader;
