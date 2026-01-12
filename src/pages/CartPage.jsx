// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ConfirmModal from '../components/ConfirmModal';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [successModal, setSuccessModal] = useState(false);

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
    // Remove all quantities of this item
    for (let i = 0; i < item.quantity; i++) {
      removeFromCart(item.id);
    }
    toast.info(`${item.title} eliminado del carrito`, {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: '0',
      }
    });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingThreshold = 50000;
  const shippingCost = subtotal > shippingThreshold ? 0 : 5000;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrito de Compras - Bella Boutique</title>
          <meta name="description" content="Tu carrito de compras está vacío. Explora nuestros productos de moda." />
        </Helmet>
        
        <div className="text-center py-20 animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <FiShoppingBag size={40} className="text-gray-400" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-black mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Parece que aún no has agregado nada. ¡Descubrí nuestras últimas colecciones!
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            Explorar productos
            <FiArrowRight size={18} />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Carrito (${cart.length}) - Bella Boutique`}</title>
        <meta name="description" content={`Tienes ${cart.length} productos en tu carrito.`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-brand-gold transition-colors">Inicio</Link>
        <FiChevronRight className="text-gray-400" size={14} />
        <span className="text-brand-black font-medium">Carrito</span>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl text-brand-black mb-10">
        Carrito de Compras
      </h1>
      
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Producto</div>
            <div className="col-span-2 text-center">Precio</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Items */}
          {cart.map((item, index) => (
            <div 
              key={item.id} 
              className="grid sm:grid-cols-12 gap-4 py-6 border-b border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Product */}
              <div className="sm:col-span-6 flex gap-4">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <Link to={`/product/${item.id}`} className="font-display text-lg text-brand-black hover:text-brand-gold transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => handleRemove(item)} 
                    className="text-gray-400 hover:text-red-500 transition-colors self-start flex items-center gap-1 text-sm"
                    aria-label={`Eliminar ${item.title}`}
                  >
                    <FiTrash2 size={14} />
                    <span className="hidden sm:inline">Eliminar</span>
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="sm:col-span-2 flex sm:justify-center items-center">
                <span className="sm:hidden text-gray-500 mr-2">Precio:</span>
                <span className="text-gray-700">${Number(item.price).toLocaleString('es-AR')}</span>
              </div>

              {/* Quantity */}
              <div className="sm:col-span-2 flex sm:justify-center items-center">
                <span className="sm:hidden text-gray-500 mr-2">Cantidad:</span>
                <div className="inline-flex items-center border border-gray-200">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    aria-label="Reducir cantidad"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="sm:col-span-2 flex sm:justify-end items-center">
                <span className="sm:hidden text-gray-500 mr-2">Total:</span>
                <span className="font-semibold text-brand-black">
                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 lg:p-8 lg:sticky lg:top-32">
            <h2 className="font-display text-xl text-brand-black mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                  {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-AR')}`}
                </span>
              </div>
            </div>

            {subtotal < shippingThreshold && (
              <div className="bg-brand-blush/50 p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Agregá <span className="font-semibold text-brand-black">${(shippingThreshold - subtotal).toLocaleString('es-AR')}</span> más para obtener envío gratis
                </p>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-gold transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center py-4 border-t border-gray-200 mb-6">
              <span className="font-display text-lg text-brand-black">Total</span>
              <span className="font-display text-2xl text-brand-black">
                ${total.toLocaleString('es-AR')}
              </span>
            </div>

            <button 
              className="btn-primary w-full py-4 mb-4"
              onClick={() => setSuccessModal(true)}
            >
              Finalizar Compra
            </button>
            
            <Link to="/products" className="btn-secondary w-full text-center block">
              Seguir Comprando
            </Link>

            <p className="text-xs text-gray-500 text-center mt-6">
              Aceptamos todas las tarjetas. Pago 100% seguro.
            </p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        onConfirm={() => {
          setSuccessModal(false);
          clearCart();
          toast.success('¡Gracias por tu compra!', {
            style: {
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: '0',
            }
          });
        }}
        title="¡Compra exitosa!"
        message="Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación con los detalles de tu compra."
        loading={false}
      />
    </>
  );
};

export default CartPage;