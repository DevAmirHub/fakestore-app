import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById  } from '../api/fakeStore';
import { FavoritesContext } from '../context/FavoritesContext';
import Loader from '../components/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
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

    if (loading) return <Loader />;

    if (!product) return <p className="text-center py-20">product not found!</p>;

    return (
        <div className="container mx-auto py-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 flex justify-center">
                <img src={product.image} alt={product.title} className="h-96 object-contain" />
            </div>

            <div className="md:w-1/2 flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-2xl font-semibold mb-6">${product.price}</p>

                <button
                    onClick={() => isFavorite ? removeFavorite(product.id) : addFavorite(product)}
                    className={`py-3 px-6 rounded text-white ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isFavorite ? 'remove favorite' : 'add to favorite'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
