import React from 'react';
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa';

const SocialBar = () => {
  const socialLinks = [
    { icon: <FaWhatsapp size={28} />, text: '¡Escríbenos!', link: '#' },
    { icon: <FaInstagram size={28} />, text: '¡Síguenos!', link: '#' },
    { icon: <FaTiktok size={28} />, text: '¡Diviértete!', link: '#' },
    { icon: <FaFacebookF size={28} />, text: '¡Únete!', link: '#' },
  ];

  return (
    <div className="bg-white py-6 sm:py-8 mt-8 sm:mt-12">
      <div className="container-elegant grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {socialLinks.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            className="flex flex-col items-center justify-center text-gray-700 hover:text-brand-black transition-colors py-3 group"
          >
            <div className="text-brand-rose group-hover:text-brand-gold transition-colors">{item.icon}</div>
            <p className="mt-2 font-medium text-sm sm:text-base">{item.text}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;