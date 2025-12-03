# 🚀 Quick Start - Bella Boutique

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalación
```bash
# Clonar repositorio
git clone https://github.com/dgimenezdeveloper/bellaBoutique.git
cd bella-boutique

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**✅ Listo!** Abre http://localhost:5173

---

## 🔑 Credenciales de Prueba

**Usuario:** Cualquier nombre  
**Contraseña:** `1234`

---

## 📦 Comandos Principales

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo en puerto 5173

# Producción
npm run build            # Generar build de producción
npm run preview          # Previsualizar build (puerto 4173)

# Utilidades
npm run lint             # Verificar código con ESLint
npm run populate         # Poblar MockAPI con productos
```

---

## 🌐 Despliegue en Vercel (2 minutos)

### Opción A: Con GitHub (Recomendado)
1. Push tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Click "New Project" → Importa tu repo
4. Click "Deploy" ✅

### Opción B: Con CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Variables de entorno necesarias:**
```
VITE_MOCKAPI_BASE_URL=https://692f619991e00bafccd76fb9.mockapi.io
VITE_FAKESTORE_API_URL=https://fakestoreapi.com/products
```

---

## 📂 Estructura Principal

```
bella-boutique/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Context API (estado global)
│   ├── pages/           # Páginas de la app
│   └── layouts/         # Layouts principales
├── public/              # Assets estáticos
├── .env                 # Variables de entorno
└── vite.config.js       # Configuración optimizada
```

---

## 🎯 Funcionalidades Principales

### Para Usuarios
- 🛍️ **Catálogo completo** de productos
- 🔍 **Búsqueda en tiempo real**
- 🏷️ **Filtros por categoría**
- 🛒 **Carrito de compras** funcional
- 📱 **Diseño responsive** (móvil, tablet, desktop)

### Para Administradores
- ➕ **Crear** productos nuevos
- ✏️ **Editar** productos existentes
- 🗑️ **Eliminar** productos
- 📊 **Panel visual** de gestión

**Acceso:** `/admin/products` (requiere login)

---

## 🔧 Solución Rápida de Problemas

### El servidor no inicia
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Las imágenes no cargan
- Verifica que estén en `public/images/`
- Usa rutas absolutas: `/images/banner.webp`

### Error 404 en rutas (producción)
- Vercel: Usa `vercel.json` (ya incluido)
- Netlify: Usa `_redirects` en `public/` (ya incluido)

### Variables de entorno no funcionan
- Deben empezar con `VITE_`
- Reinicia el servidor después de cambiarlas
- En producción, configúralas en el dashboard de tu hosting

---

## 📚 Documentación Completa

- **README.md** → Documentación general completa
- **DEPLOYMENT.md** → Guía detallada de despliegue
- **CHECKLIST.md** → Lista de verificación para producción
- **OPTIMIZATIONS.md** → Resumen de optimizaciones aplicadas

---

## 🆘 ¿Necesitas Ayuda?

### Recursos
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Contacto
- **Autor:** Daniel Giménez
- **GitHub:** [@dgimenezdeveloper](https://github.com/dgimenezdeveloper)
- **Repositorio:** [bellaBoutique](https://github.com/dgimenezdeveloper/bellaBoutique)

---

## ✅ Checklist de Verificación

- [ ] ✅ Node.js 16+ instalado
- [ ] ✅ Git configurado
- [ ] ✅ Dependencias instaladas
- [ ] ✅ Servidor de desarrollo corriendo
- [ ] ✅ Navegador abierto en localhost:5173
- [ ] ✅ Login funciona (password: 1234)
- [ ] ✅ Productos se muestran
- [ ] ✅ Búsqueda funciona
- [ ] ✅ Carrito funciona

---

## 🎉 ¡Todo Listo!

Tu aplicación está funcionando. Ahora puedes:

1. **Explorar** las funcionalidades
2. **Personalizar** el diseño y contenido
3. **Agregar** nuevos productos en `/admin/products`
4. **Desplegar** a producción cuando estés listo

---

<p align="center">
  <strong>Happy Coding! 💻✨</strong>
</p>
