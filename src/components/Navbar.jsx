import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
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
  const { user, logout } = useAuth();

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
    <div className="sticky top-0 z-50 bg-brand-cream shadow-md" onMouseLeave={handleMouseLeave}>
      {/* 1. Barra superior de anuncios */}
      <div className="bg-black text-white text-center text-sm py-2">
        Registrate para comprar
      </div>

      {/* 2. Header Principal */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/">
          <img src="/images/bella-boutique.png" alt="Bella Boutique Logo" className="h-20 w-20" />
        </NavLink>
        <div className="w-1/3 hidden md:block">
          <NavbarSearch />
        </div>
        <div className="flex items-center gap-4 text-sm">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-gray-500">Regístrate</NavLink>
              <NavLink to="/login" className="hover:text-gray-500">Iniciar sesión</NavLink>
            </>
          ) : (
            <>
              <span className="font-bold">Hola, {user.username}</span>
              <NavLink to="/admin/products" className="hover:text-gray-500 font-bold text-blue-600">
                Admin
              </NavLink>
              <button onClick={logout} className="hover:text-gray-500">Cerrar sesión</button>
            </>
          )}
          <NavLink to="/wishlist" className="hover:text-gray-500">
            <FiHeart size={24} />
          </NavLink>
          <NavLink to="/cart" className="relative hover:text-gray-500">
            <BsCart3 size={24} />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </NavLink>
        </div>
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
    </div>
  );
};

export default Navbar;