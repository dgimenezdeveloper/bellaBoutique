import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// URL de MockAPI configurada para Bella Boutique
const API_BASE_URL = 'https://692f619991e00bafccd76fb9.mockapi.io';
const FAKESTORE_API = 'https://fakestoreapi.com/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener todos los productos (MockAPI + FakeStore)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch de ambas APIs en paralelo
      const [mockApiResponse, fakeStoreResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/products`, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        }),
        fetch(FAKESTORE_API, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        })
      ]);
      
      if (!mockApiResponse.ok && !fakeStoreResponse.ok) {
        throw new Error('Error al cargar los productos de ambas fuentes');
      }
      
      // Obtener datos de ambas APIs
      const mockApiData = mockApiResponse.ok ? await mockApiResponse.json() : [];
      const fakeStoreData = fakeStoreResponse.ok ? await fakeStoreResponse.json() : [];
      
      // Marcar el origen de cada producto
      const mockApiProducts = mockApiData.map(product => ({
        ...product,
        source: 'mockapi'
      }));
      
      const fakeStoreProducts = fakeStoreData.map(product => ({
        ...product,
        source: 'fakestore'
      }));
      
      // Combinar ambos arrays de productos
      const allProducts = [...mockApiProducts, ...fakeStoreProducts];
      setProducts(allProducts);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo producto
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      return { success: true, product: newProduct };
    } catch (err) {
      setError(err.message);
      console.error('Error creating product:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un producto existente
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error al actualizar el producto');

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
      return { success: true, product: updatedProduct };
    } catch (err) {
      setError(err.message);
      console.error('Error updating product:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar el producto');

      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error deleting product:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
