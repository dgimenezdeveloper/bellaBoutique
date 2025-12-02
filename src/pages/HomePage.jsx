// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  
  // Muestra un mensaje de carga o error si es necesario
  if (loading) return <p className="text-center py-10">Cargando los mejores productos...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  // Tomamos solo una selección de productos para la página de inicio, por ejemplo, los primeros 8.
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Banner de Promoción */}
      <div className="my-6 md:my-8">
        <Link to="/login">
          <img 
          src="/images/banner.webp" // La ruta directa al archivo en la carpeta /public
          alt="Envíos a todo el país" 
          className="w-full h-auto rounded-lg shadow-lg" // Clases para que se vea bien
          />
        </Link>
      </div>

      {/* Título de la sección de productos */}
      <h1 className="text-center text-3xl font-bold my-8">NUESTROS FAVORITOS</h1>

      {/* Parrilla de Productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          to="/products"
          className="bg-black text-white font-bold py-3 px-12 rounded-full hover:bg-gray-800 transition-colors"
        >
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
};

export default HomePage;