import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
       <Link to={`/product/${product.id}`}>
           <div className="bg-white rounded-lg shadow p-4 flex flex-col">
               <img src={product.image} alt={product.title} className="h-48 object-contain mb-4"/>
               <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
               <span className="text-sm font-semibold m-2">{product.category}</span>
               <p className="text-gray-700 mb-2">${product.price}</p>
               <input type="submit" value="P    roduct Details" className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-centr"/>
           </div>
       </Link>
    );
}

export default ProductCard;
