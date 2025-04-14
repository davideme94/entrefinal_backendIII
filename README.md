# 🛒 Primera Pre-Entrega - Proyecto Backend II

**Alumno**: Jesús David Hipperdinger  
**Repositorio**: [GitHub](https://github.com/davideme94/primerapreentrega_backend2_HIPPERDINGER)

---

## 📦 Descripción

Este proyecto consiste en la implementación de una **plataforma e-commerce** en Node.js utilizando Express, MongoDB, Handlebars, WebSockets y Passport.

Corresponde a la primera **pre-entrega** del Proyecto Final del curso **Backend II**, incluyendo:

- CRUD de usuarios con modelo extendido.
- Sistema de autenticación con `bcrypt` y `passport-jwt`.
- Middleware de autorización.
- Envío y lectura de cookies con `cookie-parser`.
- Conexión a **MongoDB Atlas** y uso de `populate`.
- Rutas protegidas y vistas dinámicas con Handlebars + Bootstrap.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- Handlebars como template engine
- WebSockets (socket.io)
- Passport + JWT
- Bcrypt para hashear contraseñas
- Bootstrap para las vistas
- dotenv para variables de entorno

---

## ✅ Funcionalidades desarrolladas en esta entrega

### 📄 Modelo `User`
- `first_name: String`
- `last_name: String`
- `email: String (único)`
- `age: Number`
- `password: String (hash)`
- `cart: ObjectId` (referencia a modelo Cart)
- `role: String` (default: `user`)

### 🔐 Autenticación y Seguridad
- Registro de usuarios con encriptación de contraseña (`bcrypt`)
- Login con estrategia `JWT`
- Ruta protegida con `passport-jwt` para acceder al perfil del usuario logueado (`/api/sessions/current`)
- Middleware extractor de cookie para obtener el token
- Manejo de sesiones con cookies (`cookie-parser`)

### 👁️ Vistas implementadas
- `/login`: formulario de login
- `/register`: formulario de registro
- Navbar con navegación accesible (Rentals, Carts, Users, Agregar producto, Login/Register)

---

## ⚙️ Configuración

1. Clonar el repositorio:

```bash
git clone https://github.com/davideme94/primerapreentrega_backend2_HIPPERDINGER.git
cd primerapreentrega_backend2_HIPPERDINGER
