// Script para corregir las categorías de productos en MockAPI
// Ejecutar con: node scripts/fix-product-categories.js

const API_BASE_URL = 'https://692f619991e00bafccd76fb9.mockapi.io';

// Correcciones de categorías para productos existentes
const categoryFixes = [
  { id: 4, category: 'blazers', title: 'Blazer Lino Natural' },
  { id: 6, category: 'buzos', title: 'Buzo Crop Canguro' },
  { id: 7, category: 'camisas', title: 'Camisa Seda Blanca' },
  { id: 8, category: 'shorts-denim', title: 'Short Denim Roturas' },
  { id: 9, category: 'tops', title: 'Top Cropped Morley' },
  { id: 13, category: 'sweaters', title: 'Sweater Trenzado Oversize' },
  { id: 15, category: 'camperas', title: 'Campera Jean Oversized' },
  { id: 16, category: 'bikinis', title: 'Bikini Alta Cintura' },
  { id: 19, category: 'bodies', title: 'Body Encaje Negro' },
  { id: 21, category: 'remeras', title: 'Remera Básica' }, // Producto con nombre raro, lo renombramos
];

async function fixCategories() {
  console.log('\n🔧 Corrigiendo categorías de productos en MockAPI...\n');
  console.log('='.repeat(60) + '\n');
  
  for (const fix of categoryFixes) {
    try {
      const updateData = { category: fix.category };
      if (fix.title) {
        updateData.title = fix.title;
      }
      
      const response = await fetch(`${API_BASE_URL}/products/${fix.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const updated = await response.json();
      console.log(`   ✓ ID ${fix.id}: "${updated.title}" -> categoría: ${updated.category}`);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`   ✗ ID ${fix.id}: Error - ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Correcciones completadas!\n');
}

// Verificar que Node.js tenga fetch disponible
if (typeof fetch === 'undefined') {
  console.error('❌ Este script requiere Node.js v18 o superior con fetch nativo');
  process.exit(1);
}

fixCategories();
