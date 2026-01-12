import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  totalResults,
  placeholder = "Buscar productos por nombre o categoría..." 
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-500 flex items-center pointer-events-none">
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar productos"
          className="w-full py-3 pl-12 pr-12 border-2 border-gray-200 rounded-full text-base transition-all duration-300 focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-black/10 placeholder:text-gray-400"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className="absolute right-4 text-gray-500 hover:text-brand-black transition-colors p-1 focus:outline-none"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="text-center mt-3 text-sm text-gray-500">
          {totalResults === 0 
            ? 'No se encontraron productos' 
            : `${totalResults} ${totalResults === 1 ? 'producto encontrado' : 'productos encontrados'}`
          }
        </p>
      )}
    </div>
  );
};

export default SearchBar;
