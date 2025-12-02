import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Productos - Bella Boutique</title>
        <meta name="description" content="Explora nuestra colección completa de ropa y accesorios. Encuentra tu estilo perfecto en Bella Boutique." />
        <meta name="keywords" content="productos, catálogo, ropa, accesorios, comprar online" />
      </Helmet>
      
      <div className="container py-4">
        <h1 className="text-center text-uppercase fw-bold mb-4 mb-md-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          Todos los Productos
        </h1>
        
        <div className="row g-3 g-md-4">
          {products.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No hay productos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;