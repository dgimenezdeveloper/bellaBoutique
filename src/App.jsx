import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts y Componentes (cargados inmediatamente)
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading de páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminProductsPage = lazy(() => import('./pages/AdminProductsPage'));

// Componente de carga
const LoadingFallback = () => (
  <div className="container py-5">
    <div className="text-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3">Cargando página...</p>
    </div>
  </div>
);

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
          </Route>
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;