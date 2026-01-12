// Script para actualizar imágenes de productos con URLs correctas
// Ejecutar con: node scripts/fix-product-images.js

const API_BASE_URL = 'https://692f619991e00bafccd76fb9.mockapi.io';

// Imágenes correctas por producto (ID -> nueva imagen)
const imageUpdates = [
  // REMERAS - imágenes de remeras/camisetas
  { id: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' }, // Remera blanca OK
  { id: 21, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80' }, // Remera básica
  { id: 75, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80' }, // Remera negra
  { id: 76, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80' }, // Remera floral
  { id: 77, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80' }, // Rayas marineras OK
  { id: 78, image: 'https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=500&q=80' }, // Manga larga
  
  // MUSCULOSAS - imágenes de tank tops
  { id: 22, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80' }, // Musculosa fina
  { id: 23, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80' }, // Deportiva
  { id: 24, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500&q=80' }, // Espalda cruzada
  
  // TOPS - imágenes de tops/crop tops
  { id: 9, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80' }, // Top cropped OK
  { id: 25, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&q=80' }, // Top encaje
  { id: 26, image: 'https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3?w=500&q=80' }, // Strapless
  { id: 27, image: 'https://images.unsplash.com/photo-1559334417-a57bd929f003?w=500&q=80' }, // Halter
  
  // BODIES - imágenes de bodysuits
  { id: 19, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80' }, // Body encaje
  { id: 33, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80' }, // Body básico
  { id: 34, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80' }, // Body transparente
  
  // BUZOS - imágenes de hoodies/sweatshirts
  { id: 6, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' }, // Buzo crop OK
  { id: 69, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500&q=80' }, // Canguro oversize
  { id: 70, image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=500&q=80' }, // Cuello redondo
  
  // SWEATERS - imágenes de sweaters
  { id: 13, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80' }, // Trenzado OK
  { id: 71, image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=500&q=80' }, // Cuello alto
  { id: 72, image: 'https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=500&q=80' }, // Rayas
  
  // CAMISAS - imágenes de shirts/blouses
  { id: 7, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80' }, // Camisa blanca
  { id: 86, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500&q=80' }, // Rayada
  { id: 87, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' }, // Denim
  
  // BLAZERS - imágenes de blazers
  { id: 4, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80' }, // Lino OK
  { id: 85, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' }, // Negro
  
  // CAMPERAS - imágenes de jackets
  { id: 15, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' }, // Jean OK
  { id: 44, image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500&q=80' }, // Jean corta
  { id: 73, image: 'https://images.unsplash.com/photo-1544923246-77307dd628b5?w=500&q=80' }, // Puffer
  { id: 74, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' }, // Cuero
  
  // VESTIDOS - imágenes de dresses
  { id: 3, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80' }, // Floral OK
  { id: 11, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80' }, // Camisero OK
  { id: 14, image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&q=80' }, // Mono OK
  { id: 81, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80' }, // Corto casual
  { id: 82, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80' }, // Largo bohemio
  
  // POLLERAS - imágenes de skirts
  { id: 5, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80' }, // Plisada OK
  { id: 79, image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=500&q=80' }, // Midi
  { id: 80, image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=500&q=80' }, // Jean mini
  
  // JEANS - imágenes de jeans
  { id: 2, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80' }, // Mom fit
  { id: 40, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500&q=80' }, // Wide leg
  { id: 42, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80' }, // Mom celeste OK
  { id: 43, image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&q=80' }, // Roturas
  { id: 83, image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80' }, // Recto
  { id: 84, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80' }, // Skinny negro
  
  // PANTALONES - imágenes de pants
  { id: 10, image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80' }, // Palazzo OK
  { id: 41, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80' }, // Wide leg negro
  { id: 45, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80' }, // Cargo
  { id: 47, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80' }, // Oxford
  { id: 88, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80' }, // Pinzas
  
  // SHORTS - imágenes de shorts
  { id: 28, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80' }, // Lino OK
  { id: 29, image: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=500&q=80' }, // Deportivo
  { id: 8, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80' }, // Denim roturas
  { id: 39, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&q=80' }, // Denim clásico
  
  // CALZAS - imágenes de leggings
  { id: 30, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80' }, // Deportiva
  { id: 31, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80' }, // Ciclista
  { id: 32, image: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=500&q=80' }, // Estampada
  
  // BIKERS - imágenes de biker shorts
  { id: 35, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80' }, // Negro
  { id: 36, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500&q=80' }, // Estampado
  
  // JOGGINGS - imágenes de joggers
  { id: 37, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&q=80' }, // Algodón
  { id: 38, image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80' }, // Cargo
  
  // BERMUDAS - imágenes de bermudas
  { id: 46, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80' }, // Denim
  
  // JARDINEROS - imágenes de overalls
  { id: 48, image: 'https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?w=500&q=80' }, // Clásico
  { id: 49, image: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=500&q=80' }, // Short
  
  // CHALECOS - imágenes de vests
  { id: 50, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80' }, // Denim
  
  // BIKINIS - imágenes de swimwear
  { id: 16, image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=500&q=80' }, // Alta cintura
  { id: 93, image: 'https://images.unsplash.com/photo-1582980816857-62a1e7c93f3e?w=500&q=80' }, // Triangular
  { id: 94, image: 'https://images.unsplash.com/photo-1519408469771-2586093c3f14?w=500&q=80' }, // Enteriza
  
  // OJOTAS - imágenes de sandals/flip flops
  { id: 51, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80' }, // Plataforma
  { id: 52, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80' }, // Dedo
  
  // CALZADO - imágenes de shoes
  { id: 17, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80' }, // Zapatillas OK
  { id: 89, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80' }, // Sandalias
  { id: 90, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80' }, // Botas
  
  // BOLSOS - imágenes de bags
  { id: 12, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80' }, // Cartera OK
  { id: 57, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80' }, // Tote
  { id: 58, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80' }, // Mini
  { id: 59, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' }, // Mochila
  
  // BOLSAS - imágenes de tote bags
  { id: 64, image: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=500&q=80' }, // Ecológica
  { id: 65, image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=500&q=80' }, // Playa
  
  // CINTOS - imágenes de belts
  { id: 55, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' }, // Negro
  { id: 56, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&q=80' }, // Trenzado
  
  // GORRAS - imágenes de hats/caps
  { id: 62, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80' }, // Dad cap OK
  { id: 63, image: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=500&q=80' }, // Bucket
  
  // FRAGANCIAS - imágenes de perfumes
  { id: 60, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80' }, // Perfume OK
  { id: 61, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80' }, // Body splash
  
  // ACCESORIOS - imágenes de accessories
  { id: 18, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80' }, // Collar OK
  { id: 20, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80' }, // Aros OK
  { id: 91, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80' }, // Pañuelo
  { id: 92, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' }, // Anteojos OK
  
  // ROPA INTERIOR - imágenes de underwear
  { id: 53, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80' }, // Conjunto
  { id: 54, image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&q=80' }, // Pack
  
  // OFERTAS - imágenes apropiadas
  { id: 66, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' }, // Remeras pack
  { id: 67, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80' }, // Vestido
  { id: 68, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80' }, // Jean
];

async function updateImages() {
  console.log('\n🖼️ Actualizando imágenes de productos en MockAPI...\n');
  console.log('='.repeat(60) + '\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < imageUpdates.length; i++) {
    const update = imageUpdates[i];
    try {
      const response = await fetch(`${API_BASE_URL}/products/${update.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ image: update.image })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const updated = await response.json();
      console.log(`   ✓ [${i + 1}/${imageUpdates.length}] ID ${update.id}: ${updated.title?.substring(0, 30)}`);
      successCount++;
      
      await new Promise(resolve => setTimeout(resolve, 80));
    } catch (error) {
      console.error(`   ✗ ID ${update.id}: Error - ${error.message}`);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ ${successCount} imágenes actualizadas`);
  if (errorCount > 0) console.log(`❌ ${errorCount} errores`);
  console.log('\n💡 Recarga la página para ver los cambios\n');
}

if (typeof fetch === 'undefined') {
  console.error('❌ Este script requiere Node.js v18+');
  process.exit(1);
}

updateImages();
