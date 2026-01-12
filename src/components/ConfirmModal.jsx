import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading = false, confirmText = 'Aceptar', cancelText = 'Cancelar', hideCancel = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 sm:p-8 max-w-md w-full shadow-elegant animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-blush flex items-center justify-center">
            <FiAlertCircle size={20} className="text-brand-rose" />
          </div>
          <h3 className="font-display text-xl font-medium text-brand-black">{title}</h3>
        </div>
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          {!hideCancel && (
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 font-medium text-sm tracking-wide hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2.5 bg-brand-black text-white font-medium text-sm tracking-wide hover:bg-brand-gold hover:text-brand-black transition-all disabled:opacity-50 disabled:hover:bg-brand-black disabled:hover:text-white"
          >
            {loading ? 'Procesando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
