import React from 'react';
import { NavLink } from 'react-router-dom';

const MegaMenu = ({ submenu, closeMenu }) => {
  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-3xl bg-white shadow-elegant border-t border-gray-100 animate-fade-in"
      style={{ marginTop: '1rem' }}
      onMouseLeave={closeMenu}
    >
      {/* Decorative top line */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-0.5 bg-brand-gold"></div>
      
      <div className="px-8 py-10">
        <div className="grid grid-cols-3 gap-12">
          {submenu.columns.map((column, colIndex) => (
            <div key={colIndex}>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <NavLink 
                      to={link.path} 
                      onClick={closeMenu}
                      className={({ isActive }) => `
                        block text-sm tracking-wide transition-all duration-300
                        ${isActive 
                          ? 'text-brand-gold font-medium' 
                          : 'text-gray-600 hover:text-brand-black hover:translate-x-1'
                        }
                      `}
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