import React, { useState } from 'react';

const ProductFilter = ({ products, onFilterChange }) => {
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        rating: 'all',
        search: ''
    });

    const categories = ['all', ...new Set(products.map(p => p.category))];
    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '0-25', label: '$0 - $25' },
        { value: '25-50', label: '$25 - $50' },
        { value: '50-100', label: '$50 - $100' },
        { value: '100+', label: '$100+' }
    ];
    const ratings = [
        { value: 'all', label: 'All Ratings' },
        { value: '4+', label: '4+ Stars' },
        { value: '3+', label: '3+ Stars' },
        { value: '2+', label: '2+ Stars' }
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            category: 'all',
            priceRange: 'all',
            rating: 'all',
            search: ''
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    return (
        <div className="glass-card dark:glass-card-dark p-6 rounded-xl mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Filter Products
                </h3>
                <button
                    onClick={clearFilters}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Range
                    </label>
                    <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                        {priceRanges.map(range => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rating
                    </label>
                    <select
                        value={filters.rating}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                        {ratings.map(rating => (
                            <option key={rating.value} value={rating.value}>
                                {rating.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
