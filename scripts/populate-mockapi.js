// Script para poblar MockAPI con productos reales de moda femenina
// Ejecutar con: node scripts/populate-mockapi.js

const API_BASE_URL = 'https://692f619991e00bafccd76fb9.mockapi.io';

// Productos reales de moda femenina inspirados en tiendas argentinas
const realProducts = [
  {
    title: 'Remera Oversize Algodón',
    price: 13000,
    description: 'Remera de algodón 100% con corte oversize. Diseño minimalista en color negro total. Perfecta para combinar con jeans o calzas. Talle único que se adapta de S a L.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Jean Mom Fit Tiro Alto',
    price: 28500,
    description: 'Jean clásico estilo mom fit con tiro alto y corte recto. Denim de alta calidad con elasticidad moderada. Color azul medio con desgaste natural. Disponible en talles del 36 al 44.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'pantalones'
  },
  {
    title: 'Vestido Midi Floral',
    price: 35000,
    description: 'Vestido midi con estampado floral romántico. Manga corta tipo globo y escote en V. Tela de viscosa fluida ideal para primavera-verano. Cintura marcada con elástico.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    category: 'vestidos'
  },
  {
    title: 'Blazer Lino Natural',
    price: 42000,
    description: 'Blazer confeccionado en lino 100% natural. Corte clásico con solapas y botones frontales. Color beige arena. Perfecto para look casual-elegante. Forrado internamente.',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Pollera Plisada Satinada',
    price: 24000,
    description: 'Pollera midi plisada en tela satinada con brillo sutil. Cintura con elástico. Color negro elegante. Ideal para ocasiones especiales o looks de oficina. Talle S a XL.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80',
    category: 'polleras'
  },
  {
    title: 'Buzo Crop Canguro',
    price: 19500,
    description: 'Buzo corto tipo crop con capucha y bolsillo canguro. Algodón frizado interior. Color gris melange. Perfecto para looks deportivos urbanos. Cordón ajustable en capucha.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Camisa Seda Blanca',
    price: 32000,
    description: 'Camisa confeccionada en seda natural con caída fluida. Cuello clásico y botones delanteros. Color blanco puro. Manga larga con puño ajustable. Elegancia atemporal.',
    image: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Short Denim Roturas',
    price: 16500,
    description: 'Short de jean con roturas decorativas y deshilachado en el ruedo. Tiro alto y fit ajustado. Color azul claro con lavado vintage. Bolsillos funcionales adelante y atrás.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'pantalones'
  },
  {
    title: 'Top Cropped Morley',
    price: 12000,
    description: 'Top corto en tela morley con textura acanalada. Escote redondo y manga corta. Color negro básico. Elástico en cintura para mejor calce. Ideal para combinar con polleras o jeans.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Pantalón Palazzo Lino',
    price: 29000,
    description: 'Pantalón palazzo de lino con pierna ancha y fluida. Cintura alta con elástico y cordón ajustable. Color terracota. Fresco y cómodo para días calurosos. Bolsillos laterales.',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80',
    category: 'pantalones'
  },
  {
    title: 'Vestido Camisero Rayas',
    price: 31000,
    description: 'Vestido estilo camisero con estampado de rayas verticales azul y blanco. Botones frontales y cinturón incluido. Manga 3/4. Largo por debajo de la rodilla. Corte recto favorecedor.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    category: 'vestidos'
  },
  {
    title: 'Cartera Bandolera Cuero',
    price: 38000,
    description: 'Cartera tipo bandolera en cuero ecológico premium. Color camel con herrajes dorados. Correa ajustable y removible. Compartimentos interiores organizadores. Cierre magnético de seguridad.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
    category: 'accesorios'
  },
  {
    title: 'Sweater Trenzado Oversize',
    price: 34000,
    description: 'Sweater tejido con trenzas en punto grueso. Corte oversize y caída suelta. Color crudo natural. Cuello redondo y puños elásticos. Perfecto para entretiempo. 70% lana.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Mono Largo Negro',
    price: 39000,
    description: 'Mono enterizo de pierna ancha en color negro. Escote en V y tirantes anchos. Cintura marcada con cinturón incluido. Bolsillos laterales. Tela fluida y cómoda. Cierre lateral.',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&q=80',
    category: 'vestidos'
  },
  {
    title: 'Campera Jean Oversized',
    price: 36000,
    description: 'Campera de jean en color azul medio con corte oversized. Cuello clásico y botones metálicos. Dos bolsillos pecho y dos bajos. Interior sin forro para usar todo el año. Efecto vintage.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Bikini Alta Cintura',
    price: 18000,
    description: 'Conjunto de bikini con bombacha de tiro alto y corpiño triangular. Color rojo vibrante. Breteles regulables y ajustables. Tela de secado rápido con protección UV. Talles del 1 al 4.',
    image: 'https://images.unsplash.com/photo-1582980816857-62a1e7c93f3e?w=500&q=80',
    category: 'accesorios'
  },
  {
    title: 'Zapatillas Urbanas Blancas',
    price: 45000,
    description: 'Zapatillas deportivas urbanas de cuero sintético. Color blanco total con detalles en plata. Suela de goma con diseño ergonómico. Plantilla acolchada comfort. Cordones planos.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
    category: 'calzado'
  },
  {
    title: 'Collar Cadena Gold',
    price: 8500,
    description: 'Collar de cadena gruesa en baño de oro. Diseño minimalista y moderno. Largo regulable de 40 a 45 cm. Cierre tipo mosquetón seguro. Perfecto para uso diario o eventos.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
    category: 'accesorios'
  },
  {
    title: 'Body Encaje Negro',
    price: 15000,
    description: 'Body de encaje elástico con forro interior. Escote profundo en V y espalda descubierta. Color negro elegante. Cierre con corchetes en la entrepierna. Tela suave sobre la piel.',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&q=80',
    category: 'remeras'
  },
  {
    title: 'Aros Argolla Grande',
    price: 6500,
    description: 'Aros tipo argolla de gran tamaño en acero quirúrgico bañado en oro. Diámetro 6cm. Diseño statement para looks audaces. Cierre con pasador de seguridad. Hipoalergénicos.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80',
    category: 'accesorios'
  }
];

// Función para eliminar todos los productos existentes
async function deleteAllProducts() {
  try {
    console.log('🗑️  Obteniendo productos existentes...');
    const response = await fetch(`${API_BASE_URL}/products`);
    const products = await response.json();
    
    console.log(`📦 Encontrados ${products.length} productos para eliminar`);
    
    // Eliminar cada producto
    for (const product of products) {
      await fetch(`${API_BASE_URL}/products/${product.id}`, {
        method: 'DELETE'
      });
      console.log(`   ✓ Eliminado: ${product.title}`);
    }
    
    console.log('✅ Todos los productos antiguos han sido eliminados\n');
  } catch (error) {
    console.error('❌ Error eliminando productos:', error.message);
    throw error;
  }
}

// Función para crear todos los productos nuevos
async function createAllProducts() {
  try {
    console.log('🛍️  Creando productos reales...\n');
    
    for (let i = 0; i < realProducts.length; i++) {
      const product = realProducts[i];
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) {
        throw new Error(`Error creando producto: ${product.title}`);
      }
      
      const created = await response.json();
      console.log(`   ✓ [${i + 1}/${realProducts.length}] ${created.title} - $${created.price}`);
      
      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n✅ Todos los productos reales han sido creados exitosamente!');
  } catch (error) {
    console.error('❌ Error creando productos:', error.message);
    throw error;
  }
}

// Función principal
async function main() {
  console.log('\n🚀 Iniciando actualización de productos en MockAPI...\n');
  console.log(`📍 API URL: ${API_BASE_URL}\n`);
  console.log('=' .repeat(60));
  console.log('\n');
  
  try {
    // Paso 1: Eliminar productos existentes
    await deleteAllProducts();
    
    // Paso 2: Crear productos nuevos
    await createAllProducts();
    
    console.log('\n' + '='.repeat(60));
    console.log('\n🎉 ¡Proceso completado con éxito!');
    console.log('💡 Recarga tu aplicación para ver los nuevos productos\n');
    
  } catch (error) {
    console.error('\n❌ Error en el proceso:', error.message);
    process.exit(1);
  }
}

// Verificar que Node.js tenga fetch disponible
if (typeof fetch === 'undefined') {
  console.error('❌ Este script requiere Node.js v18 o superior con fetch nativo');
  console.error('💡 Alternativamente, instala node-fetch: npm install node-fetch');
  process.exit(1);
}

// Ejecutar el script
main();
