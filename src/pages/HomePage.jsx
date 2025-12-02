// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  
  // Muestra un mensaje de carga o error si es necesario
  if (loading) return <p className="text-center py-10">Cargando los mejores productos...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  // Tomamos solo una selección de productos para la página de inicio, por ejemplo, los primeros 8.
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Helmet>
        <title>Bella Boutique - Moda Femenina y Accesorios</title>
        <meta name="description" content="Descubre las últimas tendencias en moda femenina. Remeras, vestidos, pantalones y accesorios. Envíos a todo el país." />
        <meta name="keywords" content="moda femenina, ropa, vestidos, remeras, pantalones, accesorios, boutique" />
        <meta property="og:title" content="Bella Boutique - Moda Femenina" />
        <meta property="og:description" content="Las mejores prendas y accesorios para tu estilo" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="container-fluid px-3 px-md-4">
        {/* Banner de Promoción */}
        <div className="row my-4 my-md-5">
          <div className="col-12">
            <Link to="/login">
              <img 
                src="/images/banner.webp"
                alt="Envíos a todo el país - Bella Boutique" 
                className="w-100 rounded-3 shadow-lg" 
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </Link>
          </div>
        </div>

        {/* Título de la sección de productos */}
        <h1 className="text-center text-uppercase fw-bold my-4 my-md-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          Nuestros Favoritos
        </h1>

        {/* Parrilla de Productos con Bootstrap Grid */}
        <div className="row g-3 g-md-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center my-5">
          <Link 
            to="/products"
            className="btn btn-dark btn-lg rounded-pill px-5 py-3 fw-bold d-inline-flex align-items-center gap-2"
            aria-label="Ver todos los productos disponibles"
          >
            Ver todos los productos
            <FiArrowRight size={20} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;