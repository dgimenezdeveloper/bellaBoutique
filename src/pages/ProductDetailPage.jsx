import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { products, loading: productsLoading } = useProducts();
  const [loading, setLoading] = useState(true);

  // Buscar producto en el contexto primero
  const product = useMemo(() => {
    return products.find(p => p.id === productId || p.id === parseInt(productId));
  }, [products, productId]);

  useEffect(() => {
    if (!productsLoading) {
      setLoading(false);
    }
  }, [productsLoading]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} agregado al carrito!`);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Cargando producto...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Producto no encontrado.
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.title ? String(product.title) : 'Producto'} - Bella Boutique`}</title>
        <meta name="description" content={product.description || 'Detalle de producto en Bella Boutique.'} />
        <meta name="keywords" content={`${product.category ? String(product.category) : ''}, ${product.title ? String(product.title) : ''}, comprar online, moda`} />
        <meta property="og:title" content={product.title ? String(product.title) : 'Producto'} />
        <meta property="og:description" content={product.description || 'Detalle de producto en Bella Boutique.'} />
        <meta property="og:image" content={product.image || ''} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price ? String(product.price) : ''} />
        <meta property="product:price:currency" content="USD" />
      </Helmet>
      
      <div className="container py-4 py-md-5">
        <div className="row g-4 g-md-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="img-fluid"
                  style={{ maxHeight: '500px', objectFit: 'contain', width: '100%' }}
                />
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="sticky-top" style={{ top: '100px' }}>
              <span className="badge bg-secondary text-uppercase mb-3">{product.category}</span>
              <h1 className="display-6 fw-bold mb-3">{product.title}</h1>
              
              <div className="mb-4">
                <span className="display-4 fw-bold">${product.price}</span>
              </div>
              
              <p className="text-muted mb-4 fs-6" style={{ lineHeight: '1.8' }}>
                {product.description}
              </p>
              
              <div className="d-grid gap-3 mb-4">
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-dark btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2"
                  aria-label={`Agregar ${product.title} al carrito`}
                >
                  <FiShoppingCart size={20} />
                  Agregar al Carrito
                </button>
                
                <div className="row g-2">
                  <div className="col-6">
                    <button 
                      className="btn btn-outline-dark w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
                      aria-label="Agregar a favoritos"
                    >
                      <FiHeart size={18} />
                      Favoritos
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn btn-outline-dark w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
                      aria-label="Compartir producto"
                    >
                      <FiShare2 size={18} />
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card bg-light border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">Información de Envío</h5>
                  <ul className="list-unstyled mb-0 small">
                    <li className="mb-2">✓ Envío gratis en compras mayores a $50</li>
                    <li className="mb-2">✓ Devoluciones gratuitas dentro de los 30 días</li>
                    <li className="mb-2">✓ Entrega estimada: 3-5 días hábiles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;