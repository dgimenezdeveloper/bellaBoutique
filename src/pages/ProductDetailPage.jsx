import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = ({ onAddToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img src={product.image} alt={product.title} className="w-full md:w-1/3 object-contain"/>
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-3xl font-bold mb-4">${product.price}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;