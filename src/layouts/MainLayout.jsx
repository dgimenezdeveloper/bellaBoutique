import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import SocialBar from '../components/SocialBar';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaTiktok, FaFacebookF } from 'react-icons/fa';

const Footer = () => (
    <footer className="bg-brand-black text-white mt-16 sm:mt-20">
        {/* Newsletter Section */}
        <div className="gradient-elegant py-12 sm:py-16">
            <div className="container-elegant text-center">
                <h3 className="font-display text-2xl sm:text-3xl text-brand-black mb-3">
                    Únete a nuestra comunidad
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Suscríbete y recibe un 10% de descuento en tu primera compra
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
                    <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="flex-1 px-4 py-3 border border-gray-300 focus:border-brand-gold focus:outline-none text-brand-black bg-white"
                    />
                    <button
                        type="submit"
                        className="btn-primary flex items-center justify-center gap-2"
                    >
                        <FiSend size={16} />
                        Suscribirse
                    </button>
                </form>
            </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 sm:py-16">
            <div className="container-elegant">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand Column */}
                    <div className="text-center sm:text-left">
                        <h4 className="font-display text-2xl text-white mb-4">Bella Boutique</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Tu destino de moda femenina. Elegancia y estilo para cada ocasión.
                        </p>
                        <div className="flex justify-center sm:justify-start gap-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                               className="w-10 h-10 flex items-center justify-center border border-gray-600 text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-all duration-300">
                                <FiInstagram size={18} />
                            </a>
                            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 flex items-center justify-center border border-gray-600 text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-all duration-300">
                                <FaWhatsapp size={18} />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 flex items-center justify-center border border-gray-600 text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-all duration-300">
                                <FaTiktok size={18} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 flex items-center justify-center border border-gray-600 text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-all duration-300">
                                <FaFacebookF size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center sm:text-left">
                        <h5 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
                            Tienda
                        </h5>
                        <ul className="space-y-3">
                            <li><Link to="/nuevos-ingresos" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Nuevos Ingresos</Link></li>
                            <li><Link to="/category/verano" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Colección Verano</Link></li>
                            <li><Link to="/category/denim" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Denim</Link></li>
                            <li><Link to="/category/accesorios" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Accesorios</Link></li>
                            <li><Link to="/products" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Ver Todo</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="text-center sm:text-left">
                        <h5 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
                            Ayuda
                        </h5>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Preguntas Frecuentes</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Envíos y Entregas</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Cambios y Devoluciones</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Guía de Talles</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Términos y Condiciones</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-center sm:text-left">
                        <h5 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
                            Contacto
                        </h5>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm">
                                <FiMapPin size={16} className="text-brand-gold flex-shrink-0" />
                                <span>Buenos Aires, Argentina</span>
                            </li>
                            <li>
                                <a href="tel:+5491112345678" className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-brand-gold transition-colors text-sm">
                                    <FiPhone size={16} className="text-brand-gold flex-shrink-0" />
                                    <span>+54 9 11 1234-5678</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hola@bellaboutique.com" className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-brand-gold transition-colors text-sm">
                                    <FiMail size={16} className="text-brand-gold flex-shrink-0" />
                                    <span>hola@bellaboutique.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
            <div className="container-elegant flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-xs">
                    © 2025 Bella Boutique. Todos los derechos reservados.
                </p>
                <div className="flex items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 opacity-50 hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    </footer>
);

const MainLayout = ({ children }) => {
    const { cart } = useCart();
    const cartItemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    return (
        <div className="flex flex-col min-h-screen font-body">
            <Navbar cartItemCount={cartItemCount} />
            <main className="flex-grow">
                <div className="container-elegant py-6 sm:py-8 lg:py-10">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;