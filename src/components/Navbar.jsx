import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FiHeart, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { BsCart3 } from 'react-icons/bs';
import MegaMenu from './MegaMenu';
import NavbarSearch from './NavbarSearch';

// Estructura de datos para los enlaces de navegación
const navLinks = [
  { title: 'Nuevos Ingresos', path: '/category/nuevos-ingresos' },
  {
    title: 'Verano 2026',
    path: '/category/verano-2026',
    submenu: {
      columns: [
        { links: [
            { title: 'Remeras', path: '/category/verano/remeras' },
            { title: 'Polleras', path: '/category/verano/polleras' },
            { title: 'Tops', path: '/category/verano/tops' },
            { title: 'Joggings', path: '/category/verano/joggings' },
        ]},
        { links: [
            { title: 'Musculosas', path: '/category/verano/musculosas' },
            { title: 'Shorts', path: '/category/verano/shorts' },
            { title: 'Calzas', path: '/category/verano/calzas' },
            { title: 'Bodies', path: '/category/verano/bodies' },
        ]},
        { links: [
            { title: 'Vestidos', path: '/category/verano/vestidos' },
            { title: 'Bikers', path: '/category/verano/bikers' },
            { title: 'Buzos', path: '/category/verano/buzos' },
        ]},
      ]
    }
  },
  { 
    title: 'Denim',
  path: '/category/denim',
  submenu: {
    columns: [
      { links: [
          { title: 'Shorts', path: '/category/denim/shorts' },
          { title: 'Brillos', path: '/category/denim/brillos' },
          { title: 'Wide Leg', path: '/category/denim/wide-leg' },
          { title: 'Roturas', path: '/category/denim/roturas' },
          { title: 'Joggers', path: '/category/denim/joggers' },
          { title: 'Jardineros', path: '/category/denim/jardineros' },
      ]},
      { links: [
          { title: 'Minis', path: '/category/denim/minis' },
          { title: 'Super Elastizados', path: '/category/denim/super-elastizados' },
          { title: 'Clasicos', path: '/category/denim/clasicos' },
          { title: 'Oxford', path: '/category/denim/oxford' },
          { title: 'Chalecos', path: '/category/denim/chalecos' },
      ]},
      { links: [
          { title: 'Bermudas', path: '/category/denim/bermudas' },
          { title: 'Tachas', path: '/category/denim/tachas' },
          { title: 'Mom', path: '/category/denim/mom' },
          { title: 'Cargos', path: '/category/denim/cargos' },
          { title: 'Camperas', path: '/category/denim/camperas' },
      ]},
    ]
  },
   },
  { title: 'Ofertas', path: '/category/ofertas', special: true },
  { title: 'Invierno 2025', path: '/category/invierno-2025' },
  {
    title: 'Accesorios',
    path: '/category/accesorios',
    submenu: {
      columns: [
        { links: [
            { title: 'Ojotas', path: '/category/accesorios/ojotas' },
            { title: 'Ropa Interior', path: '/category/accesorios/ropa-interior' },
            { title: 'Cintos', path: '/category/accesorios/cintos' },
        ]},
        { links: [
            { title: 'Bolsos', path: '/category/accesorios/bolsos' },
            { title: 'Fragancias', path: '/category/accesorios/fragancias' },
        ]},
        { links: [
            { title: 'Gorras', path: '/category/accesorios/gorras' },
            { title: 'Bolsas', path: '/category/accesorios/bolsas' },
        ]},
      ]
    }
  },
];

const Navbar = ({ cartItemCount }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMouseEnter = (title) => {
    setOpenMenu(title);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <div 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-elegant' : 'bg-white'
      }`} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Menú Móvil Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-white z-50 overflow-y-auto animate-fade-in">
          <div className="flex justify-between items-center p-4 border-b">
            <NavLink to="/" onClick={closeMobileMenu}>
              <span className="font-display text-2xl text-brand-black">Bella Boutique</span>
            </NavLink>
            <button 
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Cerrar menú"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="px-6 py-6 space-y-1">
            {/* Usuario móvil */}
            <div className="border-b border-gray-100 pb-6 mb-6">
              {!user ? (
                <div className="space-y-3">
                  <NavLink 
                    to="/login" 
                    className="flex items-center gap-3 py-3 text-brand-black hover:text-brand-gold transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <FiUser size={20} />
                    <span className="font-medium">Iniciar sesión</span>
                  </NavLink>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="py-3 font-display text-lg">Hola, {user.username}</div>
                  <NavLink 
                    to="/admin/products" 
                    className="flex items-center gap-3 py-3 text-brand-gold font-medium"
                    onClick={closeMobileMenu}
                  >
                    <FiSettings size={20} />
                    Panel Admin
                  </NavLink>
                  <button 
                    onClick={() => { logout(); closeMobileMenu(); }} 
                    className="flex items-center gap-3 py-3 text-gray-600 hover:text-brand-black transition-colors w-full"
                  >
                    <FiLogOut size={20} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            {/* Enlaces de navegación móvil */}
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={`block py-4 text-lg tracking-wide border-b border-gray-50 transition-colors ${
                  link.special 
                    ? 'text-brand-rose font-semibold' 
                    : 'text-brand-black hover:text-brand-gold'
                }`}
                onClick={closeMobileMenu}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* 1. Barra superior de anuncios */}
      <div className="bg-brand-black text-white text-center text-xs py-2.5 px-4 tracking-widest uppercase">
        <span className="opacity-90">Envío gratis en compras mayores a $50.000</span>
      </div>

      {/* 2. Header Principal */}
      <div className="container-elegant py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" onClick={closeMobileMenu} className="flex-shrink-0 flex items-center gap-2" aria-label="Inicio Bella Boutique">
          <img 
            src="/images/bella-boutique.png" 
            alt="Bella Boutique logo" 
            className="h-10 w-auto sm:h-12 object-contain select-none" 
            style={{ maxWidth: '120px' }}
            draggable="false"
          />
          <span className="sr-only">Bella Boutique</span>
        </NavLink>

        {/* Búsqueda Desktop */}
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <NavbarSearch />
        </div>

        {/* Iconos de Usuario Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <NavLink 
              to="/login" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-black transition-colors"
            >
              <FiUser size={20} />
              <span className="hidden lg:inline">Cuenta</span>
            </NavLink>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden lg:inline">
                Hola, <span className="font-medium text-brand-black">{user.username}</span>
              </span>
              <NavLink 
                to="/admin/products" 
                className="text-sm text-brand-gold font-medium hover:text-brand-black transition-colors hidden lg:inline"
              >
                Admin
              </NavLink>
              <button 
                onClick={logout} 
                className="text-gray-500 hover:text-brand-black transition-colors"
                aria-label="Cerrar sesión"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          )}
          
          <NavLink 
            to="/wishlist" 
            className="text-gray-600 hover:text-brand-rose transition-colors"
            aria-label="Favoritos"
          >
            <FiHeart size={22} />
          </NavLink>
          
          <NavLink 
            to="/cart" 
            className="relative text-gray-600 hover:text-brand-black transition-colors"
            aria-label="Carrito"
          >
            <BsCart3 size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs font-semibold w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Iconos Móviles */}
        <div className="flex md:hidden items-center gap-4">
          <NavLink 
            to="/wishlist" 
            className="text-gray-600 hover:text-brand-rose transition-colors"
            aria-label="Favoritos"
          >
            <FiHeart size={22} />
          </NavLink>
          <NavLink 
            to="/cart" 
            className="relative text-gray-600 hover:text-brand-black transition-colors"
            aria-label="Carrito"
          >
            <BsCart3 size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs font-semibold w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </NavLink>
          <button 
            className="text-gray-700 p-1 hover:bg-gray-100 transition-colors" 
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Búsqueda Móvil */}
      <div className="lg:hidden px-4 pb-4">
        <NavbarSearch />
      </div>

      {/* 3. Menú de Navegación Desktop */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="container-elegant flex justify-center items-center gap-8 lg:gap-12 py-4">
          {navLinks.map((link) => (
            <div
              key={link.title}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.title)}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  text-sm uppercase tracking-[0.15em] font-medium transition-colors relative
                  ${link.special 
                    ? 'text-brand-rose hover:text-brand-rose/80' 
                    : isActive 
                      ? 'text-brand-gold' 
                      : 'text-gray-700 hover:text-brand-black'
                  }
                  ${isActive && !link.special ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-brand-gold' : ''}
                `}
              >
                {link.title}
              </NavLink>
              {link.submenu && openMenu === link.title && (
                <MegaMenu submenu={link.submenu} closeMenu={handleMouseLeave} />
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;