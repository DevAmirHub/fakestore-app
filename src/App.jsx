import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <FavoritesProvider>
                    <ToastProvider>
                        <ErrorBoundary>
                            <Router>
                                <ScrollToTop />
                                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
                                    <Navbar />
                                    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                                        <Routes>
                                            <Route path="/product/:id" element={<ProductDetail />} />
                                            <Route path="/favorites" element={<Favorites />} />
                                            <Route path="/cart" element={<Cart />} />
                                            <Route path="/" element={<Home />} />
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                    </main>
                                    <BackToTop />
                                </div>
                            </Router>
                        </ErrorBoundary>
                    </ToastProvider>
                </FavoritesProvider>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
