import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  &:hover {
    color: #000;
  }
  
  &:focus {
    outline: none;
  }
`;

const NavbarSearch = ({ placeholder = "Busca tus productos..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    // Si estamos en la página de productos, actualizar la búsqueda
    if (location.pathname === '/products') {
      // La búsqueda se manejará mediante el estado compartido
      const event = new CustomEvent('navbar-search', { detail: value });
      window.dispatchEvent(event);
    } else if (value.trim()) {
      // Si estamos en otra página y hay un término, ir a productos con búsqueda
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
    <SearchWrapper>
      <SearchIcon>
        <FiSearch size={18} />
      </SearchIcon>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        aria-label="Buscar productos"
      />
      {searchTerm && (
        <ClearButton 
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
        >
          <FiX size={18} />
        </ClearButton>
      )}
    </SearchWrapper>
  );
};

export default NavbarSearch;
