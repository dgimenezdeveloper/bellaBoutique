import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!categories || categories.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Desktop Pills */}
      <div className="hidden sm:flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-brand-black text-white'
              : 'bg-transparent text-gray-600 hover:text-brand-black border border-gray-200 hover:border-brand-black'
          }`}
        >
          Todos
        </button>
        {categories.slice(0, 8).map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 text-sm font-medium tracking-wide capitalize transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-brand-black text-white'
                : 'bg-transparent text-gray-600 hover:text-brand-black border border-gray-200 hover:border-brand-black'
            }`}
          >
            {category}
          </button>
        ))}
        
        {/* Dropdown for more categories */}
        {categories.length > 8 && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-5 py-2 text-sm font-medium tracking-wide bg-transparent text-gray-600 hover:text-brand-black border border-gray-200 hover:border-brand-black flex items-center gap-2 transition-all duration-300"
            >
              Más
              <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-elegant border border-gray-100 py-2 min-w-[150px] z-20 animate-fade-in">
                {categories.slice(8).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      setIsOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm capitalize transition-colors ${
                      selectedCategory === category
                        ? 'bg-gray-50 text-brand-gold font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-brand-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-brand-gold bg-white capitalize"
        >
          <option value="all">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
