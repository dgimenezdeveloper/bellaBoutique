import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success('¡Bienvenido de nuevo!');
      navigate('/');
    } else {
      toast.error('Credenciales inválidas. Prueba con contraseña "1234".');
      setError('Credenciales inválidas. Prueba con contraseña "1234".');
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Bella Boutique</title>
        <meta name="description" content="Inicia sesión en tu cuenta de Bella Boutique para acceder a tu perfil y realizar compras." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center fw-bold mb-4 display-6">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="needs-validation" noValidate>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-medium">
                      <FiMail className="me-2" />
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="tu@email.com"
                      aria-label="Correo electrónico"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">
                      <FiLock className="me-2" />
                      Contraseña
                    </label>
                    <input 
                      type="password" 
                      id="password" 
                      required 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="••••••••"
                      aria-label="Contraseña"
                      aria-required="true"
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <div>{error}</div>
                    </div>
                  )}
                  <button 
                    type="submit" 
                    className="btn btn-dark btn-lg w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                    aria-label="Iniciar sesión"
                  >
                    <FiLogIn size={20} />
                    Ingresar
                  </button>
                  <p className="text-center text-muted mt-3 small">
                    Demo: Usa cualquier email con contraseña "1234"
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;