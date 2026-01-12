import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} agregado al carrito`, {
      position: "top-right",
      autoClose: 2000,
      style: {
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: '0',
      }
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos', {
      position: "top-right",
      autoClose: 1500,
    });
  };
  
  const getBadge = () => {
    if (product.source === 'mockapi') {
      return (
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[0.55rem] sm:text-[0.65rem] font-semibold px-2 py-1 sm:px-3 sm:py-1.5 bg-brand-gold text-brand-black uppercase tracking-widest z-10">
          Nuevo
        </span>
      );
    }
    return null;
  };
  
  return (
    <div className="group bg-white relative h-full flex flex-col overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1">
      {getBadge()}
      
      <Link to={`/product/${product.id}`} aria-label={`Ver ${product.title}`}>
        <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden bg-gray-50 relative">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Action buttons - appear on hover */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2 opacity-0 -translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button 
              onClick={handleWishlist}
              aria-label="Agregar a favoritos"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-brand-black hover:text-white"
              style={{ color: isWishlisted ? '#e8b4b8' : '#1a1a1a' }}
            >
              <FiHeart size={18} fill={isWishlisted ? '#e8b4b8' : 'none'} />
            </button>
            <Link 
              to={`/product/${product.id}`} 
              aria-label="Ver detalles"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-brand-black hover:text-white text-brand-black"
            >
              <FiEye size={18} />
            </Link>
          </div>
          
          {/* Quick add button - slides up on hover (hidden on mobile) */}
          <button
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.title} al carrito`}
            className="hidden md:flex absolute bottom-0 left-0 right-0 bg-brand-black/95 text-white py-3 sm:py-4 font-medium text-[0.7rem] sm:text-xs tracking-[0.15em] uppercase items-center justify-center gap-2 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-gold hover:text-brand-black disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FiShoppingCart size={16} />
            Añadir al carrito
          </button>
        </div>
      </Link>
      
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow text-center">
        <span className="text-[0.7rem] text-gray-400 uppercase tracking-[0.15em] mb-2">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-sm sm:text-base lg:text-lg font-medium text-brand-black mb-3 leading-snug line-clamp-2 hover:text-brand-gold transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-lg sm:text-xl font-semibold text-brand-black mt-auto">
          ${Number(product.price).toLocaleString('es-AR')}
        </p>
      </div>

      {/* Mobile add button - always visible on mobile */}
      <button 
        onClick={handleAddToCart}
        className="flex md:hidden w-full bg-brand-black text-white py-3 font-medium text-xs tracking-wider uppercase items-center justify-center gap-2 transition-all duration-300 hover:bg-brand-gold hover:text-brand-black"
      >
        <FiShoppingCart size={16} />
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
