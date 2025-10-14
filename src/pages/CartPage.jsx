// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const CartPage = ({ cartItems, onRemove, onUpdateQuantity }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 10;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">Parece que aún no has agregado nada. ¡Explora nuestros productos!</p>
        <Link
          to="/products"
          className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 uppercase">Carrito de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center bg-white p-4 border rounded-lg shadow-sm">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">Precio: ${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <label className="mr-2">Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 text-center border rounded"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 mt-2">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 uppercase">Resumen del Pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span>Envío</span>
              <span>{subtotal > 50 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;