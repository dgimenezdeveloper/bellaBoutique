import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ConfirmModal from '../components/ConfirmModal';
import ProductForm from '../components/ProductForm';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const AdminProductsPage = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, product: null });
  const [addModal, setAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Abrir modal de eliminación
  const handleOpenDeleteModal = (product) => {
    setDeleteModal({
      isOpen: true,
      productId: product.id,
      productName: product.title,
    });
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    setActionLoading(true);
    const result = await deleteProduct(deleteModal.productId);
    setActionLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: 'Producto eliminado exitosamente' });
      setDeleteModal({ isOpen: false, productId: null, productName: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'error', text: result.error || 'Error al eliminar el producto' });
    }
  };

  // Abrir modal de edición
  const handleOpenEditModal = (product) => {
    setEditModal({ isOpen: true, product });
  };

  // Cerrar modal de edición
  const handleCloseEditModal = () => {
    setEditModal({ isOpen: false, product: null });
    setMessage({ type: 'success', text: 'Producto actualizado exitosamente' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Cerrar modal de agregar
  const handleCloseAddModal = () => {
    setAddModal(false);
    setMessage({ type: 'success', text: 'Producto creado exitosamente' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold uppercase">Administrar Productos</h1>
        <button
          onClick={() => setAddModal(true)}
          className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <FiPlus size={20} />
          Agregar Producto
        </button>
      </div>

      {/* Mensaje de éxito/error */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabla de productos */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">No hay productos disponibles</p>
          <button
            onClick={() => setAddModal(true)}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Agregar el primer producto
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">${product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title="Editar"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(product)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.productName}"? Esta acción no se puede deshacer.`}
        loading={actionLoading}
      />

      {/* Modal de edición */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Editar Producto</h2>
              <button
                onClick={() => setEditModal({ isOpen: false, product: null })}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <ProductForm
              initialData={editModal.product}
              isEdit={true}
              onSuccess={handleCloseEditModal}
            />
          </div>
        </div>
      )}

      {/* Modal de agregar */}
      {addModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Agregar Producto</h2>
              <button
                onClick={() => setAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <ProductForm onSuccess={handleCloseAddModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
