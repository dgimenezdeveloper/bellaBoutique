import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiTag } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const StyledCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0.35rem;
  right: 0.35rem;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  border-radius: 9999px;
  color: white;
  background-color: ${props => props.color || '#3b82f6'};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  z-index: 10;

  @media (max-width: 640px) {
    font-size: 0.6rem;
    padding: 0.15rem 0.35rem;
    top: 0.25rem;
    right: 0.25rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  overflow: hidden;
  border-radius: 0.375rem;
  background-color: #f9fafb;

  @media (min-width: 640px) {
    height: 12rem;
    margin-bottom: 1rem;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ProductTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.35rem;
  line-height: 1.2;

  @media (min-width: 640px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0.35rem 0;

  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin: 0.5rem 0;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  background-color: #000;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin-top: auto;
  
  &:hover {
    background-color: #1f2937;
  }
  
  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }

  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    gap: 0.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} agregado al carrito!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };
  
  // Determinar el badge según el origen
  const getBadge = () => {
    if (product.source === 'mockapi') {
      return (
        <Badge color="#2563eb" aria-label="Último ingreso">
          <FiTag size={12} />
          Último Ingreso
        </Badge>
      );
    } else if (product.source === 'fakestore') {
      return (
        <Badge color="#7c3aed" aria-label="Producto del catálogo">
          <FiTag size={12} />
          Catálogo
        </Badge>
      );
    }
    return null;
  };
  
  return (
    <StyledCard>
      {getBadge()}
      <Link to={`/product/${product.id}`} className="flex-grow" aria-label={`Ver detalles de ${product.title}`}>
        <ImageContainer>
          <ProductImage
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </ImageContainer>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
      </Link>
      <AddToCartButton
        onClick={handleAddToCart}
        aria-label={`Agregar ${product.title} al carrito`}
      >
        <FiShoppingCart size={16} />
        <span className="hidden sm:inline">Agregar al Carrito</span>
        <span className="sm:hidden">Agregar</span>
      </AddToCartButton>
    </StyledCard>
  );
};

export default ProductCard;
