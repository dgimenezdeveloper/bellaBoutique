import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const ProductForm = ({ onSuccess, initialData = null, isEdit = false }) => {
  const { createProduct, updateProduct } = useProducts();
  
  const [formData, setFormData] = useState(initialData || {
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    // Nombre obligatorio
    if (!formData.title.trim()) {
      newErrors.title = 'El nombre del producto es obligatorio';
    }

    // Precio mayor a 0
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    // Descripción mínima de 10 caracteres
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    // Imagen obligatoria
    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es obligatoria';
    }

    // Categoría obligatoria
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Por favor, corrige los errores en el formulario' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    let result;
    if (isEdit && initialData?.id) {
      result = await updateProduct(initialData.id, productData);
    } else {
      result = await createProduct(productData);
    }

    setLoading(false);

    if (result.success) {
      setMessage({ 
        type: 'success', 
        text: isEdit ? '¡Producto actualizado exitosamente!' : '¡Producto creado exitosamente!' 
      });
      
      // Resetear formulario si es creación
      if (!isEdit) {
        setFormData({
          title: '',
          price: '',
          description: '',
          image: '',
          category: '',
        });
      }

      // Llamar callback si existe
      if (onSuccess) {
        setTimeout(() => onSuccess(result.product), 1500);
      }
    } else {
      setMessage({ type: 'error', text: result.error || 'Error al procesar el producto' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h2>

      {/* Mensaje de éxito/error */}
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Nombre del producto */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Producto *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
          placeholder="Ej: Remera estampada"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Precio */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Precio *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
          placeholder="0.00"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción * (mínimo 10 caracteres)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
          placeholder="Describe el producto..."
        />
        <p className="text-sm text-gray-500 mt-1">
          {formData.description.length} caracteres
        </p>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* URL de imagen */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          URL de la Imagen *
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.image ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
      </div>

      {/* Categoría */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
        >
          <option value="">Selecciona una categoría</option>
          <option value="remeras">Remeras</option>
          <option value="polleras">Polleras</option>
          <option value="vestidos">Vestidos</option>
          <option value="pantalones">Pantalones</option>
          <option value="accesorios">Accesorios</option>
          <option value="calzado">Calzado</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-md font-bold text-white transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-800'
        }`}
      >
        {loading ? 'Procesando...' : (isEdit ? 'Actualizar Producto' : 'Crear Producto')}
      </button>
    </form>
  );
};

export default ProductForm;
