<p align="center">
  <img src="./public/images/bella-boutique.png" alt="Logo de Bella Boutique" width="200"/>
</p>

<h1 align="center">Bella Boutique</h1>

<p align="center">
  Una aplicación front-end de eCommerce moderna y elegante, construida con React, Vite y Tailwind CSS.
  <br />
  Este proyecto simula una experiencia de compra completa, con un diseño inspirado en tiendas de moda líderes.
</p>

---

## 📸 Captura de Pantalla

![Captura de Pantalla de Bella Boutique](./public/images/screen-bella-boutique.png)


---

## Características Principales

-   **Catálogo de Productos Dinámico**: Carga de productos desde una API externa (`Fake Store API`).
-   **Gestión de Estado de Carga y Errores**: Interfaz de usuario amigable que informa al usuario mientras se obtienen los datos.
-   **Carrito de Compras Completo**:
    -   Añadir productos al carrito.
    -   Actualizar la cantidad de cada producto.
    -   Eliminar productos del carrito.
    -   Cálculo de subtotal y total en tiempo real.
-   **Navegación Avanzada con React Router**:
    -   Rutas para Inicio, Productos, Carrito y Login.
    -   **Rutas Dinámicas**: Páginas de detalle para cada producto (`/product/:id`).
    -   **Mega Menús**: Submenús complejos y elegantes para categorías principales, inspirados en tiendas profesionales.
-   **Diseño Profesional y Responsivo**:
    -   Estilizado completamente con **Tailwind CSS**.
    -   Adaptable a dispositivos móviles, tablets y escritorio.
    -   Componentes reutilizables para una UI consistente.
-   **Simulación de Rutas Protegidas**: Estructura básica para secciones que requerirían autenticación (ej. `/profile`).

---

## Tecnologías Utilizadas

Este proyecto fue construido utilizando tecnologías modernas del ecosistema de JavaScript:

-   **Framework Principal**: [React 18+](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
-   **Enrutamiento**: [React Router DOM v6](https://reactrouter.com/)
-   **Iconos**: [React Icons](https://react-icons.github.io/react-icons/)
-   **API Externa**: [Fake Store API](https://fakestoreapi.com/) para los datos de productos.

---

## Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu entorno de desarrollo local.

### **Requisitos**

-   [Node.js](https://nodejs.org/) (versión 16 o superior)
-   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### **Instalación y Ejecución**

1.  **Clona el repositorio:**
    ```bash
    git clone [URL-DE-TU-REPOSITORIO]
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd bella-boutique
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Abre tu navegador:**
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite indique en la consola).

---

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera para mantener el código limpio y escalable: