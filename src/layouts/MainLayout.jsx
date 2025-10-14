import React from 'react';
import Navbar from '../components/Navbar';
import SocialBar from '../components/SocialBar';

const Footer = () => (
    <footer className="bg-gray-800 text-white p-6 mt-8 text-center">
        <p>© 2025 Bella Boutique. Todos los derechos reservados.</p>
    </footer>
);

const MainLayout = ({ children, cartItemCount }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar cartItemCount={cartItemCount} />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                {children}
                <SocialBar />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;