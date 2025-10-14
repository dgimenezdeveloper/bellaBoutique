import React from 'react';
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa';

const SocialBar = () => {
  const socialLinks = [
    { icon: <FaWhatsapp size={32} />, text: '¡Escríbenos!', link: '#' },
    { icon: <FaInstagram size={32} />, text: '¡Síguenos!', link: '#' },
    { icon: <FaTiktok size={32} />, text: '¡Diviértete!', link: '#' },
    { icon: <FaFacebookF size={32} />, text: '¡Únete!', link: '#' },
  ];

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {socialLinks.map((item, index) => (
          <a key={index} href={item.link} className="flex flex-col items-center justify-center text-gray-700 hover:text-black transition-colors">
            <div className="text-pink-400">{item.icon}</div>
            <p className="mt-2 font-semibold">{item.text}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;