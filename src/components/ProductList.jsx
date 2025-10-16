import React, { memo } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="glass-card dark:glass-card-dark rounded-xl p-12 max-w-md mx-auto">
                    <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        No products found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your filters to see more products.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default memo(ProductList);
