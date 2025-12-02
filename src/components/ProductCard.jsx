
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Determinar el badge según el origen
  const getBadge = () => {
    if (product.source === 'mockapi') {
      return (
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          Personalizado
        </span>
      );
    } else if (product.source === 'fakestore') {
      return (
        <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          Catálogo
        </span>
      );
    }
    return null;
  };
  
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow relative">
      {getBadge()}
      <Link to={`/product/${product.id}`} className="flex-grow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <p className="text-xl font-bold my-2">${product.price}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ProductCard;
