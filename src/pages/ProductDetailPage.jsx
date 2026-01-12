import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiHeart, FiShare2, FiTruck, FiRefreshCw, FiShield, FiChevronRight, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { products, loading: productsLoading } = useProducts();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Buscar producto en el contexto primero
  const product = useMemo(() => {
    return products.find(p => p.id === productId || p.id === parseInt(productId));
  }, [products, productId]);

  // Productos relacionados
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  useEffect(() => {
    if (!productsLoading) {
      setLoading(false);
    }
  }, [productsLoading]);

  useEffect(() => {
    // Scroll to top on product change
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [productId]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.title} agregado al carrito`, {
      position: "top-right",
      autoClose: 2000,
      style: {
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: '0',
      }
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos', {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 tracking-wide">Cargando producto...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h2 className="font-display text-2xl text-brand-black mb-3">Producto no encontrado</h2>
        <p className="text-gray-500 mb-8">Lo sentimos, no pudimos encontrar el producto que buscas.</p>
        <Link to="/products" className="btn-primary">Ver todos los productos</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.title ? String(product.title) : 'Producto'} - Bella Boutique`}</title>
        <meta name="description" content={product.description || 'Detalle de producto en Bella Boutique.'} />
        <meta name="keywords" content={`${product.category ? String(product.category) : ''}, ${product.title ? String(product.title) : ''}, comprar online, moda`} />
        <meta property="og:title" content={product.title ? String(product.title) : 'Producto'} />
        <meta property="og:description" content={product.description || 'Detalle de producto en Bella Boutique.'} />
        <meta property="og:image" content={product.image || ''} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price ? String(product.price) : ''} />
        <meta property="product:price:currency" content="ARS" />
      </Helmet>
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-brand-gold transition-colors">Inicio</Link>
        <FiChevronRight className="text-gray-400" size={14} />
        <Link to="/products" className="text-gray-500 hover:text-brand-gold transition-colors">Productos</Link>
        <FiChevronRight className="text-gray-400" size={14} />
        <span className="text-brand-black font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
        {/* Product Image */}
        <div className="animate-fade-in">
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative group">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.source === 'mockapi' && (
              <span className="absolute top-4 left-4 bg-brand-gold text-brand-black px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                Nuevo
              </span>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="animate-slide-up lg:py-4">
          <div className="lg:sticky lg:top-32">
            {/* Category */}
            <span className="inline-block text-sm text-gray-500 uppercase tracking-widest mb-4">
              {product.category}
            </span>
            
            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6 leading-tight">
              {product.title}
            </h1>
            
            {/* Price */}
            <div className="mb-8">
              <span className="text-3xl font-semibold text-brand-black">
                ${Number(product.price).toLocaleString('es-AR')}
              </span>
              <span className="text-sm text-gray-500 ml-3">
                o 6 cuotas sin interés de ${Math.ceil(Number(product.price) / 6).toLocaleString('es-AR')}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Cantidad</label>
              <div className="inline-flex items-center border border-gray-300">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  aria-label="Reducir cantidad"
                >
                  <FiMinus size={18} />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <FiPlus size={18} />
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-4 mb-10">
              <button 
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center gap-3 py-4"
                aria-label={`Agregar ${product.title} al carrito`}
              >
                <FiShoppingCart size={20} />
                Agregar al Carrito
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleWishlist}
                  className={`btn-secondary flex items-center justify-center gap-2 py-3 ${
                    isWishlisted ? '!bg-brand-rose !border-brand-rose !text-brand-black' : ''
                  }`}
                  aria-label="Agregar a favoritos"
                >
                  <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                  <span className="hidden sm:inline">Favoritos</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="btn-secondary flex items-center justify-center gap-2 py-3"
                  aria-label="Compartir producto"
                >
                  <FiShare2 size={18} />
                  <span className="hidden sm:inline">Compartir</span>
                </button>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <FiTruck className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-brand-black">Envío Gratis</h4>
                  <p className="text-sm text-gray-500">En compras mayores a $50.000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiRefreshCw className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-brand-black">Cambios y Devoluciones</h4>
                  <p className="text-sm text-gray-500">30 días para cambios gratuitos</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiShield className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-brand-black">Compra Protegida</h4>
                  <p className="text-sm text-gray-500">Tu compra está asegurada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 pt-16">
          <h2 className="section-title mb-12">También te puede gustar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <div 
                key={relatedProduct.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={relatedProduct} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetailPage;