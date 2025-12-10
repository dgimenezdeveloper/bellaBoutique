import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FiHeart, FiMenu, FiX } from 'react-icons/fi';
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
            { title: 'Ojotras', path: '/category/accesorios/ojotas' },
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
  const { user, logout } = useAuth();
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

  const activeLinkStyle = {
    borderBottom: '2px solid black',
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md" onMouseLeave={handleMouseLeave}>
            {/* Menú Hamburguesa (Móvil) */}
            <button 
              className="md:hidden text-gray-700 p-2" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {/* Menú Móvil */}
            {mobileMenuOpen && (
              <div className="md:hidden fixed inset-0 top-[140px] bg-white z-40 overflow-y-auto">
                <div className="px-4 py-4 space-y-4">
                  {/* Enlaces de usuario móvil */}
                  <div className="border-b pb-4 space-y-3">
                    {!user ? (
                      <>
                        <NavLink 
                          to="/login" 
                          className="block py-2 hover:text-gray-500"
                          onClick={closeMobileMenu}
                        >
                          Regístrate
                        </NavLink>
                        <NavLink 
                          to="/login" 
                          className="block py-2 hover:text-gray-500"
                          onClick={closeMobileMenu}
                        >
                          Iniciar sesión
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <div className="py-2 font-bold">Hola, {user.username}</div>
                        <NavLink 
                          to="/admin/products" 
                          className="block py-2 text-blue-600 font-bold"
                          onClick={closeMobileMenu}
                        >
                          Admin
                        </NavLink>
                        <button 
                          onClick={() => { logout(); closeMobileMenu(); }} 
                          className="block py-2 text-left w-full"
                        >
                          Cerrar sesión
                        </button>
                      </>
                    )}
                  </div>

                  {/* Enlaces de navegación */}
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.title}
                      to={link.path}
                      className={`block py-3 text-lg font-semibold uppercase border-b hover:text-gray-500 ${link.special ? 'text-red-500' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
      {/* 1. Barra superior de anuncios */}
      <div className="bg-black text-white text-center text-xs sm:text-sm py-2 px-2">
        Regístrate para comprar
      </div>

      {/* 2. Header Principal */}
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" onClick={closeMobileMenu}>
          <img src="/images/bella-boutique.png" alt="Bella Boutique Logo" className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20" />
        </NavLink>

        {/* Búsqueda Desktop */}
        <div className="w-1/3 hidden lg:block">
          <NavbarSearch />
        </div>

        {/* Menú Hamburguesa (Móvil) */}
        <button 
          className="md:hidden text-gray-700 p-2" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Iconos de Usuario (Desktop) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 text-xs lg:text-sm">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-gray-500 hidden lg:inline">Regístrate</NavLink>
              <NavLink to="/login" className="hover:text-gray-500">Iniciar sesión</NavLink>
            </>
          ) : (
            <>
              <span className="font-bold hidden lg:inline">Hola, {user.username}</span>
              <NavLink to="/admin/products" className="hover:text-gray-500 font-bold text-blue-600 hidden lg:inline">
                Admin
              </NavLink>
              <button onClick={logout} className="hover:text-gray-500">Cerrar sesión</button>
            </>
          )}
          <NavLink to="/wishlist" className="hover:text-gray-500">
            <FiHeart size={20} className="lg:w-6 lg:h-6" />
          </NavLink>
          <NavLink to="/cart" className="relative hover:text-gray-500">
            <BsCart3 size={20} className="lg:w-6 lg:h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Iconos Móviles (solo carrito y favoritos) */}
        <div className="flex md:hidden items-center gap-3">
          <NavLink to="/wishlist" className="hover:text-gray-500">
            <FiHeart size={20} />
          </NavLink>
          <NavLink to="/cart" className="relative hover:text-gray-500">
            <BsCart3 size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {/* Búsqueda Móvil */}
      <div className="lg:hidden px-3 pb-3">
        <NavbarSearch />
      </div>

      {/* 3. Menú de Navegación */}
      <nav className="border-t border-gray-200">
        <div className="container mx-auto px-4 flex justify-center items-center gap-8 text-md font-semibold uppercase py-3 relative">
          {navLinks.map((link) => (
            <div
              key={link.title}
              className="py-2"
              onMouseEnter={() => handleMouseEnter(link.title)}
            >
              <NavLink
                to={link.path}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className={`hover:text-gray-500 ${link.special ? 'text-red-500' : ''}`}
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

      {/* Menú Móvil (opcional: puedes restaurar lógica móvil si lo deseas, pero la prioridad es el menú desktop) */}
    </div>
  );
};

export default Navbar;