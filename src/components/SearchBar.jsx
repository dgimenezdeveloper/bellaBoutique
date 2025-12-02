import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 9999px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #6b7280;
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
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

const ResultsInfo = styled.div`
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

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
    <SearchContainer>
      <SearchWrapper>
        <SearchIcon>
          <FiSearch size={20} />
        </SearchIcon>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar productos"
        />
        {searchTerm && (
          <ClearButton 
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <FiX size={20} />
          </ClearButton>
        )}
      </SearchWrapper>
      {searchTerm && (
        <ResultsInfo>
          {totalResults === 0 
            ? 'No se encontraron productos' 
            : `${totalResults} ${totalResults === 1 ? 'producto encontrado' : 'productos encontrados'}`
          }
        </ResultsInfo>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
