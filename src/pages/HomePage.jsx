// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield, FiCreditCard } from 'react-icons/fi';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 tracking-wide">Cargando productos...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );

  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.filter(p => p.source === 'mockapi').slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{'Bella Boutique - Moda Femenina y Accesorios'}</title>
        <meta name="description" content="Descubre las últimas tendencias en moda femenina. Remeras, vestidos, pantalones y accesorios. Envíos a todo el país." />
        <meta name="keywords" content="moda femenina, ropa, vestidos, remeras, pantalones, accesorios, boutique" />
        <meta property="og:title" content="Bella Boutique - Moda Femenina" />
        <meta property="og:description" content="Las mejores prendas y accesorios para tu estilo" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero Banner */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 sm:-mt-8 lg:-mt-10 mb-16 sm:mb-20">
        <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
            alt="Colección de temporada" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container-elegant">
              <div className="max-w-xl animate-fade-in">
                <span className="inline-block text-brand-gold text-sm uppercase tracking-[0.3em] mb-4 font-medium">
                  Nueva Colección
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight">
                  Elegancia que <br/>
                  <span className="italic">define tu estilo</span>
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-md">
                  Descubrí las últimas tendencias en moda femenina. Prendas únicas para cada momento.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/nuevos-ingresos"
                    className="btn-gold inline-flex items-center gap-2"
                  >
                    Ver Colección
                    <FiArrowRight size={18} />
                  </Link>
                  <Link 
                    to="/products"
                    className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-brand-black inline-flex items-center gap-2"
                  >
                    Explorar Todo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-gray-200 py-8 mb-16 sm:mb-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container-elegant">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FiTruck className="text-brand-gold flex-shrink-0" size={28} />
              <div>
                <h4 className="font-medium text-sm text-brand-black">Envío Gratis</h4>
                <p className="text-xs text-gray-500">En compras +$50.000</p>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FiRefreshCw className="text-brand-gold flex-shrink-0" size={28} />
              <div>
                <h4 className="font-medium text-sm text-brand-black">Cambios Gratis</h4>
                <p className="text-xs text-gray-500">Hasta 30 días</p>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FiShield className="text-brand-gold flex-shrink-0" size={28} />
              <div>
                <h4 className="font-medium text-sm text-brand-black">Compra Segura</h4>
                <p className="text-xs text-gray-500">Protección total</p>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FiCreditCard className="text-brand-gold flex-shrink-0" size={28} />
              <div>
                <h4 className="font-medium text-sm text-brand-black">Cuotas Sin Interés</h4>
                <p className="text-xs text-gray-500">Hasta 6 cuotas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16 sm:mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Categorías</h2>
          <p className="section-subtitle">Explorá nuestra selección curada para vos</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Category 1 */}
          <Link to="/category/verano" className="group relative overflow-hidden aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80" 
              alt="Colección Verano" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="font-display text-2xl sm:text-3xl mb-2">Verano</h3>
              <span className="text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver colección →
              </span>
            </div>
          </Link>
          
          {/* Category 2 */}
          <Link to="/category/denim" className="group relative overflow-hidden aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80" 
              alt="Denim" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="font-display text-2xl sm:text-3xl mb-2">Denim</h3>
              <span className="text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver colección →
              </span>
            </div>
          </Link>
          
          {/* Category 3 */}
          <Link to="/category/accesorios" className="group relative overflow-hidden aspect-[4/5] sm:col-span-2 lg:col-span-1">
            <img 
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80" 
              alt="Accesorios" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="font-display text-2xl sm:text-3xl mb-2">Accesorios</h3>
              <span className="text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver colección →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16 sm:mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Nuestros Favoritos</h2>
          <p className="section-subtitle">Las piezas más deseadas de la temporada</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="btn-primary inline-flex items-center gap-3"
          >
            Ver todos los productos
            <FiArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* New Arrivals Banner */}
      {newArrivals.length > 0 && (
        <section className="mb-16 sm:mb-20 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="relative">
            <div className="grid lg:grid-cols-2 min-h-[500px]">
              <div className="gradient-elegant flex items-center justify-center p-8 sm:p-12 lg:p-16 order-2 lg:order-1">
                <div className="max-w-md text-center lg:text-left">
                  <span className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                    Recién llegados
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6">
                    Nuevos <br className="hidden lg:block" />Ingresos
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Descubrí las últimas incorporaciones a nuestra colección. Prendas frescas y actuales que no podés dejar pasar.
                  </p>
                  <Link 
                    to="/nuevos-ingresos"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Explorar nuevos
                    <FiArrowRight size={18} />
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
                  alt="Nuevos ingresos" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Instagram Section */}
      <section className="mb-16 sm:mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">@bellaboutique</h2>
          <p className="section-subtitle">Seguinos en Instagram y compartí tu estilo</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[
            'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
            'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&q=80',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
          ].map((img, index) => (
            <a 
              key={index}
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img 
                src={img} 
                alt={`Instagram ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">♥</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;