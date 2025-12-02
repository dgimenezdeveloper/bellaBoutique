import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$active ? '#000' : '#e5e7eb'};
  background-color: ${props => props.$active ? '#000' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 0.5rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  min-width: 2.5rem;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#1f2937' : '#f3f4f6'};
    border-color: ${props => props.$active ? '#1f2937' : '#d1d5db'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const PageInfo = styled.span`
  padding: 0.5rem 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

const Ellipsis = styled.span`
  padding: 0.5rem;
  color: #9ca3af;
`;

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  totalItems 
}) => {
  // Si solo hay una página o menos, no mostrar paginación
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generar números de página con lógica de ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Máximo de botones de página visibles

    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con ellipsis
      if (currentPage <= 3) {
        // Al inicio
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Al final
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // En el medio
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div>
      <PaginationContainer>
        <PageButton
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <FiChevronLeft size={18} />
          <span className="d-none d-sm-inline">Anterior</span>
        </PageButton>

        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
          }
          return (
            <PageButton
              key={page}
              onClick={() => handlePageClick(page)}
              $active={currentPage === page}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </PageButton>
          );
        })}

        <PageButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
        >
          <span className="d-none d-sm-inline">Siguiente</span>
          <FiChevronRight size={18} />
        </PageButton>
      </PaginationContainer>

      <PageInfo style={{ display: 'block', textAlign: 'center' }}>
        Mostrando {startItem}-{endItem} de {totalItems} productos
      </PageInfo>
    </div>
  );
};

export default Pagination;
