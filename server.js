import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import exphbs from "express-handlebars"; // Handlebars con helpers
import path from "path";
import { fileURLToPath } from "url";
import productsManager from "./src/data/mongo/productsManager.js";

// Routers
import indexRouter from "./src/routers/index.router.js";
import cartsRouter from "./src/routers/api/carts.router.js";
import productsRouter from "./src/routers/api/products.router.js";
import usersRouter from "./src/routers/api/users.router.js";

// Middlewares
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

// Configuración del servidor
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// 📌 Conectar a MongoDB
const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB:", error));

// 📌 Configurar Handlebars con helpers personalizados
app.engine("hbs", exphbs.engine({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "src", "views", "layouts"),
  partialsDir: path.join(__dirname, "src", "views", "partials"),
  helpers: {
    eq: (a, b) => a === b,
    multiply: (a, b) => a * b
  }
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Para servir imágenes estáticas

// Rutas
app.use("/", indexRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

// WebSockets
io.on("connection", async (socket) => {
  console.log(`📡 Cliente conectado: ${socket.id}`);

  const products = await productsManager.getAll();
  socket.emit("products", products);

  socket.on("newProduct", async (productData) => {
    await productsManager.create(productData);
    const updatedProducts = await productsManager.getAll();
    io.emit("products", updatedProducts);
  });
});

// Manejadores de errores
app.use(pathHandler);
app.use(errorHandler);

// Iniciar servidor
const PORT = 8080;
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

