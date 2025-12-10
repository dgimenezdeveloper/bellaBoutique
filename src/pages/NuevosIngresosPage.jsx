import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
        <title>Nuevos Ingresos - Bella Boutique</title>
        <meta name="description" content="Descubre los últimos productos agregados a Bella Boutique." />
      </Helmet>
      <div className="container py-4">
        <h1 className="text-center text-uppercase fw-bold mb-4 mb-md-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          Nuevos Ingresos
        </h1>
        <div className="row g-3 g-md-4">
          {paginatedProducts.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {nuevosIngresos.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No hay nuevos ingresos disponibles en este momento.</p>
          </div>
        )}
        {nuevosIngresos.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={nuevosIngresos.length}
          />
        )}
      </div>
    </>
  );
};

export default NuevosIngresosPage;
