// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="mt-8 border-t pt-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2 border-b pb-2">
              <span>{item.title}</span>
              <span>${item.price.toFixed(2)} x {item.quantity}</span>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;