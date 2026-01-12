import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductContext';
import ConfirmModal from '../components/ConfirmModal';
import ProductForm from '../components/ProductForm';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiChevronRight, FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminProductsPage = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, product: null });
  const [addModal, setAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

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
      toast.success('Producto eliminado exitosamente');
      setDeleteModal({ isOpen: false, productId: null, productName: '' });
    } else {
      toast.error(result.error || 'Error al eliminar el producto');
    }
  };

  // Abrir modal de edición
  const handleOpenEditModal = (product) => {
    setEditModal({ isOpen: true, product });
  };

  // Cerrar modal de edición
  const handleCloseEditModal = () => {
    setEditModal({ isOpen: false, product: null });
  };

  // Cerrar modal de agregar
  const handleCloseAddModal = () => {
    setAddModal(false);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-brand-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-elegant py-16">
        <div className="bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{'Administrar Productos - Bella Boutique'}</title>
        <meta name="description" content="Panel de administración de productos. Crear, editar y eliminar productos del catálogo." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="container-elegant py-4 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-brand-black transition-colors">
            Inicio
          </Link>
          <FiChevronRight size={14} className="text-gray-400" />
          <span className="text-brand-black font-medium">Administrar Productos</span>
        </nav>
      </div>
      
      <div className="container-elegant py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="section-title !mb-0">Administrar Productos</h1>
          <button
            onClick={() => setAddModal(true)}
            className="btn-primary flex items-center gap-2"
            aria-label="Agregar nuevo producto"
          >
            <FiPlus size={18} />
            Agregar Producto
          </button>
        </div>

        {/* Tabla de productos */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-brand-blush/30">
            <div className="w-16 h-16 bg-brand-blush mx-auto mb-4 flex items-center justify-center">
              <FiPackage size={28} className="text-brand-rose" />
            </div>
            <p className="text-gray-600 text-lg mb-4">No hay productos disponibles</p>
            <button
              onClick={() => setAddModal(true)}
              className="btn-primary"
              aria-label="Agregar el primer producto"
            >
              Agregar el primer producto
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                      Producto
                    </th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                      Precio
                    </th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider font-semibold text-gray-500 hidden md:table-cell">
                      Categoría
                    </th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider font-semibold text-gray-500 hidden lg:table-cell">
                      Descripción
                    </th>
                    <th className="text-right py-4 px-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover"
                          />
                          <span className="font-medium text-brand-black line-clamp-1">
                            {product.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-brand-black">
                          ${Number(product.price).toLocaleString('es-AR')}
                        </span>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <p className="text-gray-500 text-sm truncate max-w-xs">
                          {product.description}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="w-9 h-9 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"
                            title="Editar"
                            aria-label={`Editar ${product.title}`}
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(product)}
                            className="w-9 h-9 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            title="Eliminar"
                            aria-label={`Eliminar ${product.title}`}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <div className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-elegant animate-scale-in">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-display text-xl font-medium text-brand-black">Editar Producto</h2>
                <button
                  onClick={() => setEditModal({ isOpen: false, product: null })}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-gray-100 transition-all"
                  aria-label="Cerrar"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-6">
                <ProductForm
                  initialData={editModal.product}
                  isEdit={true}
                  onSuccess={handleCloseEditModal}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal de agregar */}
        {addModal && (
          <div className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-elegant animate-scale-in">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-display text-xl font-medium text-brand-black">Agregar Producto</h2>
                <button
                  onClick={() => setAddModal(false)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-gray-100 transition-all"
                  aria-label="Cerrar"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-6">
                <ProductForm onSuccess={handleCloseAddModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
