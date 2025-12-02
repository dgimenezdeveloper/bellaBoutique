import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;