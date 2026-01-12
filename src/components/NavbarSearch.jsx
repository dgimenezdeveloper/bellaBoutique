import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';

const NavbarSearch = ({ placeholder = "Buscar productos..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (location.pathname === '/products') {
      const event = new CustomEvent('navbar-search', { detail: value });
      window.dispatchEvent(event);
    } else if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    handleSearch('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative w-full">
      <div className={`
        relative flex items-center transition-all duration-300
        ${isFocused ? 'ring-1 ring-brand-gold' : ''}
      `}>
        <FiSearch 
          className={`absolute left-4 transition-colors duration-200 ${
            isFocused ? 'text-brand-gold' : 'text-gray-400'
          }`} 
          size={18} 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label="Buscar productos"
          className="w-full pl-12 pr-10 py-3 bg-gray-50 border-0 text-sm placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-brand-black transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <FiX size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarSearch;
