import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductContext';
import { FiChevronRight, FiGrid, FiList, FiFilter } from 'react-icons/fi';

// Mapeo simple de slugs de URL a categorías exactas de productos
const categoryMapping = {
  // Categorías principales (muestran múltiples subcategorías)
  'verano-2026': { 
    categories: ['remeras', 'polleras', 'tops', 'joggings', 'musculosas', 'shorts', 'calzas', 'bodies', 'vestidos', 'bikers', 'bikinis'], 
    title: 'Verano 2026',
    banner: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&q=80'
  },
  'invierno-2025': { 
    categories: ['buzos', 'sweaters', 'camperas', 'blazers', 'camisas'], 
    title: 'Invierno 2025',
    banner: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1600&q=80'
  },
  'denim': { 
    categories: ['jeans', 'shorts-denim', 'camperas', 'chalecos', 'jardineros', 'bermudas'], 
    title: 'Denim',
    banner: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1600&q=80'
  },
  'ofertas': { 
    categories: ['ofertas'], 
    title: 'Ofertas',
    banner: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600&q=80'
  },
  'accesorios': { 
    categories: ['accesorios', 'calzado', 'bolsos', 'cintos', 'gorras', 'ojotas', 'fragancias', 'bolsas', 'ropa-interior', 'bikinis'], 
    title: 'Accesorios',
    banner: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1600&q=80'
  },
  
  // Subcategorías de Verano - coincidencia EXACTA
  'remeras': { categories: ['remeras'], title: 'Remeras' },
  'polleras': { categories: ['polleras'], title: 'Polleras' },
  'tops': { categories: ['tops'], title: 'Tops' },
  'joggings': { categories: ['joggings'], title: 'Joggings' },
  'musculosas': { categories: ['musculosas'], title: 'Musculosas' },
  'calzas': { categories: ['calzas'], title: 'Calzas' },
  'bodies': { categories: ['bodies'], title: 'Bodies' },
  'vestidos': { categories: ['vestidos'], title: 'Vestidos' },
  'bikers': { categories: ['bikers'], title: 'Bikers' },
  'buzos': { categories: ['buzos'], title: 'Buzos' },
  
  // Subcategorías de Denim - coincidencia EXACTA
  'shorts': { categories: ['shorts', 'shorts-denim'], title: 'Shorts' },
  'brillos': { categories: ['jeans'], title: 'Denim con Brillos', filterKeyword: 'brillo' },
  'wide-leg': { categories: ['jeans'], title: 'Wide Leg', filterKeyword: 'wide leg' },
  'roturas': { categories: ['jeans', 'shorts-denim'], title: 'Denim con Roturas', filterKeyword: 'rotura' },
  'joggers': { categories: ['joggings'], title: 'Joggers' },
  'jardineros': { categories: ['jardineros'], title: 'Jardineros' },
  'minis': { categories: ['polleras', 'shorts'], title: 'Minis', filterKeyword: 'mini' },
  'super-elastizados': { categories: ['jeans'], title: 'Super Elastizados', filterKeyword: 'elastizado' },
  'clasicos': { categories: ['jeans'], title: 'Jeans Clásicos', filterKeyword: 'clásico' },
  'oxford': { categories: ['pantalones'], title: 'Oxford', filterKeyword: 'oxford' },
  'chalecos': { categories: ['chalecos'], title: 'Chalecos Denim' },
  'bermudas': { categories: ['bermudas'], title: 'Bermudas' },
  'tachas': { categories: ['jeans'], title: 'Denim con Tachas', filterKeyword: 'tacha' },
  'mom': { categories: ['jeans'], title: 'Mom Jeans', filterKeyword: 'mom' },
  'cargos': { categories: ['pantalones', 'jeans'], title: 'Cargos', filterKeyword: 'cargo' },
  'camperas': { categories: ['camperas'], title: 'Camperas' },
  
  // Subcategorías de Accesorios - coincidencia EXACTA
  'ojotas': { categories: ['ojotas'], title: 'Ojotas' },
  'ropa-interior': { categories: ['ropa-interior'], title: 'Ropa Interior' },
  'cintos': { categories: ['cintos'], title: 'Cintos' },
  'bolsos': { categories: ['bolsos'], title: 'Bolsos' },
  'fragancias': { categories: ['fragancias'], title: 'Fragancias' },
  'gorras': { categories: ['gorras'], title: 'Gorras' },
  'bolsas': { categories: ['bolsas'], title: 'Bolsas' },
};

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const itemsPerPage = 12;

  // Determinar qué categoría mostrar basándose en la URL
  const categorySlug = subcategory || category;
  const categoryInfo = categoryMapping[categorySlug] || { 
    categories: [categorySlug], 
    title: categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
  };

  // Filtrar productos según la categoría - SOLO coincidencia exacta
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let filtered = products.filter(product => {
      const productCategory = product.category?.toLowerCase() || '';
      
      // Coincidencia EXACTA con las categorías permitidas
      const exactMatch = categoryInfo.categories.some(cat => 
        productCategory === cat.toLowerCase()
      );
      
      if (!exactMatch) return false;
      
      // Si hay un filtro de palabra clave adicional, verificarlo en título o descripción
      if (categoryInfo.filterKeyword) {
        const keyword = categoryInfo.filterKeyword.toLowerCase();
        const title = product.title?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        return title.includes(keyword) || description.includes(keyword);
      }
      
      return true;
    });

    // Ordenar productos
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
  }, [products, categoryInfo, sortBy]);

  // Paginación
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Generar breadcrumb parts
  const getBreadcrumbParts = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Inicio', path: '/' }];
    
    if (parts.length > 2) {
      const parentSlug = parts[1];
      const parentInfo = categoryMapping[parentSlug];
      if (parentInfo) {
        breadcrumbs.push({ 
          label: parentInfo.title, 
          path: `/category/${parentSlug}` 
        });
      }
    }
    
    breadcrumbs.push({ label: categoryInfo.title, path: null });
    return breadcrumbs;
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
        <title>{categoryInfo.title} - Bella Boutique</title>
        <meta name="description" content={`Descubre nuestra colección de ${categoryInfo.title.toLowerCase()} en Bella Boutique. Moda femenina de calidad.`} />
      </Helmet>

      {/* Category Banner - Solo para categorías principales */}
      {categoryInfo.banner && (
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 sm:-mt-8 lg:-mt-10 mb-10 h-[250px] sm:h-[300px] lg:h-[350px] overflow-hidden">
          <img 
            src={categoryInfo.banner} 
            alt={categoryInfo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4">{categoryInfo.title}</h1>
              <p className="text-white/80 text-lg">Descubrí la colección completa</p>
            </div>
          </div>
        </div>
      )}

      <div className="container-elegant">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          {getBreadcrumbParts().map((crumb, index, arr) => (
            <React.Fragment key={index}>
              {crumb.path ? (
                <Link 
                  to={crumb.path}
                  className="text-gray-500 hover:text-brand-gold transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-brand-black font-medium">{crumb.label}</span>
              )}
              {index < arr.length - 1 && (
                <FiChevronRight className="text-gray-400" size={14} />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title - Solo si no hay banner */}
        {!categoryInfo.banner && (
          <div className="text-center mb-12">
            <h1 className="section-title">{categoryInfo.title}</h1>
          </div>
        )}

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

        {filteredProducts.length > 0 ? (
          <>
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2'
            }`}>
              {paginatedProducts.map((product, index) => (
                <div 
                  key={`${product.source}-${product.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredProducts.length}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">👗</span>
            </div>
            <h2 className="font-display text-2xl text-brand-black mb-3">
              No hay productos disponibles
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Estamos trabajando para traerte los mejores productos de {categoryInfo.title.toLowerCase()}.
            </p>
            <Link to="/products" className="btn-primary">
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
