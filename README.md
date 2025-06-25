# Proyecto Final - Backend III

## 🧾 Descripción

E-commerce backend desarrollado como proyecto final para el curso **Backend III** de Coderhouse.  
Incluye gestión de productos, usuarios, carritos, adopciones de mascotas, autenticación con JWT, documentación Swagger, testing y contenedorización con Docker.

---

## 🚀 Tecnologías usadas

- Node.js + Express
- MongoDB + Mongoose
- Passport + JWT
- Handlebars
- WebSockets (Socket.io)
- Swagger (OpenAPI)
- Docker
- Faker.js
- Mocha + Chai + Supertest

---

## 📦 Instalación local

1. Cloná el repositorio:

```bash
git clone https://github.com/davideme94/entrefinal_backendIII.git
cd entrefinal_backendIII
npm install
```

2. Agregá tu archivo `.env` con estas variables:

```env
PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<db>
JWT_SECRET=tu_clave_jwt
```

3. Iniciá el servidor en modo desarrollo:

```bash
npm run dev
```

---

## 🔐 Autenticación

- Registro/login con `passport-local`
- Autenticación vía JWT
- Cookies firmadas

---

## 📄 Documentación Swagger

La API está documentada con Swagger en la siguiente ruta:

👉 [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

---

## 🧪 Testing

Se incluyen tests con Mocha, Chai y Supertest:

```bash
npm test
```

---

## 🐳 Docker

### Imagen en Docker Hub

👉 [https://hub.docker.com/r/davidme1994/backend-final](https://hub.docker.com/r/davidme1994/backend-final)

### Ejecutar contenedor

```bash
docker pull davidme1994/backend-final
docker run -p 8080:8080 --env-file .env davidme1994/backend-final
```

---

## 📂 Estructura general

```
├── server.js
├── Dockerfile
├── .env.example
├── src/
│   ├── controllers/
│   ├── daos/
│   ├── models/
│   ├── routers/
│   ├── middlewares/
│   ├── views/
│   ├── auth/
│   ├── docs/ (Swagger)
├── test/
│   └── adoption.test.js
```

---

## 👨‍💻 Autor

**Jesús David Hipperdinger**  
Backend III - Coderhouse  
GitHub: [@davideme94](https://github.com/davideme94)
