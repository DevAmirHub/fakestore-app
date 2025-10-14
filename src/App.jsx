import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
    // useEffect(() => {
    //     const testFetch = async () => {
    //         try {
    //             const res = await fetch('https://fakestoreapi.com/products');
    //             const data = await res.json();
    //             console.log('Test fetch:', data);
    //         } catch (err) {
    //             console.error('Fetch error:', err);
    //         }
    //     };
    //     testFetch();
    // }, []);
    return (
        <FavoritesProvider>
            <Router>
                <Navbar />
                <main className="container mx-auto py-8 px-8 bg-white">
                    <Routes>
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </Router>
        </FavoritesProvider>
    );
}

export default App;
