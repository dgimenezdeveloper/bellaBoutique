import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiPackage } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductContext';

const NuevosIngresosPage = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrar solo productos de MockAPI (últimos ingresos)
  const nuevosIngresos = useMemo(() => {
    return products.filter(product => product.source === 'mockapi');
  }, [products]);

  // Paginación
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return nuevosIngresos.slice(startIndex, endIndex);
  }, [nuevosIngresos, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(nuevosIngresos.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-brand-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-elegant py-16">
        <div className="bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Nuevos Ingresos - Bella Boutique</title>
        <meta name="description" content="Descubre los últimos productos agregados a Bella Boutique." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-48 sm:h-64 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black to-brand-black/80"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-2">
            Nuevos Ingresos
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Las últimas tendencias en moda femenina
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container-elegant py-4 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-brand-black transition-colors">
            Inicio
          </Link>
          <FiChevronRight size={14} className="text-gray-400" />
          <span className="text-brand-black font-medium">Nuevos Ingresos</span>
        </nav>
      </div>

      <div className="container-elegant py-8 sm:py-12">
        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            <span className="font-semibold text-brand-black">{nuevosIngresos.length}</span> productos nuevos
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {paginatedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {nuevosIngresos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-brand-blush mx-auto mb-6 flex items-center justify-center">
              <FiPackage size={32} className="text-brand-rose" />
            </div>
            <h3 className="font-display text-xl text-brand-black mb-2">
              Sin productos nuevos
            </h3>
            <p className="text-gray-500 mb-6">
              No hay nuevos ingresos disponibles en este momento.
            </p>
            <Link to="/products" className="btn-primary">
              Ver todos los productos
            </Link>
          </div>
        )}

        {/* Pagination */}
        {nuevosIngresos.length > itemsPerPage && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={nuevosIngresos.length}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default NuevosIngresosPage;
