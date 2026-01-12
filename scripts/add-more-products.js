// Script para agregar más productos a categorías con pocos items
// Ejecutar con: node scripts/add-more-products.js

const API_BASE_URL = 'https://692f619991e00bafccd76fb9.mockapi.io';

const moreProducts = [
  // Más REMERAS
  {
    title: 'Remera Básica Negra',
    price: 11000,
    description: 'Remera de algodón 100% corte clásico. Color negro. Cuello redondo. Ideal para uso diario.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Remera Estampada Floral',
    price: 14500,
    description: 'Remera de algodón con estampado floral. Manga corta. Colores vibrantes. Corte femenino.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Remera Rayas Marineras',
    price: 13000,
    description: 'Remera estilo navy con rayas azul y blanco. Algodón suave. Manga corta.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Remera Manga Larga Lisa',
    price: 15000,
    description: 'Remera de manga larga en algodón. Color blanco. Perfecta para entretiempo.',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&q=80',
    category: 'remeras'
  },
  
  // Más POLLERAS
  {
    title: 'Pollera Midi Línea A',
    price: 22000,
    description: 'Pollera midi corte línea A. Tela fluida. Color bordeaux. Cintura elástica.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80',
    category: 'polleras'
  },
  {
    title: 'Pollera Jean Mini',
    price: 18500,
    description: 'Pollera mini de jean. Tiro alto. Color azul clásico. Bolsillos funcionales.',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=500&q=80',
    category: 'polleras'
  },
  
  // Más VESTIDOS
  {
    title: 'Vestido Corto Casual',
    price: 28000,
    description: 'Vestido corto estilo casual. Manga corta. Color terracota. Perfecto para el día.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    category: 'vestidos'
  },
  {
    title: 'Vestido Largo Bohemio',
    price: 38000,
    description: 'Vestido largo estilo boho. Estampado étnico. Tirantes finos. Ideal para verano.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    category: 'vestidos'
  },
  
  // Más JEANS
  {
    title: 'Jean Recto Clásico',
    price: 29500,
    description: 'Jean corte recto clásico. Tiro medio. Denim premium. Color azul oscuro.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'jeans'
  },
  {
    title: 'Jean Skinny Negro',
    price: 27000,
    description: 'Jean skinny ajustado. Color negro total. Alta elasticidad. Tiro alto.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80',
    category: 'jeans'
  },
  
  // Más BLAZERS
  {
    title: 'Blazer Negro Entallado',
    price: 45000,
    description: 'Blazer negro corte entallado. Botón único. Solapas clásicas. Forrado.',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80',
    category: 'blazers'
  },
  
  // Más CAMISAS
  {
    title: 'Camisa Rayada Oversize',
    price: 28000,
    description: 'Camisa rayada estilo boyfriend. Corte oversize. Algodón premium.',
    image: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=500&q=80',
    category: 'camisas'
  },
  {
    title: 'Camisa Denim Celeste',
    price: 26000,
    description: 'Camisa de jean liviana. Color celeste claro. Manga larga enrollable.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80',
    category: 'camisas'
  },
  
  // Más PANTALONES
  {
    title: 'Pantalón Pinzas Beige',
    price: 32000,
    description: 'Pantalón de vestir con pinzas. Color beige. Corte recto. Ideal para oficina.',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80',
    category: 'pantalones'
  },
  
  // CALZADO adicional
  {
    title: 'Sandalias Plataforma',
    price: 35000,
    description: 'Sandalias con plataforma de yute. Tiras de cuero. Color natural.',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80',
    category: 'calzado'
  },
  {
    title: 'Botas Texanas Negras',
    price: 55000,
    description: 'Botas estilo texano. Cuero sintético negro. Taco medio. Caña corta.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
    category: 'calzado'
  },
  
  // Más ACCESORIOS
  {
    title: 'Pañuelo Seda Estampado',
    price: 8500,
    description: 'Pañuelo de seda con estampado paisley. Multiuso: cuello, pelo, cartera.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
    category: 'accesorios'
  },
  {
    title: 'Anteojos Sol Cat Eye',
    price: 12000,
    description: 'Anteojos de sol estilo cat eye. Marco negro. Protección UV400.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    category: 'accesorios'
  },
  
  // Más BIKINIS
  {
    title: 'Bikini Triangular Negro',
    price: 16500,
    description: 'Bikini dos piezas. Corpiño triangular con relleno. Bombacha colaless.',
    image: 'https://images.unsplash.com/photo-1582980816857-62a1e7c93f3e?w=500&q=80',
    category: 'bikinis'
  },
  {
    title: 'Enteriza Deportiva',
    price: 22000,
    description: 'Malla enteriza estilo deportivo. Espalda nadador. Color azul marino.',
    image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=500&q=80',
    category: 'bikinis'
  }
];

async function createProducts() {
  console.log('\n🛍️ Agregando más productos a MockAPI...\n');
  console.log('='.repeat(60) + '\n');
  
  let successCount = 0;
  
  for (let i = 0; i < moreProducts.length; i++) {
    const product = moreProducts[i];
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const created = await response.json();
      console.log(`   ✓ [${i + 1}/${moreProducts.length}] ${created.title} (${created.category})`);
      successCount++;
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`   ✗ Error: ${product.title} - ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ ${successCount} productos creados exitosamente!\n`);
}

if (typeof fetch === 'undefined') {
  console.error('❌ Este script requiere Node.js v18+');
  process.exit(1);
}

createProducts();
