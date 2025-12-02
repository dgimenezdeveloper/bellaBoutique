// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const QuantityButton = styled.button`
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e5e7eb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCart();

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const item = cart.find((item) => item.id === id);
    if (item) {
      const diff = quantity - item.quantity;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) addToCart(item);
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) removeFromCart(id);
      }
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast.info(`${item.title} eliminado del carrito`);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 10;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrito de Compras - Bella Boutique</title>
          <meta name="description" content="Tu carrito de compras está vacío. Explora nuestros productos de moda." />
        </Helmet>
        
        <div className="container py-5">
          <div className="text-center py-5">
            <FiShoppingBag size={80} className="text-muted mb-4 mx-auto" />
            <h1 className="display-5 fw-bold mb-3">Tu carrito está vacío</h1>
            <p className="text-muted mb-4 fs-5">Parece que aún no has agregado nada. ¡Explora nuestros productos!</p>
            <Link
              to="/products"
              className="btn btn-dark btn-lg rounded-pill px-5"
              aria-label="Ver productos disponibles"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Carrito de Compras ({cart.length}) - Bella Boutique</title>
        <meta name="description" content={`Tienes ${cart.length} productos en tu carrito. Finaliza tu compra ahora.`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container py-4 py-md-5">
        <h1 className="text-uppercase fw-bold mb-4 mb-md-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          Carrito de Compras
        </h1>
        
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="card shadow-sm">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-3 col-md-2">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="img-fluid rounded"
                          style={{ maxHeight: '100px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="col-9 col-md-10">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-3 mb-md-0">
                            <h5 className="fw-semibold mb-1">{item.title}</h5>
                            <p className="text-muted small mb-0">Precio unitario: ${item.price.toFixed(2)}</p>
                          </div>
                          <div className="col-md-4 mb-3 mb-md-0">
                            <div className="d-flex align-items-center gap-2">
                              <label className="small text-muted me-2 mb-0">Cantidad:</label>
                              <div className="d-flex align-items-center gap-2">
                                <QuantityButton
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  aria-label="Disminuir cantidad"
                                >
                                  <FiMinus size={14} />
                                </QuantityButton>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="form-control form-control-sm text-center"
                                  style={{ width: '60px' }}
                                  aria-label="Cantidad del producto"
                                />
                                <QuantityButton
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Aumentar cantidad"
                                >
                                  <FiPlus size={14} />
                                </QuantityButton>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 text-md-end">
                            <p className="fw-bold fs-5 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                            <button 
                              onClick={() => handleRemove(item)} 
                              className="btn btn-link text-danger p-0"
                              aria-label={`Eliminar ${item.title} del carrito`}
                            >
                              <FiTrash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="card-body p-4">
                <h2 className="card-title text-uppercase fw-bold mb-4 h5">Resumen del Pedido</h2>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                  <span>Envío</span>
                  <span className="fw-semibold">{subtotal > 50 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {subtotal <= 50 && (
                  <div className="alert alert-info small mb-3" role="status">
                    Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis
                  </div>
                )}
                <div className="d-flex justify-content-between fw-bold fs-4 mb-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-dark w-100 rounded-pill py-3 fw-bold"
                  aria-label="Finalizar compra"
                >
                  Finalizar Compra
                </button>
                <Link 
                  to="/products" 
                  className="btn btn-outline-dark w-100 rounded-pill mt-3"
                  aria-label="Continuar comprando"
                >
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;