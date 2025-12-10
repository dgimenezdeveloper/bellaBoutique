import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductContext';
import ConfirmModal from '../components/ConfirmModal';
import ProductForm from '../components/ProductForm';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
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
    <>
      <Helmet>
        <title>{'Administrar Productos - Bella Boutique'}</title>
        <meta name="description" content="Panel de administración de productos. Crear, editar y eliminar productos del catálogo." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container mx-auto py-4 py-md-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 mb-md-5 gap-3">
          <h1 className="text-uppercase fw-bold mb-0" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            Administrar Productos
          </h1>
          <button
            onClick={() => setAddModal(true)}
            className="btn btn-dark btn-lg rounded-3 fw-bold d-flex align-items-center gap-2"
            aria-label="Agregar nuevo producto"
          >
            <FiPlus size={20} />
            Agregar Producto
          </button>
        </div>

        {/* Tabla de productos */}
        {products.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-3">
            <p className="text-muted fs-5 mb-3">No hay productos disponibles</p>
            <button
              onClick={() => setAddModal(true)}
              className="btn btn-dark rounded-3"
              aria-label="Agregar el primer producto"
            >
              Agregar el primer producto
            </button>
          </div>
        ) : (
          <div className="table-responsive bg-white rounded-3 shadow">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="text-uppercase small fw-semibold text-muted">
                    Producto
                  </th>
                  <th scope="col" className="text-uppercase small fw-semibold text-muted">
                    Precio
                  </th>
                  <th scope="col" className="text-uppercase small fw-semibold text-muted">
                    Categoría
                  </th>
                  <th scope="col" className="text-uppercase small fw-semibold text-muted">
                    Descripción
                  </th>
                  <th scope="col" className="text-uppercase small fw-semibold text-muted text-end">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="rounded"
                          style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                        />
                        <div className="ms-3">
                          <div className="fw-medium">{product.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="fw-bold">${product.price}</div>
                    </td>
                    <td className="align-middle">
                      <span className="badge bg-secondary rounded-pill">
                        {product.category}
                      </span>
                    </td>
                    <td className="align-middle">
                      <div className="text-muted small" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.description}
                      </div>
                    </td>
                    <td className="align-middle text-end">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="btn btn-link text-primary p-1 me-2"
                        title="Editar"
                        aria-label={`Editar ${product.title}`}
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(product)}
                        className="btn btn-link text-danger p-1"
                        title="Eliminar"
                        aria-label={`Eliminar ${product.title}`}
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
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title fs-4 fw-bold" id="editModalLabel">Editar Producto</h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditModal({ isOpen: false, product: null })}
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  <ProductForm
                    initialData={editModal.product}
                    isEdit={true}
                    onSuccess={handleCloseEditModal}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de agregar */}
        {addModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="addModalLabel" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title fs-4 fw-bold" id="addModalLabel">Agregar Producto</h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAddModal(false)}
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  <ProductForm onSuccess={handleCloseAddModal} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
