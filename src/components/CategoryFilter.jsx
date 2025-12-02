import React from 'react';
import { FiFilter } from 'react-icons/fi';
import styled from 'styled-components';

const FilterContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #374151;
  font-weight: 600;
`;

const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$active ? '#000' : '#e5e7eb'};
  background-color: ${props => props.$active ? '#000' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#1f2937' : '#f3f4f6'};
    border-color: ${props => props.$active ? '#1f2937' : '#d1d5db'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <FilterContainer>
      <FilterHeader>
        <FiFilter size={18} />
        <span>Filtrar por categoría</span>
      </FilterHeader>
      <CategoryButtons>
        <CategoryButton
          $active={selectedCategory === 'all'}
          onClick={() => onCategoryChange('all')}
          aria-label="Mostrar todas las categorías"
        >
          Todos
        </CategoryButton>
        {categories.map(category => (
          <CategoryButton
            key={category}
            $active={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
            aria-label={`Filtrar por ${category}`}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryButtons>
    </FilterContainer>
  );
};

export default CategoryFilter;
