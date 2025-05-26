# 🛍️ Proyecto Final - Backend II

**Alumno**: Jesús David Hipperdinger  
**Curso**: Backend II - Coderhouse  
**Repositorio**: [GitHub](https://github.com/davideme94/Hipperdinger_backend2final)

---

## 📦 Descripción

Este proyecto es una **API backend completa para un sistema e-commerce**, desarrollada con Node.js, Express y MongoDB. Cumple con todos los requerimientos del **proyecto final** del curso Backend II, incluyendo autenticación, roles, arquitectura por capas, DTOs, mailing, y un sistema de tickets de compra.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- Handlebars (views)
- WebSockets (socket.io)
- Passport + JWT (autenticación)
- Bcrypt (hash de contraseñas)
- Nodemailer (envío de emails)
- Bootstrap (UI)
- dotenv (variables de entorno)

---

## ✅ Funcionalidades clave

### 🧱 Arquitectura
- Basada en capas: `controllers/`, `services/`, `daos/`, `dtos/`, `models/`, `routers/`, `middlewares/`, `utils/`

### 👤 Autenticación y Seguridad
- Registro y login con `bcrypt` y `passport-jwt`
- Token guardado en cookie (`cookie-parser`)
- Middleware `passportCall()` para proteger rutas
- Middleware `checkRole()` para verificar permisos

### 🛒 Productos y Carritos
- CRUD de productos limitado a admins
- Usuarios pueden ver, agregar y actualizar productos en carritos
- Filtros por categoría, precio, stock y orden
- Vistas con paginación

### 🧾 Sistema de Compra y Tickets
- Ruta `/api/carts/:cid/purchase`
- Verificación de stock
- Generación de ticket con código único, fecha, monto y comprador
- Ticket persistido en MongoDB
- Email de confirmación enviado al comprador

### 📦 DTOs
- DTO para `/api/users/current` que oculta datos sensibles

---

## 🛠️ Instalación y ejecución

1. Clonar el proyecto:

```bash
git clone https://github.com/davideme94/Hipperdinger_backend2final.git
cd Hipperdinger_backend2final
npm install
