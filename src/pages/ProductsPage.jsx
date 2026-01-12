import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductContext';
import { FiChevronRight, FiGrid, FiList, FiX } from 'react-icons/fi';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const itemsPerPage = 12;

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

  // Filtrar y ordenar productos
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

    // Ordenar
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

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

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 tracking-wide">Cargando productos...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Link to="/" className="btn-primary">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{'Productos - Bella Boutique'}</title>
        <meta name="description" content="Explora nuestra colección completa de ropa y accesorios. Encuentra tu estilo perfecto en Bella Boutique." />
        <meta name="keywords" content="productos, catálogo, ropa, accesorios, comprar online" />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-brand-gold transition-colors">Inicio</Link>
        <FiChevronRight className="text-gray-400" size={14} />
        <span className="text-brand-black font-medium">Todos los Productos</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="section-title">
          {searchTerm ? 'Resultados de búsqueda' : 'Todos los Productos'}
        </h1>
        {searchTerm && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-gray-500">Búsqueda: </span>
            <span className="bg-gray-100 px-3 py-1 text-sm flex items-center gap-2">
              "{searchTerm}"
              <button 
                onClick={clearSearch}
                className="text-gray-400 hover:text-brand-black transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <FiX size={14} />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Filtro de categorías */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <p className="text-gray-500 text-sm">
          <span className="font-medium text-brand-black">{filteredProducts.length}</span> productos
        </p>
        
        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 hidden sm:inline">Ordenar:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 px-3 py-2 focus:outline-none focus:border-brand-gold bg-white"
            >
              <option value="relevance">Relevancia</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="hidden sm:flex items-center border border-gray-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-brand-black text-white' : 'text-gray-500 hover:text-brand-black'}`}
              aria-label="Vista en cuadrícula"
            >
              <FiGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-brand-black text-white' : 'text-gray-500 hover:text-brand-black'}`}
              aria-label="Vista en lista"
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {paginatedProducts.length > 0 ? (
        <>
          <div className={`grid gap-4 sm:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2'
          }`}>
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

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredProducts.length}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="font-display text-2xl text-brand-black mb-3">
            No se encontraron productos
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {searchTerm 
              ? `No hay productos que coincidan con "${searchTerm}"`
              : 'No hay productos disponibles en este momento.'
            }
          </p>
          {searchTerm && (
            <button onClick={clearSearch} className="btn-primary">
              Ver todos los productos
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsPage;