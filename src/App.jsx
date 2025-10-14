  import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts y Componentes
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const API_URL = 'https://fakestoreapi.com/products';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener los productos.');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === productToAdd.id);
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems => prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MainLayout cartItemCount={cartItemCount}>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage products={products} loading={loading} error={error} onAddToCart={handleAddToCart} />} 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/products" 
          element={<ProductsPage products={products} loading={loading} error={error} onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/product/:productId" 
          element={<ProductDetailPage onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<CartPage cartItems={cartItems} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} 
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;