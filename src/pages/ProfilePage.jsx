import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPackage, FiHeart, FiChevronRight, FiPhone, FiMapPin, FiSettings } from 'react-icons/fi';

const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>{'Mi Perfil - Bella Boutique'}</title>
        <meta name="description" content="Gestiona tu perfil, pedidos y preferencias en Bella Boutique." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="container-elegant py-4 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-brand-black transition-colors">
            Inicio
          </Link>
          <FiChevronRight size={14} className="text-gray-400" />
          <span className="text-brand-black font-medium">Mi Perfil</span>
        </nav>
      </div>
      
      <div className="container-elegant py-8 sm:py-12">
        <h1 className="section-title text-center mb-8 sm:mb-12">Mi Perfil</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sidebar - User Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 shadow-card">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-black mx-auto mb-4 flex items-center justify-center">
                  <FiUser size={40} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-medium text-brand-black mb-1">
                  {user?.username || 'Usuario'}
                </h3>
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-6">
                  <FiMail size={14} />
                  {user?.email || 'usuario@email.com'}
                </p>
                <button className="w-full py-3 border border-brand-black text-brand-black font-medium text-sm tracking-wide hover:bg-brand-black hover:text-white transition-all">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blush flex items-center justify-center group-hover:bg-brand-rose transition-colors">
                    <FiPackage size={20} className="text-brand-black" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-brand-black mb-1">Mis Pedidos</h4>
                    <p className="text-gray-500 text-sm">Ver historial de compras</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blush flex items-center justify-center group-hover:bg-brand-rose transition-colors">
                    <FiHeart size={20} className="text-brand-black" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-brand-black mb-1">Favoritos</h4>
                    <p className="text-gray-500 text-sm">Tu lista de deseos</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-medium text-brand-black">
                  Información Personal
                </h3>
                <button className="text-brand-gold hover:text-brand-black transition-colors">
                  <FiSettings size={20} />
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <FiUser size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Nombre</p>
                    <p className="text-brand-black font-medium">{user?.username || 'Usuario'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <FiMail size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-brand-black font-medium">{user?.email || 'usuario@email.com'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <FiPhone size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Teléfono</p>
                    <p className="text-gray-500 italic text-sm">No configurado</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <FiMapPin size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Dirección</p>
                    <p className="text-gray-500 italic text-sm">No configurada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;