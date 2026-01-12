// Script para agregar más productos a MockAPI cubriendo todas las categorías del menú
// Ejecutar con: node scripts/add-category-products.js

const API_BASE_URL = 'https://692f619991e00bafccd76fb9.mockapi.io';

// Productos adicionales para cubrir todas las categorías del menú
const additionalProducts = [
  // VERANO - Musculosas
  {
    title: 'Musculosa Tirantes Finos',
    price: 9500,
    description: 'Musculosa básica de algodón con tirantes finos ajustables. Ideal para verano. Color blanco. Escote redondo.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
    category: 'musculosas'
  },
  {
    title: 'Musculosa Deportiva Dry Fit',
    price: 11000,
    description: 'Musculosa deportiva con tecnología dry fit para mayor frescura. Perfecta para entrenar o usar casual. Color negro.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80',
    category: 'musculosas'
  },
  {
    title: 'Musculosa Espalda Cruzada',
    price: 10500,
    description: 'Musculosa con diseño de espalda cruzada. Tela liviana y fresca. Color rosa pastel. Ideal para días calurosos.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80',
    category: 'musculosas'
  },
  
  // VERANO - Tops
  {
    title: 'Top Crop Encaje',
    price: 8500,
    description: 'Top cropped con detalles de encaje. Estilo romántico y femenino. Color beige. Tirantes ajustables.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80',
    category: 'tops'
  },
  {
    title: 'Top Strapless Fruncido',
    price: 9000,
    description: 'Top sin tirantes con fruncido frontal. Tela elástica que se adapta al cuerpo. Color verde esmeralda.',
    image: 'https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3?w=500&q=80',
    category: 'tops'
  },
  {
    title: 'Top Halter Satinado',
    price: 12500,
    description: 'Top estilo halter en tela satinada con brillo sutil. Cuello ajustable. Color champagne. Elegante para salidas nocturnas.',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&q=80',
    category: 'tops'
  },
  
  // VERANO - Shorts
  {
    title: 'Short Tiro Alto Lino',
    price: 14500,
    description: 'Short de lino natural con tiro alto y cintura paperbag. Incluye cinturón del mismo material. Color blanco.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'shorts'
  },
  {
    title: 'Short Deportivo Running',
    price: 11000,
    description: 'Short deportivo con calza interior integrada. Tela liviana de secado rápido. Color negro con detalles reflectivos.',
    image: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=500&q=80',
    category: 'shorts'
  },
  
  // VERANO - Calzas
  {
    title: 'Calza Deportiva Cintura Alta',
    price: 15000,
    description: 'Calza deportiva de cintura alta con bolsillo lateral para celular. Tela compresión suave. Color gris oscuro.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80',
    category: 'calzas'
  },
  {
    title: 'Calza Ciclista Biker',
    price: 12000,
    description: 'Calza estilo biker hasta la rodilla. Tela elástica y cómoda. Perfecta para usar con remeras oversize. Color negro.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
    category: 'calzas'
  },
  {
    title: 'Calza Larga Estampada',
    price: 13500,
    description: 'Calza larga con estampado animal print. Tela suave y elástica. Ideal para yoga o uso diario.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80',
    category: 'calzas'
  },
  
  // VERANO - Bodies
  {
    title: 'Body Básico Algodón',
    price: 10000,
    description: 'Body básico de algodón suave. Cuello redondo y manga corta. Cierre de broches. Color blanco.',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&q=80',
    category: 'bodies'
  },
  {
    title: 'Body Encaje Transparente',
    price: 14500,
    description: 'Body de encaje con transparencias elegantes. Cuello alto y manga larga. Color negro. Ideal para ocasiones especiales.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    category: 'bodies'
  },
  
  // VERANO - Bikers
  {
    title: 'Biker Short Negro Básico',
    price: 9500,
    description: 'Short biker clásico negro. Tela elástica de algodón. Perfecto para usar bajo vestidos o solo. Cintura elástica.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
    category: 'bikers'
  },
  {
    title: 'Biker Short Estampado',
    price: 11000,
    description: 'Short biker con estampado tie-dye en tonos pasteles. Tela suave y cómoda. Ideal para looks casuales.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80',
    category: 'bikers'
  },
  
  // VERANO - Joggings
  {
    title: 'Jogger Algodón Frizado',
    price: 18000,
    description: 'Jogger de algodón frizado suave. Puños en los tobillos y cintura elástica con cordón. Color gris melange.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    category: 'joggings'
  },
  {
    title: 'Jogger Cargo Mujer',
    price: 22000,
    description: 'Jogger cargo con bolsillos laterales. Tela liviana de gabardina. Color verde militar. Cintura ajustable.',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80',
    category: 'joggings'
  },
  
  // DENIM - Shorts
  {
    title: 'Short Denim Clásico',
    price: 15500,
    description: 'Short de jean clásico tiro medio. Denim rígido de calidad. Color azul medio. 5 bolsillos.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'shorts-denim'
  },
  
  // DENIM - Wide Leg
  {
    title: 'Jean Wide Leg Celeste',
    price: 32000,
    description: 'Jean de corte wide leg súper amplio. Tiro alto favorecedor. Denim liviano color celeste claro. Largo tobillero.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'jeans'
  },
  {
    title: 'Pantalón Wide Leg Negro',
    price: 28000,
    description: 'Pantalón wide leg de tela fluida negra. Corte palazzo elegante. Cintura alta con cierre lateral.',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80',
    category: 'pantalones'
  },
  
  // DENIM - Mom
  {
    title: 'Jean Mom Celeste Claro',
    price: 27500,
    description: 'Jean mom fit de tiro alto con lavado celeste claro. Denim con algo de elastano para comodidad. Corte recto.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'jeans'
  },
  
  // DENIM - Roturas
  {
    title: 'Jean Boyfriend Roturas',
    price: 29000,
    description: 'Jean boyfriend con roturas en las rodillas. Estilo descontracturado y cómodo. Color azul medio con desgaste.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'jeans'
  },
  
  // DENIM - Camperas
  {
    title: 'Campera Jean Corta',
    price: 34000,
    description: 'Campera de jean corta estilo crop. Perfecta para combinar con vestidos o outfits de tiro alto. Botones metálicos.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    category: 'camperas'
  },
  
  // DENIM - Cargos
  {
    title: 'Jean Cargo Denim',
    price: 31000,
    description: 'Jean cargo con bolsillos laterales. Estilo urbano y funcional. Denim resistente color azul oscuro.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'pantalones'
  },
  
  // DENIM - Bermudas
  {
    title: 'Bermuda Denim Mujer',
    price: 19500,
    description: 'Bermuda de jean hasta la rodilla. Corte recto y cómodo. Color azul clásico. Perfecta para días casuales.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'bermudas'
  },
  
  // DENIM - Oxford
  {
    title: 'Pantalón Oxford Denim',
    price: 28500,
    description: 'Pantalón de jean corte oxford con botamanga ancha. Estilo retro y moderno. Tiro alto. Color azul medio.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'pantalones'
  },
  
  // DENIM - Jardineros
  {
    title: 'Jardinero Denim Clásico',
    price: 35000,
    description: 'Jardinero de jean con breteles ajustables. Bolsillo frontal tipo canguro. Denim suave color azul medio.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'jardineros'
  },
  {
    title: 'Jardinero Short Denim',
    price: 29000,
    description: 'Jardinero corto de jean. Perfecto para verano. Tirantes cruzados en la espalda. Color celeste claro.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'jardineros'
  },
  
  // DENIM - Chalecos
  {
    title: 'Chaleco Denim Oversize',
    price: 26000,
    description: 'Chaleco de jean corte oversize. Ideal para usar sobre remeras o vestidos. Botones frontales. Color azul oscuro.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    category: 'chalecos'
  },
  
  // ACCESORIOS - Ojotas
  {
    title: 'Ojotas Plataforma Blancas',
    price: 12000,
    description: 'Ojotas con plataforma de 4cm. Tira ancha cómoda. Color blanco. Suela antideslizante.',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80',
    category: 'ojotas'
  },
  {
    title: 'Ojotas Dedo Cuero',
    price: 9500,
    description: 'Ojotas de dedo en cuero sintético. Diseño minimalista. Color marrón natural. Plantilla acolchada.',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80',
    category: 'ojotas'
  },
  
  // ACCESORIOS - Ropa Interior
  {
    title: 'Conjunto Ropa Interior Encaje',
    price: 15000,
    description: 'Conjunto de corpiño y bombacha en encaje francés. Color negro elegante. Detalles de moño.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80',
    category: 'ropa-interior'
  },
  {
    title: 'Pack 3 Bombachas Algodón',
    price: 8500,
    description: 'Pack de 3 bombachas de algodón suave. Colores básicos: negro, blanco y nude. Corte bikini.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80',
    category: 'ropa-interior'
  },
  
  // ACCESORIOS - Cintos
  {
    title: 'Cinto Cuero Negro Clásico',
    price: 11000,
    description: 'Cinto de cuero genuino color negro. Hebilla metálica dorada. Ancho 3cm. Largo regulable.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'cintos'
  },
  {
    title: 'Cinto Trenzado Marrón',
    price: 9500,
    description: 'Cinto trenzado en cuero ecológico color marrón. Estilo bohemio. Hebilla ovalada.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'cintos'
  },
  
  // ACCESORIOS - Bolsos
  {
    title: 'Bolso Tote Grande',
    price: 28000,
    description: 'Bolso tote de gran capacidad en cuero ecológico. Color negro con detalles dorados. Asas largas para hombro.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
    category: 'bolsos'
  },
  {
    title: 'Bolso Cruzado Mini',
    price: 18500,
    description: 'Bolso pequeño cruzado ideal para salidas. Cadena dorada removible. Color rosa pastel.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
    category: 'bolsos'
  },
  {
    title: 'Mochila Urbana Negra',
    price: 25000,
    description: 'Mochila urbana con múltiples compartimentos. Tela impermeable. Color negro. Tirantes acolchados.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'bolsos'
  },
  
  // ACCESORIOS - Fragancias
  {
    title: 'Perfume Floral 100ml',
    price: 35000,
    description: 'Perfume con notas florales de jazmín y rosa. Fragancia fresca y femenina. Larga duración.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
    category: 'fragancias'
  },
  {
    title: 'Body Splash Vainilla',
    price: 12000,
    description: 'Body splash con aroma dulce de vainilla. Ideal para uso diario. 250ml.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
    category: 'fragancias'
  },
  
  // ACCESORIOS - Gorras
  {
    title: 'Gorra Dad Cap Lisa',
    price: 7500,
    description: 'Gorra estilo dad cap en algodón. Visera curva. Color beige. Ajuste trasero con hebilla.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    category: 'gorras'
  },
  {
    title: 'Gorra Bucket Hat',
    price: 9000,
    description: 'Sombrero bucket de tela liviana. Protección solar. Color negro. Ideal para playa o ciudad.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    category: 'gorras'
  },
  
  // ACCESORIOS - Bolsas
  {
    title: 'Bolsa Ecológica Tela',
    price: 4500,
    description: 'Bolsa de tela ecológica reutilizable. Estampado floral. Asas largas para hombro. Lavable.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
    category: 'bolsas'
  },
  {
    title: 'Bolsa Playa Grande',
    price: 15000,
    description: 'Bolsa de playa tamaño XL. Rafia natural con detalles de pompones. Interior impermeable.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
    category: 'bolsas'
  },
  
  // OFERTAS - Productos con descuento
  {
    title: 'Remera Básica Pack x3',
    price: 18000,
    description: 'OFERTA! Pack de 3 remeras básicas de algodón. Colores: negro, blanco y gris. Precio especial.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'ofertas',
    discount: 30
  },
  {
    title: 'Vestido Verano SALE',
    price: 19500,
    description: 'LIQUIDACIÓN! Vestido de verano floreado. Antes $35000. Últimas unidades disponibles.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    category: 'ofertas',
    discount: 45
  },
  {
    title: 'Jean Mujer Outlet',
    price: 22000,
    description: 'OUTLET! Jean recto tiro medio. Temporada anterior. Excelente calidad a precio reducido.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    category: 'ofertas',
    discount: 25
  },
  
  // INVIERNO - Buzos
  {
    title: 'Buzo Canguro Oversize',
    price: 24000,
    description: 'Buzo oversize con capucha y bolsillo canguro. Interior frizado. Color bordo. Ideal para invierno.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    category: 'buzos'
  },
  {
    title: 'Buzo Cuello Redondo',
    price: 21000,
    description: 'Buzo clásico cuello redondo sin capucha. Algodón premium. Color azul marino. Unisex.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    category: 'buzos'
  },
  
  // INVIERNO - Sweaters
  {
    title: 'Sweater Cuello Alto',
    price: 28000,
    description: 'Sweater de lana con cuello alto tipo polera. Tejido grueso. Color crema. Abrigado y elegante.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80',
    category: 'sweaters'
  },
  {
    title: 'Sweater Rayas Oversize',
    price: 26500,
    description: 'Sweater oversize con rayas horizontales. Mezcla de lana y acrílico. Colores neutros.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80',
    category: 'sweaters'
  },
  
  // INVIERNO - Camperas
  {
    title: 'Campera Puffer Corta',
    price: 45000,
    description: 'Campera inflable corta con relleno térmico. Capucha desmontable. Color negro. Muy abrigada.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    category: 'camperas'
  },
  {
    title: 'Campera Cuero Eco',
    price: 52000,
    description: 'Campera de cuero ecológico estilo biker. Cierre diagonal. Color negro clásico. Forrada.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    category: 'camperas'
  }
];

// Función para crear los productos adicionales
async function createProducts() {
  console.log('\n🚀 Agregando productos adicionales a MockAPI...\n');
  console.log(`📍 API URL: ${API_BASE_URL}\n`);
  console.log('='.repeat(60) + '\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < additionalProducts.length; i++) {
    const product = additionalProducts[i];
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const created = await response.json();
      console.log(`   ✓ [${i + 1}/${additionalProducts.length}] ${created.title} (${created.category}) - $${created.price}`);
      successCount++;
      
      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 150));
    } catch (error) {
      console.error(`   ✗ [${i + 1}/${additionalProducts.length}] Error creando "${product.title}": ${error.message}`);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Productos creados exitosamente: ${successCount}`);
  if (errorCount > 0) {
    console.log(`❌ Productos con error: ${errorCount}`);
  }
  console.log('\n💡 Recarga tu aplicación para ver los nuevos productos\n');
}

// Verificar que Node.js tenga fetch disponible
if (typeof fetch === 'undefined') {
  console.error('❌ Este script requiere Node.js v18 o superior con fetch nativo');
  process.exit(1);
}

// Ejecutar el script
createProducts();
