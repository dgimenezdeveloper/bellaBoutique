import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
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
        onClick={() => onAddToCart(product)}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ProductCard;
