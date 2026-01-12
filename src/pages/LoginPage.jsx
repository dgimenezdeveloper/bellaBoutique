import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = login(email, password);
    if (success) {
      toast.success('¡Bienvenido de nuevo!', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: '0',
        }
      });
      navigate('/');
    } else {
      setError('Las credenciales son incorrectas. Intenta con contraseña "1234".');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{'Iniciar Sesión - Bella Boutique'}</title>
        <meta name="description" content="Inicia sesión en tu cuenta de Bella Boutique para acceder a tu perfil y realizar compras." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-[70vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-6">
              <h1 className="font-display text-3xl text-brand-black">Bella Boutique</h1>
            </Link>
            <h2 className="font-display text-2xl text-brand-black mb-2">Bienvenido de nuevo</h2>
            <p className="text-gray-500">Ingresá a tu cuenta para continuar</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:border-brand-gold focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  id="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 focus:border-brand-gold focus:outline-none transition-colors"
                  placeholder="••••••••"
                  aria-label="Contraseña"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Iniciar Sesión
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-8 p-4 bg-brand-blush/50 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Demo:</span> Usa cualquier email con contraseña <code className="bg-white px-1.5 py-0.5 text-brand-black">1234</code>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              ¿No tenés cuenta?{' '}
              <button className="text-brand-black font-medium hover:text-brand-gold transition-colors">
                Registrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;