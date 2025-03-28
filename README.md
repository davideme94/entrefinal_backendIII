# 🏠 Rental Management API

Este es un sistema de gestión de alquileres (`Rentals`), donde los usuarios pueden administrar productos (`rentals`), carritos de compras (`carts`) y usuarios (`users`). 

El sistema está desarrollado con **Node.js, Express y Handlebars**, y utiliza archivos JSON para la persistencia de datos.

---

## 📌 Tecnologías utilizadas
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework para crear el servidor backend
- **Handlebars.js** - Motor de plantillas para las vistas
- **Bootstrap 5** - Para el diseño de la interfaz
- **Multer** - Para manejo de archivos e imágenes (si se usa)
- **Morgan** - Middleware para logs de solicitudes
- **FS-Extra** - Para manejar archivos JSON

---

ESTRUCTURA DEL PROYECTO

E-COMMERCE/
│── node_modules/             # Dependencias de Node.js
│── public/                   # Archivos estáticos (CSS, imágenes)
│   ├── css/                  # Estilos personalizados
│   ├── images/               # Imágenes para los productos
│── src/                      
│   ├── controllers/          # Controladores de productos, carritos y usuarios
│   ├── data/                 
│   │   ├── fs/               # Persistencia en JSON
│   │   │   ├── products.json # Datos de productos
│   │   │   ├── carts.json    # Datos de carritos
│   │   │   ├── users.json    # Datos de usuarios
│   ├── middlewares/          # Middlewares para manejo de errores y logs
│   ├── routers/              # Rutas de la API
│   ├── views/                # Plantillas Handlebars
│   │   ├── layouts/          # Main layout
│   │   ├── home.hbs          # Página principal
│   │   ├── products.hbs      # Vista de productos
│   │   ├── carts.hbs         # Vista de carritos
│   │   ├── users.hbs         # Vista de usuarios
│── .gitignore                # Archivos ignorados en el repo
│── package.json              # Dependencias y scripts
│── server.js                 # Configuración del servidor
│── README.md                 # Documentación del proyecto




Probar la API en Thunder Client ( ES LA QUE SE USO PARA PROBAR), POSTMAN o en el navegador:






PAGINA CON VISTAS INCLUIDAS: 

http://localhost:8080/ (HOME)
http://localhost:8080/products (PRODUCTS)
http://localhost:8080/carts (CART)
http://localhost:8080/users ( USERS)