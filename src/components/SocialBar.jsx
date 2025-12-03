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
    <div className="bg-white py-4 sm:py-6 mt-6 sm:mt-8">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center px-2">
        {socialLinks.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            className="flex flex-col items-center justify-center text-gray-700 hover:text-black transition-colors py-2"
          >
            <div className="text-pink-400">{item.icon}</div>
            <p className="mt-1 sm:mt-2 font-semibold text-xs sm:text-sm md:text-base">{item.text}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;