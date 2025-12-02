import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Productos por página

  // Obtener término de búsqueda desde URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
      setCurrentPage(1);
    }
  }, [location.search]);

  // Escuchar eventos de búsqueda desde el Navbar
  useEffect(() => {
    const handleNavbarSearch = (event) => {
      setSearchTerm(event.detail);
      setCurrentPage(1);
    };

    window.addEventListener('navbar-search', handleNavbarSearch);
    return () => window.removeEventListener('navbar-search', handleNavbarSearch);
  }, []);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [products]);

  // Filtrar productos según el término de búsqueda y categoría
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por búsqueda
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => {
        const titleMatch = product.title?.toLowerCase().includes(searchLower);
        const categoryMatch = product.category?.toLowerCase().includes(searchLower);
        return titleMatch || categoryMatch;
      });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  // Calcular productos para la página actual
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Cambiar de categoría
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
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
        
        {/* Mostrar término de búsqueda si existe */}
        {searchTerm && (
          <div className="text-center mb-3">
            <p className="text-muted">
              {filteredProducts.length === 0 
                ? `No se encontraron productos para "${searchTerm}"`
                : `Mostrando ${filteredProducts.length} ${filteredProducts.length === 1 ? 'resultado' : 'resultados'} para "${searchTerm}"`
              }
            </p>
          </div>
        )}

        {/* Filtro de categorías */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <div className="row g-3 g-md-4">
          {paginatedProducts.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">
              {searchTerm 
                ? `No se encontraron productos que coincidan con "${searchTerm}"`
                : 'No hay productos disponibles en este momento.'
              }
            </p>
          </div>
        )}

        {/* Paginación */}
        {filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
          />
        )}
      </div>
    </>
  );
};

export default ProductsPage;