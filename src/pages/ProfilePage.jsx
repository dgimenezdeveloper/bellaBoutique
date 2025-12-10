import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPackage, FiHeart } from 'react-icons/fi';

const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>{'Mi Perfil - Bella Boutique'}</title>
        <meta name="description" content="Gestiona tu perfil, pedidos y preferencias en Bella Boutique." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container py-4 py-md-5">
        <h1 className="text-uppercase fw-bold mb-4 mb-md-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          Mi Perfil
        </h1>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-dark d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '100px', height: '100px' }}>
                  <FiUser size={50} className="text-white" />
                </div>
                <h3 className="h5 fw-bold mb-2">{user?.username || 'Usuario'}</h3>
                <p className="text-muted small mb-3">
                  <FiMail className="me-2" />
                  {user?.email || 'usuario@email.com'}
                </p>
                <button className="btn btn-outline-dark w-100 rounded-pill">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <FiPackage size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="h6 mb-0">Mis Pedidos</h4>
                        <p className="text-muted small mb-0">Ver historial</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      Revisa el estado de tus pedidos y realiza seguimiento de tus compras.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                        <FiHeart size={24} className="text-danger" />
                      </div>
                      <div>
                        <h4 className="h6 mb-0">Favoritos</h4>
                        <p className="text-muted small mb-0">Lista de deseos</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      Guarda tus productos favoritos para comprarlos más tarde.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h3 className="h5 fw-bold mb-4">Información Personal</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Nombre:</strong></p>
                    <p className="text-muted">{user?.username || 'Usuario'}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p className="text-muted">{user?.email || 'usuario@email.com'}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Teléfono:</strong></p>
                    <p className="text-muted">No configurado</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Dirección:</strong></p>
                    <p className="text-muted">No configurada</p>
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