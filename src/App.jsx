import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts y Componentes (cargados inmediatamente)

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
const NuevosIngresosPage = lazy(() => import('./pages/NuevosIngresosPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

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
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-brand-black border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600 font-medium">Cargando página...</p>
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
          <Route path="/category/nuevos-ingresos" element={<NuevosIngresosPage />} />
          
          {/* Rutas de categorías principales */}
          <Route path="/category/verano-2026" element={<CategoryPage />} />
          <Route path="/category/invierno-2025" element={<CategoryPage />} />
          <Route path="/category/denim" element={<CategoryPage />} />
          <Route path="/category/ofertas" element={<CategoryPage />} />
          <Route path="/category/accesorios" element={<CategoryPage />} />
          
          {/* Rutas de subcategorías de Verano (también accesibles desde /category/verano/) */}
          <Route path="/category/verano/:subcategory" element={<CategoryPage />} />
          <Route path="/category/verano-2026/:subcategory" element={<CategoryPage />} />
          
          {/* Rutas de subcategorías de Denim */}
          <Route path="/category/denim/:subcategory" element={<CategoryPage />} />
          
          {/* Rutas de subcategorías de Accesorios */}
          <Route path="/category/accesorios/:subcategory" element={<CategoryPage />} />
          
          {/* Ruta genérica para cualquier otra categoría */}
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
          
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