import React from 'react';
import { NavLink } from 'react-router-dom';

const MegaMenu = ({ submenu, closeMenu }) => {
  return (
    <div 
      className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg border-t border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out"
      onMouseLeave={closeMenu} // Cierra el menú cuando el mouse sale de él
    >
      <div className="container mx-auto px-4 py-8">
        {/* Usamos grid-cols-3 directamente como se discutió */}
        <div className="grid grid-cols-3 gap-8">
          {submenu.columns.map((column, colIndex) => (
            <div key={colIndex}>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <NavLink 
                      to={link.path} 
                      className="block text-gray-700 hover:text-pink-500 transition-colors uppercase text-sm"
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;